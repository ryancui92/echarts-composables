<script setup>
import LineAreaDemo from './demo/LineAreaDemo.vue'
</script>

# 区域折线图

<LineAreaDemo />

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
```
