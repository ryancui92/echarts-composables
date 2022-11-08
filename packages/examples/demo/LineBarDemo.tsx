import { defineComponent } from 'vue'
import VChart from 'vue-echarts'
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'
import './index.css'
import type { LineSeriesOption } from 'echarts'
import 'echarts'

export default defineComponent({
  setup() {
    const option = useEChartOption({
      dataset: [
        ['Date', 'Data1', 'Data2'],
        ['2020', 450, 1233],
        ['2021', 23, 567],
        ['2022', 57, 77],
      ],
      dimensions: [
        {
          key: 'Date',
          visual: DimensionType.CategoryAxis,
        }
      ],
      metrics: [
        {
          key: 'Data1',
          visual: MetricType.Bar,
        }, {
          key: 'Data2',
          visual: MetricType.Line,
          axisIndex: 1,
        }
      ],
      addons: [
        (option) => {
          const line = option.series[1] as LineSeriesOption
          line.symbol = 'emptyCircle'
          line.showSymbol = true
          line.symbolSize = 12
          line.smooth = false
        }
      ]
    })
    return () => (
      <div class="demo-chart-container">
        <VChart option={option} autoresize />
      </div>

    )
  }
})
