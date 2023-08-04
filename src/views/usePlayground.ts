import type { BasicMeta, BasicDimension, BasicMetric, LegacyDataset, NormalizedDataset } from '@packages/echarts'
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

export const usePlayground = createSharedComposable(() => {
  const dataset = ref<LegacyDataset | NormalizedDataset>(presetDataset[0])

  const metrics = ref<BasicMetric[]>([
    {
      key: 'value',
      visual: MetricType.Bar
    }
  ])

  const dimensions = ref<BasicDimension[]>([
    {
      key: 'date',
      visual: DimensionType.CategoryAxis,
    },
    {
      key: 'type',
      visual: DimensionType.Series,
    },
  ])

  const metas = ref<BasicMeta[]>([
    {
      key: 'Data1',
      alias: '数据1',
    },
    {
      key: 'Data2',
      alias: '数据2',
    },
  ])

  const addons = ref<string[]>([
    'useBarStack',
  ])

  const option = computed(() => useEChartOption({
    dataset: dataset.value,
    dimensions: dimensions.value,
    metrics: metrics.value,
    meta: metas.value,
    addons: [], // TODO: map string into actual functions
  }))

  return {
    dataset,
    metrics,
    dimensions,
    metas,
    addons,
    option,
  }
})
