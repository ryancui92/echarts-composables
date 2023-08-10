import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useEChartOption, useRadarArea } from '@packages/echarts'
import { legacyDataset } from '@packages/echarts/mock-data'
import type { RadarSeriesOption } from 'echarts'

describe.concurrent('useRadarArea', () => {
  it.concurrent('no parameters', () => {
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
      ],
      addons: [
        useRadarArea(),
      ],
    })
    expect(option.series).toHaveLength(1)
    const series = option.series as RadarSeriesOption[]
    expect(series[0].areaStyle?.opacity).toEqual(0.3)
  })
})
