<script setup>
import DoughnutDemo from './demo/DoughnutDemo.vue'
</script>

# 环形图

::: tip
这里中间的文字并没有做自适应，请根据实际情况调整 `option.graphic.elements` 的配置。
:::

<DoughnutDemo />

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
```


