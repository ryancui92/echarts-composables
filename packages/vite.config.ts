import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    resolve: {
      alias: {
        '@packages': fileURLToPath(new URL('.', import.meta.url)),
      }
    },
    server: {
      port: 7300,
    },
    esbuild: {
      drop: command === 'build' ? ['debugger', 'console'] : []
    },
    plugins: [
      vueJsx()
    ],
    build: {
      chunkSizeWarningLimit: 10000,
    },
  }
})
