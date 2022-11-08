import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

const sourceMap = process.env.SOURCE_MAP === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@packages': fileURLToPath(new URL('./packages', import.meta.url)),
    }
  },
  build: {
    sourcemap: sourceMap,
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'EChartsComposables',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        /^echarts*/,
      ],
      treeshake: false
    },
    commonjsOptions: {
      sourceMap: false
    },
    chunkSizeWarningLimit: 10000
  },
  esbuild: {
    drop: ['debugger', 'console']
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      exclude: ['node_modules'],
      compilerOptions: { sourceMap },
      copyDtsFiles: false
    })
  ],
})
