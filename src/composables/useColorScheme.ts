export const useColorScheme = createSharedComposable(() => {
  return useDark({
    storageKey: 'echarts.dark',
  })
})
