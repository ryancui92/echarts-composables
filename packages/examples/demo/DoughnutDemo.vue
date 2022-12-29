<template>
  <div class="example-chart">
    <VChart :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import {
  DimensionType,
  MetricType,
  useDoughnut,
  useDoughnutCenterTotal,
  useEChartOption,
} from '@packages/echarts'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent, GraphicComponent } from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  GraphicComponent,
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
</script>
