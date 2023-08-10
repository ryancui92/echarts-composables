/**
 * Stack bar series
 *
 * @param stacks controls which metrics are stacked together
 */
export function useBarStack(...stacks: string[][]) {
  return {
    name: 'useBarStack' as const,
    stacks: stacks.length === 0
      ? undefined
      : stacks.map((stack, index) => ({ name: `stack-${index}`, keys: stack })),
  }
}
