<template>
  <div class="w-full h-full min-h-full flex">
    <div class="w-350 b-r-1 b-r-solid b-r-neutral-200 dark:b-r-neutral-700">
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
      <div class="absolute top-20 left-20 flex items-center gap-8">
        <n-button type="primary" size="small" @click="isCodeModalShow = true">
          查看代码
        </n-button>
      </div>
      <div class="absolute top-20 right-20 flex items-center gap-8">
        <n-switch v-model:value="isDark" />
        <span class="text-16">Dark Mode</span>
      </div>
      <n-modal v-model:show="isCodeModalShow">
        <SimpleModalContent title="代码" class="w-800 h-80vh">
          <div class="bg-neutral-100 dark:bg-neutral-900 p-8 box-border">
            <!-- TODO: code mirror may be needed -->
            <n-code
              :code="tsCode"
              language="typescript"
              show-line-numbers
            />
          </div>
        </SimpleModalContent>
      </n-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import {
  lightTheme,
  darkTheme, DimensionType, MetricType,
} from '@packages/echarts'
import { lowerFirst } from 'lodash-es'
import 'echarts'
import { useColorScheme } from '@/composables/useColorScheme'
import OptionConfigurationPanel from '@/views/OptionConfigurationPanel.vue'
import { usePlayground } from '@/views/usePlayground'
import SimpleModalContent from '@/components/SimpleModalContent.vue'
import estreePlugin from 'prettier/plugins/estree'
import prettierTypeScript from 'prettier/plugins/typescript'
import * as prettier from 'prettier/standalone'

const isDark = useColorScheme()
const echartTheme = computed(() => isDark.value ? darkTheme : lightTheme)
// TODO: enable resize in chart card to see different width/height behaviour

const {
  dataset,
  metrics,
  dimensions,
  metas,
  addons,
  option,
} = usePlayground()

const isCodeModalShow = ref(false)
const tsCode = computedAsync(async () => {
  // replace enum string with enum definition in dimensions/metrics
  let dimensionsStr = JSON.stringify(dimensions.value, null, 2)
  Object.keys(DimensionType).forEach(key => {
    dimensionsStr = dimensionsStr.replaceAll(`"${lowerFirst(key)}"`, `DimensionType.${key}`)
  })
  let metricsStr = JSON.stringify(metrics.value, null, 2)
  Object.keys(MetricType).forEach(key => {
    metricsStr = metricsStr.replaceAll(`"${lowerFirst(key)}"`, `MetricType.${key}`)
  })
  return await prettier.format(`
const option = useEChartOption({
  dataset: ${JSON.stringify(dataset.value, null, 2)},
  dimensions: ${dimensionsStr},
  metrics: ${metricsStr},
  meta: ${JSON.stringify(metas.value, null, 2)},
  addons: [
  ${addons.value.map((addonDef) => {
    return addonDef.parameters?.length
      ? `${addonDef.name}(${addonDef.parameters.map(p => JSON.stringify(p, null, 2)).join(', ')}),`
      : `${addonDef.name}(),`
  })}
  ],
})
`, {
    parser: 'typescript',
    plugins: [estreePlugin, prettierTypeScript],
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  })
}, '')

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
