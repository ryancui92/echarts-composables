import type {
  BasicDimension,
  BasicMeta,
  BasicMetric, BuiltInAddon,
  LegacyDataset,
  NormalizedDataset,
  UniversalAddon
} from '@packages/echarts'
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'

export const presetDataset: (LegacyDataset | NormalizedDataset)[] = [
  [
    { date: 'Mon', type: 'Data1', value: 120 },
    { date: 'Tue', type: 'Data1', value: 200 },
    { date: 'Wed', type: 'Data1', value: 150 },
    { date: 'Thu', type: 'Data1', value: 80 },
    { date: 'Fri', type: 'Data1', value: 70 },
    { date: 'Sat', type: 'Data1', value: 110 },
    { date: 'Sun', type: 'Data1', value: 130 },
    { date: 'Mon', type: 'Data2', value: 678 },
    { date: 'Tue', type: 'Data2', value: 45 },
    { date: 'Wed', type: 'Data2', value: 89 },
    { date: 'Thu', type: 'Data2', value: 35 },
    { date: 'Fri', type: 'Data2', value: 123 },
    { date: 'Sat', type: 'Data2', value: 66 },
    { date: 'Sun', type: 'Data2', value: 12 },
  ],
  [
    ['Date', '数据1', '数据2', '数据3', '数据4'],
    ['Mon', 123, 467, 456, 23],
    ['Tue', 456, 56, 5, 780],
    ['Web', 45, 431, 34, 341],
    ['Thu', 12, 123, 899, 46],
    ['Fri', 899, 588, 456, 567],
  ],
]

const storagePrefix = 'echarts.composables.playground'

export const usePlayground = createSharedComposable(() => {
  const dataset = useLocalStorage<LegacyDataset | NormalizedDataset>(`${storagePrefix}.dataset`, presetDataset[0])
  const metrics = useLocalStorage<BasicMetric[]>(`${storagePrefix}.metrics`, [
    {
      key: 'value',
      visual: MetricType.Bar
    }
  ])
  const dimensions = useLocalStorage<BasicDimension[]>(`${storagePrefix}.dimensions`, [
    {
      key: 'date',
      visual: DimensionType.CategoryAxis,
    },
    {
      key: 'type',
      visual: DimensionType.Series,
    },
  ])
  const metas = useLocalStorage<BasicMeta[]>(`${storagePrefix}.metas`, [
    {
      key: 'Data1',
      alias: '数据1',
    },
    {
      key: 'Data2',
      alias: '数据2',
    },
  ])
  const addons = useLocalStorage<{
    name: string
    parameters?: unknown[]
  }[]>(`${storagePrefix}.addons`, [
    {
      name: 'useBarStack',
    },
  ])

  const addonOptions = ref<string[]>([])
  const addonsExports = shallowRef<Record<string, (...args: unknown[]) => BuiltInAddon | UniversalAddon>>({})
  async function resolveAddonsExport() {
    addonsExports.value = await import('@packages/echarts/addons') as never
    addonOptions.value = Object.keys(addonsExports.value)
  }
  resolveAddonsExport()

  const option = computed(() => useEChartOption({
    dataset: dataset.value,
    dimensions: dimensions.value,
    metrics: metrics.value,
    meta: metas.value,
    addons: addons.value
      .map(addon => addonsExports.value[addon.name]?.apply(null, addon.parameters ?? []))
      .filter(_ => _ !== undefined),
  }))

  function toggleMetric(key: string) {
    const found = metrics.value.find(_ => _.key === key)
    if (found)
      metrics.value = metrics.value.filter(_ => _.key !== key)
    else
      metrics.value.push({ key, visual: MetricType.Bar })
  }

  function changeMetricVisual(key: string, visual: MetricType) {
    const found = metrics.value.find(_ => _.key === key)
    if (found)
      found.visual = visual
  }

  function toggleDimension(key: string) {
    const found = dimensions.value.find(_ => _.key === key)
    if (found)
      dimensions.value = dimensions.value.filter(_ => _.key !== key)
    else
      dimensions.value.push({ key, visual: DimensionType.CategoryAxis })
  }

  function changeDimensionVisual(key: string, visual: DimensionType) {
    const found = dimensions.value.find(_ => _.key === key)
    if (found)
      found.visual = visual
  }

  function toggleAddon(name: string) {
    const found = addons.value.find(_ => _.name === name)
    if (found)
      addons.value = addons.value.filter(_ => _.name !== name)
    else
      addons.value.push({ name })
  }

  return {
    dataset,
    metrics,
    dimensions,
    metas,
    addons,
    addonOptions,
    option,
    toggleMetric,
    changeMetricVisual,
    toggleDimension,
    changeDimensionVisual,
    toggleAddon,
  }
})
