<template>
  <div class="example-chart">
    <VChart :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import {
  useEChartOption,
  DimensionType,
  MetricType,
  useLineArea,
} from '@packages/echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
])

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
</script>
