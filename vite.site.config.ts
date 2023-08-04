import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
      vueJsx(),
      UnoCSS(),

      // Auto import APIs on-demand (https://github.com/antfu/unplugin-auto-import)
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
              'useThemeVars',
            ]
          },
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),

      // Auto import components on-demand (https://github.com/antfu/unplugin-vue-components)
      Components({
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
        resolvers: [NaiveUiResolver()],
        dirs: [],
        dts: 'src/components.d.ts',
      }),
    ]
  }
})
