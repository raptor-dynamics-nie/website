# Team Management CLI

A zero-dependency interactive CLI to manage the **Team Section** data and photos without editing code.

## Quick Start

```bash
cd raptor-dynamics-site
npm run team
```

## Features

| Option | Description |
|--------|-------------|
| **1. Add a person** | Insert a new member into any group (Patrons, Chief Advisors, Faculty Advisors, Student Office Bearers, Executive Members, Members). Prompts for name, role, title, LinkedIn, and photo. |
| **2. Remove a person** | Delete a person from the team. Photo file is **kept** in `public/` for recovery. |
| **3. Add or replace a photo** | Upload a new photo for an existing person. Accepts JPG, JPEG, PNG, WebP, AVIF. Auto-renames to `team-<name>.<ext>` and updates the photo map. |
| **4. Remove a photo** | Unlink a photo from a person. File stays in `public/`. |
| **5. Commit, push, and publish** | Stages changes, commits, pushes to GitHub, and optionally deploys to GitHub Pages (requires PAT). |
| **6. Exit** | Quit without saving. |

## Data Structure

**Source of truth**: `src/data/team.json`

```json
{
  "committee": {
    "patrons": [{ "name", "role", "title", "initial", "linkedin" }],
    "chiefAdvisors": [{ "name", "role", "title", "initial", "linkedin" }],
    "facultyAdvisors": [{ "name", "role", "title", "initial", "linkedin" }],
    "studentRoles": [{ "role", "desc", "members": ["name", ...] }],
    "executiveMembers": ["name", ...],
    "members": ["name", ...]
  },
  "photoMap": { "Name": "team-name.jpg" },
  "studentPhotoMap": { "Name": "team-name.jpg" }
}
```

## Photo Handling

- Photos are copied to `public/team-<sanitized-name>.<ext>`
- References stored in `photoMap` (advisors/patrons) or `studentPhotoMap` (students)
- Component (`TeamSection.jsx`) reads these maps at build time
- Supported formats: **JPG, JPEG, PNG, WebP, AVIF**

## Deployment (Option 5)

1. Stages: `package.json`, `README.md`, `scripts/manage-team.mjs`, `src/components/TeamSection.jsx`, `src/components/EventsSection.jsx`, `src/data/team.json`, and any new photos
2. Commits with your message
3. Pushes to `origin/main`
4. **Optional**: Builds with Vite and deploys `dist/` to GitHub Pages via `gh-pages` using a **GitHub PAT** (Personal Access Token with `repo` scope). Token is entered hidden and **never written to disk**.

## Requirements

- Node.js 18+
- Git installed and configured
- GitHub PAT (for Pages deploy) with `repo` scope

## Example Workflow

```bash
npm run team
# 1 → Add a person
# Choose group → "Student office bearers"
# Name → "Jane Doe"
# Role → "Vice President"
# Photo path → /Users/me/jane.jpg
# → Saved as public/team-jane-doe.jpg

# Later: npm run team → 3 → Replace photo
# Select "Jane Doe"
# Photo path → /Users/me/jane-new.png
# → Replaces photo, updates map

# Deploy: npm run team → 5 → y → "Add Jane as VP" → y → [PAT] → Published
```

## Notes

- **No code changes needed** — the website reads `team.json` and `public/` at build time
- Run `npm run build` after manual JSON edits to verify
- The script validates inputs and rolls back on error
- All paths are resolved relative to the project root