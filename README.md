# echarts-composables

[![npm](https://img.shields.io/npm/v/echarts-composables)](https://www.npmjs.com/package/echarts-composables)

> This project still under quick developing, please be careful of using it in your production environment.

## Documentation

<a href="https://echarts.ryancui.com" target="_blank">https://echarts.ryancui.com</a>

## Quick Start

```bash
npm install echarts-composables
```

```ts
import { useEChartOption, DimensionType, MetricType } from 'echarts-composables'

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
      visual: MetricType.Bar,
    }
  ],
})
```
