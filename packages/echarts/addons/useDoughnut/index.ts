import type { DoughnutAddon } from '@packages/echarts/addon-types'
import { BuiltInAddonType } from '@packages/echarts/addon-types'

interface DoughnutAddonParams {
  inner: number;
  outer: number;
}

export function useDoughnut(params?: Partial<DoughnutAddonParams>): DoughnutAddon {
  return {
    name: BuiltInAddonType.Doughnut,
    params: {
      inner: params?.inner ?? 36,
      outer: params?.outer ?? 56,
    },
  }
}
