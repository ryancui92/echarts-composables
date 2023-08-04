<template>
  <div class="w-full h-full min-h-full flex">
    <div class="w-300 b-r-1 b-r-solid b-r-neutral-200 dark:b-r-neutral-700">
      <OptionConfigurationPanel />
    </div>
    <div class="h-full flex-1 relative flex items-center justify-center p-16 box-border">
      <div class="w-55vw h-35vw max-w-full shadow-xl rounded-16 p-16 box-border b-1 b-solid b-neutral-200
        dark:b-neutral-700 dark:bg-neutral-800 dark:shadow-black">
        <VChart
          :option="option"
          autoresize
          :theme="echartTheme"
          :update-options="{ notMerge: true }"
          class="w-full h-full"
        />
      </div>
      <div class="absolute top-20 right-20 flex items-center gap-8">
        <n-switch v-model:value="isDark" />
        <span class="text-16">Dark Mode</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import {
  lightTheme,
  darkTheme,
} from '@packages/echarts'
import 'echarts'
import { useColorScheme } from '@/composables/useColorScheme'
import OptionConfigurationPanel from '@/views/OptionConfigurationPanel.vue'
import { usePlayground } from '@/views/usePlayground'

const isDark = useColorScheme()
const echartTheme = computed(() => isDark.value ? darkTheme : lightTheme)
// TODO: enable resize in chart card to see different width/height behaviour

const {
  option,
} = usePlayground()

// const dataset = [
//   { date: 'Mon', type: 'Data1', value: 120 },
//   { date: 'Tue', type: 'Data1', value: 200 },
//   { date: 'Wed', type: 'Data1', value: 150 },
//   { date: 'Thu', type: 'Data1', value: 80 },
//   { date: 'Fri', type: 'Data1', value: 70 },
//   { date: 'Sat', type: 'Data1', value: 110 },
//   { date: 'Sun', type: 'Data1', value: 130 },
//   { date: 'Mon', type: 'Data2', value: 678 },
//   { date: 'Tue', type: 'Data2', value: 45 },
//   { date: 'Wed', type: 'Data2', value: 89 },
//   { date: 'Thu', type: 'Data2', value: 35 },
//   { date: 'Fri', type: 'Data2', value: 123 },
//   { date: 'Sat', type: 'Data2', value: 66 },
//   { date: 'Sun', type: 'Data2', value: 12 },
// ]
// const anotherDataset = [
//   ['Date', '数据1', '数据2', '数据3', '数据4'],
//   ['Mon', 123, 467, 456, 23],
//   ['Tue', 456, 56, 5, 780],
//   ['Web', 45, 431, 34, 341],
//   ['Thu', 12, 123, 899, 46],
//   ['Fri', 899, 588, 456, 567],
// ]
//
// // 反过来的柱状图
// const anotherOption = useEChartOption({
//   dataset: anotherDataset,
//   dimensions: { key: 'Date', visual: DimensionType.CategoryAxis },
//   metrics: [
//     {
//       key: '数据1',
//       visual: MetricType.Bar,
//     },
//     {
//       key: '数据2',
//       visual: MetricType.Bar,
//     },
//     {
//       key: '数据3',
//       visual: MetricType.Bar,
//     },
//     {
//       key: '数据4',
//       visual: MetricType.Bar,
//     },
//   ],
//   addons: [
//     useYAxisAsDimension(),
//     useBarStack(['数据1', '数据3'], ['数据2', '数据4']),
//   ]
// })
//
// // 环形图
// const pieOption = useEChartOption({
//   dataset: anotherDataset,
//   dimensions: { key: 'Date', visual: DimensionType.Series },
//   metrics: { key: '数据1', visual: MetricType.Pie },
//   addons: [
//     // useDoughnut(),
//     // useDoughnutCenterTotal(),
//   ]
// })
// console.log(pieOption)
//
// // 带阴影的折线图
// const lineOption = useEChartOption({
//   dataset: anotherDataset,
//   dimensions: { key: 'Date', visual: DimensionType.CategoryAxis },
//   metrics: [{
//     key: '数据1',
//     visual: MetricType.Line,
//   }, {
//     key: '数据2',
//     visual: MetricType.Line,
//   }],
//   addons: [
//     useLineArea()
//   ]
// })
//
// const funnelOption = useEChartOption({
//   dataset: anotherDataset,
//   dimensions: [{ key: 'Date', visual: DimensionType.Series }],
//   metrics: [{ key: '数据1', visual: MetricType.Funnel }],
// })
//
// const radarOption1 = useEChartOption({
//   dataset: anotherDataset,
//   dimensions: [{
//     key: 'Date',
//     visual: DimensionType.RadarIndicator,
//   }],
//   metrics: [{
//     key: '数据1',
//     visual: MetricType.Radar,
//   }, {
//     key: '数据2',
//     visual: MetricType.Radar,
//   }],
//   addons: [
//     useRadarArea()
//   ]
// })
//
// const radarOption2 = useEChartOption({
//   dataset: dataset,
//   dimensions: [{
//     key: 'date',
//     visual: DimensionType.RadarIndicator,
//   }, {
//     key: 'type',
//     visual: DimensionType.Series,
//   }],
//   metrics: [{
//     key: 'value',
//     visual: MetricType.Radar,
//   }]
// })
</script>
