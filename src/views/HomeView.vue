<template>
  <div class="flex-box">
    <VChart :option="option" autoresize class="demo-chart" />
    <VChart :option="anotherOption" autoresize class="demo-chart" />
    <VChart :option="lineOption" autoresize class="demo-chart" />
    <VChart :option="pieOption" class="demo-chart" />
    <VChart :option="funnelOption" autoresize class="demo-chart" />
    <VChart :option="radarOption1" autoresize class="demo-chart" />
    <VChart :option="radarOption2" autoresize class="demo-chart" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VChart from 'vue-echarts'
import {
  DimensionType,
  MetricType,
  useEChartOption,
  useYAxisAsDimension,
  useLineArea,
  useRadarArea,
  useDoughnut,
  useDoughnutCenterTotal,
} from '@packages/echarts'
import 'echarts'

export default defineComponent({
  components: {
    VChart,
  },
  setup() {
    const dataset = [
      { date: 'Mon', type: 'Data1', value: 120 },
      { date: 'Tue', type: 'Data1', value: 200 },
      { date: 'Wed', type: 'Data1', value: 150 },
      { date: 'Thu', type: 'Data1', value: 80 },
      { date: 'Fri', type: 'Data1', value: 70 },
      { date: 'Sat', type: 'Data1', value: 110 },
      { date: 'Sun', type: 'Data1', value: 130 },
      { date: 'Mon', type: 'Data2', value: 678 },
      { date: 'Tue', type: 'Data2', value: 45 },
      { date: 'Wed', type: 'Data2', value: 89 },
      { date: 'Thu', type: 'Data2', value: 35 },
      { date: 'Fri', type: 'Data2', value: 123 },
      { date: 'Sat', type: 'Data2', value: 66 },
      { date: 'Sun', type: 'Data2', value: 12 },
    ]
    const anotherDataset = [
      ['Date', '数据1', '数据2'],
      ['Mon', 123, 467],
      ['Tue', 456, 56],
      ['Web', 45, 431],
      ['Thu', 12, 123],
      ['Fri', 899, 588],
    ]

    // 柱状图
    const option = useEChartOption({
      dataset,
      dimensions: [
        { key: 'date', visual: DimensionType.CategoryAxis },
        { key: 'type', visual: DimensionType.Series },
      ],
      metrics: {
        key: 'value',
        visual: MetricType.Bar,
      },
      meta: [
        { key: 'date', alias: '日期' },
        { key: 'type', alias: '类型' },
        { key: 'Data1', alias: '数据一' },
        { key: 'Data2', alias: '数据二' }
      ]
    })

    // 反过来的柱状图
    const anotherOption = useEChartOption({
      dataset: anotherDataset,
      dimensions: { key: 'Date', visual: DimensionType.CategoryAxis },
      metrics: [
        {
          key: '数据1',
          visual: MetricType.Bar,
        },
        {
          key: '数据2',
          visual: MetricType.Line,
          axisIndex: 1,
        },
      ],
      addons: [
        useYAxisAsDimension()
      ]
    })

    // 环形图
    const pieOption = useEChartOption({
      dataset: anotherDataset,
      dimensions: { key: 'Date', visual: DimensionType.Series },
      metrics: { key: '数据1', visual: MetricType.Pie },
      addons: [
        useDoughnut(),
        useDoughnutCenterTotal(),
      ]
    })

    // 带阴影的折线图
    const lineOption = useEChartOption({
      dataset: anotherDataset,
      dimensions: { key: 'Date', visual: DimensionType.CategoryAxis },
      metrics: [{
        key: '数据1',
        visual: MetricType.Line,
      }, {
        key: '数据2',
        visual: MetricType.Line,
      }],
      addons: [
        useLineArea()
      ]
    })

    const funnelOption = useEChartOption({
      dataset: anotherDataset,
      dimensions: [{ key: 'Date', visual: DimensionType.Series }],
      metrics: [{ key: '数据1', visual: MetricType.Funnel }],
    })

    const radarOption1 = useEChartOption({
      dataset: anotherDataset,
      dimensions: [{
        key: 'Date',
        visual: DimensionType.RadarIndicator,
      }],
      metrics: [{
        key: '数据1',
        visual: MetricType.Radar,
      }, {
        key: '数据2',
        visual: MetricType.Radar,
      }],
      addons: [
        useRadarArea()
      ]
    })

    const radarOption2 = useEChartOption({
      dataset: dataset,
      dimensions: [{
        key: 'date',
        visual: DimensionType.RadarIndicator,
      }, {
        key: 'type',
        visual: DimensionType.Series,
      }],
      metrics: [{
        key: 'value',
        visual: MetricType.Radar,
      }]
    })

    return {
      option,
      anotherOption,
      pieOption,
      lineOption,
      funnelOption,
      radarOption1,
      radarOption2,
    }
  }
})
</script>

<style>
.flex-box {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.demo-chart {
  min-width: 500px;
  height: 300px;
  flex: 1;
}
</style>
