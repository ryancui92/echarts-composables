import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'
import { legacyDataset } from '@packages/echarts/mock-data'
import type { RadarOption } from 'echarts/types/dist/shared'

describe.concurrent('useEChartOption.Radar', () => {
  it.concurrent('radar default with legacy dataset', () => {
    const option = useEChartOption({
      dataset: legacyDataset,
      dimensions: [
        {
          key: 'date',
          visual: DimensionType.RadarIndicator,
        }
      ],
      metrics: [
        {
          key: 'data1',
          visual: MetricType.Radar,
        },
        {
          key: 'data2',
          visual: MetricType.Radar,
        },
      ]
    })
    expect(option.series).toHaveLength(1)
    expect(option.series[0]).toHaveProperty('type', 'radar')
    expect(option.series[0].data).toHaveLength(2)
    expect(option.radar).toHaveProperty('indicator')
    expect((option.radar as RadarOption).indicator).toHaveLength(3)
    expect((option.radar as RadarOption).indicator?.[0].max).toEqual(1234)
  })
})
