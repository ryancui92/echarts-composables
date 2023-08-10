export function useDoughnut(
  params?: Partial<{
    inner: number;
    outer: number;
  }>
) {
  return {
    name: 'useDoughnut' as const,
    inner: params?.inner ?? 36,
    outer: params?.outer ?? 56,
  }
}
