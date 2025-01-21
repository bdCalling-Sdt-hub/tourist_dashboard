import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "167.71.179.42",
    // port:'3001'
    // host: "localhost",
    port: '3001'
  }
})
