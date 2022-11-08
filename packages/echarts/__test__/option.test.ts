import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'

const legacyDataset = [
  ['date', 'data1', 'data2'],
  ['2020', 1234, 456],
  ['2021', 567, 321],
  ['2022', 1, 5],
]

const standardDataset = [
  { date: '2020', type: 'data1', value: 1234 },
  { date: '2020', type: 'data2', value: 456 },
  { date: '2021', type: 'data1', value: 567 },
  { date: '2021', type: 'data2', value: 321 },
  { date: '2022', type: 'data1', value: 1 },
  { date: '2022', type: 'data2', value: 5 },
]

describe.concurrent('useEChartOption.Dataset', () => {
  it.concurrent('legacy dataset', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [{
        key: 'date',
        visual: DimensionType.CategoryAxis,
      }],
      metrics: [{
        key: 'data1',
        visual: MetricType.Bar,
      }, {
        key: 'data2',
        visual: MetricType.Bar,
      }]
    })
    expect(option.series).toHaveLength(2)
    expect(option.series[0]).toHaveProperty('type', 'bar')
    expect(option.series[0].data).toEqual(legacyDataset.slice(1).map((datum) => [datum[0], datum[1]]))
    expect(option.series[1].data).toEqual(legacyDataset.slice(1).map((datum) => [datum[0], datum[2]]))
  })

  it.concurrent('standard dataset', () => {
    const option = useEChartOption({
      dataset: standardDataset,
      dimensions: [{
        key: 'date',
        visual: DimensionType.CategoryAxis,
      }, {
        key: 'type',
        visual: DimensionType.Series,
      }],
      metrics: [{
        key: 'value',
        visual: MetricType.Bar,
      }]
    })
    expect(option.series).toHaveLength(2)
    expect(option.series[0]).toHaveProperty('name', 'data1')
    expect(option.series[1]).toHaveProperty('name', 'data2')
    expect(option.series[0].data).toEqual(legacyDataset.slice(1).map((datum) => [datum[0], datum[1]]))
    expect(option.series[1].data).toEqual(legacyDataset.slice(1).map((datum) => [datum[0], datum[2]]))
  })
})

describe.concurrent('useEChartOption.Bar', () => {
  it.concurrent('bar default', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [{
        key: 'date',
        visual: DimensionType.CategoryAxis,
      }],
      metrics: [{
        key: 'data1',
        visual: MetricType.Bar,
      }]
    })
    expect(option.series).toHaveLength(1)
    expect(option.series[0]).toHaveProperty('name', 'data1')
    expect(option.series[0]).toHaveProperty('barGap', '50%')
    expect(option.series[0]).toHaveProperty('itemStyle.borderRadius', [4, 4, 0, 0])
  })
})
