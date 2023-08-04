import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetCustomRem from './preset-custom-rem'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetCustomRem(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
