<template>
  <div class="example-chart">
    <VChart :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { DimensionType, MetricType, useEChartOption } from '@packages/echarts'
import type { LineSeriesOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
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
</script>
