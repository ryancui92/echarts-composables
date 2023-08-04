import type { Preset } from 'unocss'

const remRE = /(-?[.\d]+)rem/g

export interface CustomRemOptions {
  /**
   * 1rem = n * 4 px
   * @default 4
   */
  divisor?: number
}

// 用于更改 rem 倍数
// 参考 https://github.com/unocss/unocss/blob/main/packages/preset-rem-to-px/src/index.ts
export default function CustomRemPreset(options: CustomRemOptions = {}): Preset {
  const {
    divisor = 4,
  } = options

  return {
    name: 'preset-custom-rem',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 / divisor}rem`)
      })
    },
  }
}
