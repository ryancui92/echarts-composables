import type { NormalizedEChartOption } from '@packages/echarts'
import type { LineSeriesOption } from 'echarts'

export function useLineArea() {
  return (option: NormalizedEChartOption) => {
    const lineSeries = option.series.filter((serie) => serie.type === 'line') as LineSeriesOption[]
    for (const lineSerie of lineSeries) {
      lineSerie.areaStyle = {
        opacity: 0.3
      }
    }
  }
}
