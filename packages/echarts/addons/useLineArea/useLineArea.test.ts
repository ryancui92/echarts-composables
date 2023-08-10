import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useEChartOption, useLineArea } from '@packages/echarts'
import { legacyDataset } from '@packages/echarts/mock-data'
import type { BarSeriesOption, LineSeriesOption } from 'echarts'

describe.concurrent('useLineArea', () => {
  it.concurrent('no parameters', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [
        {
          key: 'date',
          visual: DimensionType.CategoryAxis,
        }
      ],
      metrics: [
        {
          key: 'data1',
          visual: MetricType.Line,
        },
      ],
      addons: [
        useLineArea(),
      ],
    })
    expect(option.series).toHaveLength(1)
    const series = option.series as LineSeriesOption[]
    expect(series[0].areaStyle?.opacity).toEqual(0.3)
  })

  it.concurrent('should not affect other series', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [
        {
          key: 'date',
          visual: DimensionType.CategoryAxis,
        }
      ],
      metrics: [
        {
          key: 'data1',
          visual: MetricType.Line,
        },
        {
          key: 'data2',
          visual: MetricType.Bar,
        }
      ],
      addons: [
        useLineArea(),
      ],
    })
    expect(option.series).toHaveLength(2)
    const lineSeries = option.series[0] as LineSeriesOption
    const barSeries = option.series[1] as BarSeriesOption
    expect(lineSeries.areaStyle?.opacity).toEqual(0.3)
    expect('areaStyle' in barSeries).toBeFalsy()
  })
})
