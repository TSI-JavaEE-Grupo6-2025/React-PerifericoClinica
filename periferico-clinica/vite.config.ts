import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  server: {
    host: true, // Escuchar en todas las interfaces
    port: 5173,
    strictPort: true,
  },
  plugins: [react()],
})
