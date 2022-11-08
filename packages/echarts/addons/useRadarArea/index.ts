import type { NormalizedEChartOption } from '@packages/echarts'
import type { RadarSeriesOption } from 'echarts'

export function useRadarArea() {
  return (option: NormalizedEChartOption) => {
    const radarSeries = option.series.filter(serie => serie.type === 'radar') as RadarSeriesOption[]
    radarSeries.forEach(radarSerie => {
      if (!radarSerie.areaStyle) {
        radarSerie.areaStyle = {}
      }
      radarSerie.areaStyle.opacity = 0.3
    })
  }
}
