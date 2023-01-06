import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/playground/' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@packages': fileURLToPath(new URL('./packages', import.meta.url)),
      }
    },
    server: {
      port: 7301,
    },
    build: {
      outDir: 'site',
      chunkSizeWarningLimit: 10000,
    },
    esbuild: {
      drop: command === 'build' ? ['debugger', 'console'] : []
    },
    plugins: [
      vue(),
      vueJsx()
    ]
  }
})
