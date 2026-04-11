import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'   // ← Esta es la línea que faltaba

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),     // ← Solo agregas esto
  ],
})