import { describe, expect, it } from 'vitest'
import { DimensionType, MetricType, useBarStack, useEChartOption } from '@packages/echarts'
import { legacyDataset } from '@packages/echarts/mock-data'
import type { BarSeriesOption } from 'echarts'

describe.concurrent('useBarStack', () => {
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
          visual: MetricType.Bar,
        },
        {
          key: 'data2',
          visual: MetricType.Bar,
        },
        {
          key: 'data3',
          visual: MetricType.Bar,
        },
      ],
      addons: [
        useBarStack(),
      ],
    })
    expect(option.series).toHaveLength(3)
    const series = option.series as BarSeriesOption[]
    expect(series[0].stack).toEqual(series[1].stack)
    expect(series[1].stack).toEqual(series[2].stack)
    expect(series[0].itemStyle?.borderRadius).toEqual(0)
    expect(series[1].itemStyle?.borderRadius).toEqual(0)
  })

  it.concurrent('1 parameters', () => {
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
          visual: MetricType.Bar,
        },
        {
          key: 'data2',
          visual: MetricType.Bar,
        },
        {
          key: 'data3',
          visual: MetricType.Bar,
        },
      ],
      addons: [
        useBarStack(['data2', 'data3']),
      ],
    })
    expect(option.series).toHaveLength(3)
    const series = option.series as BarSeriesOption[]
    expect(series[0].stack).not.toEqual(series[1].stack)
    expect(series[1].stack).toEqual(series[2].stack)
    expect(series[0].itemStyle?.borderRadius).not.toEqual(0)
    expect(series[1].itemStyle?.borderRadius).toEqual(0)
  })

  it.concurrent('2 parameters', () => {
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
          visual: MetricType.Bar,
        },
        {
          key: 'data2',
          visual: MetricType.Bar,
        },
        {
          key: 'data3',
          visual: MetricType.Bar,
        },
        {
          key: 'data4',
          visual: MetricType.Bar,
        },
      ],
      addons: [
        useBarStack(['data2', 'data4'], ['data1', 'data3']),
      ],
    })
    expect(option.series).toHaveLength(4)
    const series = option.series as BarSeriesOption[]
    expect(series[0].stack).toEqual(series[2].stack)
    expect(series[1].stack).toEqual(series[3].stack)
    expect(series[1].itemStyle?.borderRadius).toEqual(0)
    expect(series[0].itemStyle?.borderRadius).toEqual(0)
  })
})
