import { BuiltInAddonType } from '@packages/echarts/types'
import type { UseDoughnut } from '@packages/echarts/types'

export function useDoughnut(
  params?: Partial<{
    inner: number;
    outer: number;
  }>
): UseDoughnut {
  return {
    name: BuiltInAddonType.useDoughnut,
    inner: params?.inner ?? 36,
    outer: params?.outer ?? 56,
  }
}
