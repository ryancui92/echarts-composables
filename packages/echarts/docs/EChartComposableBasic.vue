<template>
  <div class="example-chart">
    <div ref="ec" style="height: 100%; width: 100%;" />
  </div>
</template>

<script setup lang="ts">
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { BasicDimension, BasicMetric } from '@packages/echarts'

const dataset = [
  ['Date', 'Data1', 'Data2'],
  ['2020', 450, 1233],
  ['2021', 23, 567],
  ['2022', 57, 77],
]

const dimensions: BasicDimension[] = [
  {
    key: 'Date',
    visual: DimensionType.CategoryAxis,
  }
]

const metrics: BasicMetric[] = [
  {
    key: 'Data1',
    visual: MetricType.Bar,
  },
  {
    key: 'Data2',
    visual: MetricType.Bar,
  }
]

const option = useEChartOption({
  dataset, dimensions, metrics,
})

const ec = ref()
onMounted(() => {
  const instance = echarts.init(ec.value)
  instance.setOption(option)
})
</script>
