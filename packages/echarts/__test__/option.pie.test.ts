import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'
import { legacyDataset } from '@packages/echarts/mock-data'
import type { PieSeriesOption } from 'echarts/types/dist/shared'

describe.concurrent('useEChartOption.Pie', () => {
  it.concurrent('pie series radius should not be undefined', () => {
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
      ]
    })
    expect(option.series).toHaveLength(1)
    expect(option.series[0]).toHaveProperty('type', 'pie')
    const pieSeries = option.series[0] as PieSeriesOption
    expect('radius' in pieSeries).toBeFalsy()
  })

  it.concurrent('pie series name should be alias', () => {
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
      meta: [
        {
          key: '2020',
          alias: 'data1-alias',
        }
      ]
    })
    const pieData = option.series[0].data as { name: string }[]
    expect(pieData.map(_ => _.name)).toContain('data1-alias')
  })
})
