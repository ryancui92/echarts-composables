import type { BuiltInAddon } from '@packages/echarts/addon-types'
import { BuiltInAddonType } from '@packages/echarts/addon-types'

export function useDoughnutCenterTotal(): BuiltInAddon {
  return { name: BuiltInAddonType.DoughnutCenterTotal }
}
