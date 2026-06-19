import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5001'
    }
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    mkcert()
  ],
})
