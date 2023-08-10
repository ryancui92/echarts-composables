import type { NormalizedEChartOption } from '@packages/echarts'
import type { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'

/**
 * @deprecated no need to rotate the graph if we have xAxis and yAxis dimension type
 */
/* c8 ignore start */
export function useYAxisAsDimension() {
  // TODO: will be depracated, maintain current logic
  return (option: NormalizedEChartOption) => {
    if (!option.xAxis || !option.yAxis) return
    // x 是 category 轴，y 是 value 轴
    if (option.yAxis.every((y) => y.type === 'value')) {
      const { xAxis, yAxis } = option
      option.xAxis = yAxis as XAXisOption[]
      option.yAxis = xAxis as YAXisOption[]

      option.series.forEach((serie) => {
        // 调整 line/bar series 的 data
        if ((serie.type === 'line' || serie.type === 'bar') && Array.isArray(serie.data)) {
          serie.data = serie.data.map((datum) =>
            Array.isArray(datum) ? [datum[1], datum[0]] : datum
          )

          serie.xAxisIndex = Number(serie.yAxisIndex)
          serie.yAxisIndex = undefined
        }

        // 调整 bar 的圆角
        if (serie.type === 'bar' && serie.itemStyle) {
          const [leftTop, rightTop, rightBottom, leftBottom] = Array.isArray(serie.itemStyle.borderRadius)
            ? serie.itemStyle.borderRadius
            : new Array(4).fill(serie.itemStyle.borderRadius ?? 0)
          serie.itemStyle.borderRadius = [leftBottom, leftTop, rightTop, rightBottom]
        }
      })
    }
  }
}
/* c8 ignore stop */
