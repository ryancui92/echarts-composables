import { BuiltInAddonType } from '@packages/echarts/types'
import type { UseBarStack } from '@packages/echarts/types'

export function useBarStack(...stacks: string[][]): UseBarStack {
  return {
    name: BuiltInAddonType.useBarStack,
    stacks: stacks.length === 0
      ? undefined
      : stacks.map((stack, index) => ({ name: `stack-${index}`, keys: stack })),
  }
}
