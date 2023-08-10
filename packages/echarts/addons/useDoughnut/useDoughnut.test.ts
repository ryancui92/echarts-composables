import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useDoughnut, useEChartOption } from '@packages/echarts'
import { legacyDataset } from '@packages/echarts/mock-data'
import type { PieSeriesOption } from 'echarts'

describe.concurrent('useDoughnut', () => {
  it.concurrent('no parameters', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [
        {
          key: 'date',
          visual: DimensionType.Series,
        }
      ],
      metrics: [
        {
          key: 'data1',
          visual: MetricType.Pie,
        },
      ],
      addons: [
        useDoughnut(),
      ],
    })
    expect(option.series).toHaveLength(1)
    const series = option.series as PieSeriesOption[]
    expect('radius' in series[0]).toBeTruthy()
    expect(series[0].radius).toHaveLength(2)
  })

  it.concurrent('inner and outer parameters', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [
        {
          key: 'date',
          visual: DimensionType.Series,
        }
      ],
      metrics: [
        {
          key: 'data1',
          visual: MetricType.Pie,
        },
      ],
      addons: [
        useDoughnut({ inner: 40, outer: 80 }),
      ],
    })
    expect(option.series).toHaveLength(1)
    const series = option.series as PieSeriesOption[]
    expect('radius' in series[0]).toBeTruthy()
    expect(series[0].radius).toHaveLength(2)
    expect(series[0].radius).toEqual(['40%', '80%'])
  })
})
