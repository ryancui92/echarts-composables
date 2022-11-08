<script setup>
import LineBarDemo from './demo/LineBarDemo'
</script>

# 柱线图

:::tip
可以自由地编写独特的 Addon 来定制你的图表。
:::

<LineBarDemo />

```ts
import type { LineSeriesOption } from 'echarts'

useEChartOption({
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
```
