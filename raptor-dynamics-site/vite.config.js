import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/website/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Increase chunk warning threshold (framer-motion is large by design)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Function form required by Rolldown (Vite 8)
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'
          }
        },
      },
    },
    // Target modern browsers for smaller output
    target: 'es2020',
  },
})
