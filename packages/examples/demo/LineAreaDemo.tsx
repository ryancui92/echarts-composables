import { defineComponent } from 'vue'
import VChart from 'vue-echarts'
import {
  useEChartOption,
  DimensionType,
  MetricType,
  useLineArea,
} from '@packages/echarts'
import './index.css'
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
          visual: MetricType.Line,
        }, {
          key: 'Data2',
          visual: MetricType.Line,
        }
      ],
      addons: [
        useLineArea()
      ]
    })
    return () => (
      <div class="demo-chart-container">
        <VChart option={option} autoresize />
      </div>

    )
  }
})
