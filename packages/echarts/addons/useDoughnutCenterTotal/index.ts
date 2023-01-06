import { BuiltInAddonType } from '@packages/echarts/types'
import type { BuiltInAddon } from '@packages/echarts/types'

export function useDoughnutCenterTotal(): BuiltInAddon {
  return { name: BuiltInAddonType.useDoughnutCenterTotal }
}
