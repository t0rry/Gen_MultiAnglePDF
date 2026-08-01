import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Gen_MultiAnglePDF/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
