<script setup>
import HorizontalBarDemo from './demo/HorizontalBarDemo.vue'
</script>  

# 水平柱状图

<HorizontalBarDemo />

```ts
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
      visual: MetricType.Bar,
    }
  ],
  addons: [
    useYAxisAsDimension()
  ]
})
```
