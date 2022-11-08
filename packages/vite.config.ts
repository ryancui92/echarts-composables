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
        // XXX: vitepress need these alias to avoid build mistakes
        'vue-echarts': resolve(__dirname,  '../node_modules/vue-echarts/dist/index.esm.js'),
        'echarts': resolve(__dirname,  '../node_modules/echarts')
      }
    },
    server: {
      port: 6688,
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
