# 快速开始

## 安装

```bash
npm install echarts-composables
```

## useEChartOption

核心 API 是 `useEChartOption`, 通过这个方法快速构造一个 EChart option.

```ts
import { 
  useEChartOption, 
  DimensionType, 
  MetricType 
} from 'echarts-composables'

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
```
