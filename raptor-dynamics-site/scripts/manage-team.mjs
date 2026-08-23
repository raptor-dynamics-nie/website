import { access, copyFile, readFile, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { spawnSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const workspaceRoot = resolve(root, '..')
const dataPath = join(root, 'src', 'data', 'team.json')
const publicPath = join(root, 'public')
const rl = createInterface({ input: stdin, output: stdout })
const changedPhotos = new Set()

const groups = [
  ['patrons', 'Patrons'],
  ['chiefAdvisors', 'Chief advisors'],
  ['facultyAdvisors', 'Faculty advisors'],
  ['studentRoles', 'Student office bearers'],
  ['executiveMembers', 'Executive members'],
  ['members', 'Members'],
]

const answer = async (question, optional = false) => {
  const value = (await rl.question(question)).trim()
  if (!value && !optional) throw new Error('A value is required. No changes were saved.')
  return value
}

function initials(name) {
  return name.split(/\s+|&/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('')
}

function allPeople(data) {
  const result = []
  for (const [key, label] of groups) {
    if (key === 'studentRoles') {
      data.committee.studentRoles.forEach((role, roleIndex) => role.members.forEach((name, memberIndex) => {
        result.push({ name, key, label, roleIndex, memberIndex })
      }))
    } else {
      data.committee[key].forEach((item, index) => result.push({ name: typeof item === 'string' ? item : item.name, key, label, index }))
    }
  }
  return result
}

async function choose(question, choices) {
  console.log(`\n${question}`)
  choices.forEach((choice, index) => console.log(`  ${index + 1}. ${choice.label ?? choice}`))
  const value = Number(await answer('Choose a number: '))
  if (!Number.isInteger(value) || value < 1 || value > choices.length) throw new Error('Invalid selection. No changes were saved.')
  return choices[value - 1]
}

async function savePhoto(data, person) {
  const source = await answer('Photo path (leave blank to skip): ', true)
  if (!source) return

  // PowerShell often pastes paths surrounded by quotes; accept either form.
  const sourcePath = resolve(process.cwd(), source.replace(/^(?:"|')|(?:"|')$/g, ''))
  await access(sourcePath, constants.R_OK)
  const extension = extname(sourcePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(extension)) {
    throw new Error('Use a JPG, JPEG, PNG, WebP, or AVIF image. No changes were saved.')
  }

  const filename = `team-${person.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}${extension}`
  const destination = join(publicPath, filename)
  await copyFile(sourcePath, destination)
  changedPhotos.add(`public/${filename}`)

  const map = ['patrons', 'chiefAdvisors', 'facultyAdvisors'].includes(person.key) ? data.photoMap : data.studentPhotoMap
  map[person.name] = filename
  console.log(`Photo saved as public/${filename}`)
}

async function addPerson(data) {
  const group = await choose('Where should this person appear?', groups.map(([key, label]) => ({ key, label })))
  const name = await answer('Full name: ')
  let person

  if (['patrons', 'chiefAdvisors', 'facultyAdvisors'].includes(group.key)) {
    person = {
      name,
      role: group.key === 'patrons' ? 'Patron' : group.key === 'chiefAdvisors' ? 'Chief Advisor' : 'Faculty Advisor',
      title: await answer('Title/designation: '),
      initial: initials(name),
      linkedin: await answer('LinkedIn URL (leave blank if none): ', true),
    }
    data.committee[group.key].push(person)
  } else if (group.key === 'studentRoles') {
    const roleOptions = data.committee.studentRoles.map((role) => ({ ...role, label: role.role }))
    roleOptions.push({ label: 'Create a new role' })
    const role = await choose('Select the office-bearer role:', roleOptions)
    if (role.role) {
      role.members.push(name)
    } else {
      data.committee.studentRoles.push({
        members: [name],
        role: await answer('Role name: '),
        desc: await answer('Short role description: ', true),
      })
    }
    person = { name, key: group.key }
  } else {
    data.committee[group.key].push(name)
    person = { name, key: group.key }
  }

  await savePhoto(data, { ...person, key: group.key })
  console.log(`${name} added.`)
}

async function choosePerson(data) {
  const people = allPeople(data)
  return choose('Select a person:', people.map((person) => ({ ...person, label: `${person.name} — ${person.label}` })))
}

async function removePerson(data) {
  const person = await choosePerson(data)
  if (person.key === 'studentRoles') data.committee.studentRoles[person.roleIndex].members.splice(person.memberIndex, 1)
  else data.committee[person.key].splice(person.index, 1)

  delete data.photoMap[person.name]
  delete data.studentPhotoMap[person.name]
  console.log(`${person.name} removed. Their image is kept in public/ so it can be recovered if needed.`)
}

async function changePhoto(data) {
  const person = await choosePerson(data)
  await savePhoto(data, person)
}

async function removePhoto(data) {
  const person = await choosePerson(data)
  delete data.photoMap[person.name]
  delete data.studentPhotoMap[person.name]
  console.log(`Photo removed for ${person.name}; the image file itself is retained safely in public/.`)
}

function runGit(args) {
  const result = spawnSync('git', args, { cwd: workspaceRoot, stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`git ${args[0]} did not complete successfully.`)
}

function runNodeScript(script, args) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd: root, stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`${basename(script)} did not complete successfully.`)
}

async function commitAndPush() {
  const appFiles = [
    'package.json',
    'README.md',
    'scripts/manage-team.mjs',
    'src/components/TeamSection.jsx',
    'src/data/team.json',
    ...changedPhotos,
  ].map((file) => `raptor-dynamics-site/${file}`)
  const files = ['package.json', ...appFiles]
  runGit(['add', '--', ...files])
  const message = await answer('Commit message: ')
  runGit(['commit', '-m', message])
  runGit(['push'])
  console.log('\nChanges committed and pushed.')

  if ((await answer('Publish the website now? (y/N): ', true)).toLowerCase() === 'y') {
    runNodeScript(join(root, 'node_modules', 'vite', 'bin', 'vite.js'), ['build'])
    runNodeScript(join(root, 'node_modules', 'gh-pages', 'bin', 'gh-pages.js'), ['-d', 'dist'])
    console.log('Website published.')
  }
}

try {
  const data = JSON.parse(await readFile(dataPath, 'utf8'))
  const action = await choose('Team manager', [
    'Add a person',
    'Remove a person',
    'Add or replace a photo',
    'Remove a photo',
    'Commit, push, and publish current changes',
    'Exit without changes',
  ])

  if (action === 'Exit without changes') process.exit(0)
  if (action === 'Commit, push, and publish current changes') {
    if ((await answer('Commit and push the current team changes now? (y/N): ', true)).toLowerCase() === 'y') await commitAndPush()
    process.exit(0)
  }
  if (action === 'Add a person') await addPerson(data)
  if (action === 'Remove a person') await removePerson(data)
  if (action === 'Add or replace a photo') await changePhoto(data)
  if (action === 'Remove a photo') await removePhoto(data)

  await writeFile(dataPath, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`\nUpdated ${basename(dataPath)}.`)
  if ((await answer('Commit and push these team changes now? (y/N): ', true)).toLowerCase() === 'y') await commitAndPush()
} catch (error) {
  console.error(`\n${error.message}`)
  process.exitCode = 1
} finally {
  rl.close()
}
