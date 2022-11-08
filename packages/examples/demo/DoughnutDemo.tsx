import { defineComponent } from 'vue'
import VChart from 'vue-echarts'
import './index.css'
import {
  DimensionType,
  MetricType,
  useDoughnut,
  useDoughnutCenterTotal,
  useEChartOption,
} from '@packages/echarts'
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
          visual: DimensionType.Series,
        }
      ],
      metrics: [
        {
          key: 'Data1',
          visual: MetricType.Pie,
        }
      ],
      addons: [
        useDoughnut(),
        useDoughnutCenterTotal(),
      ]
    })
    return () => (
      <div class="demo-chart-container">
        <VChart option={option} autoresize />
      </div>
    )
  }
})
