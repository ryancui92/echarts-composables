---
outline: [2, 3]
---

# Quick Start

## Install

```bash
npm install echarts-composables
```

## useEChartOption

### Basic Dataset

通过 `useEChartOption` 传入数据、维度和指标，便可以快速构造一个 EChart option 来可视化你的数据。

```ts
import {
  useEChartOption,
  DimensionType,
  MetricType
} from 'echarts-composables'

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
  ]
})
```

你也可以直接使用对象数组作为数据。

```ts
import {
  useEChartOption,
  DimensionType,
  MetricType
} from 'echarts-composables'

const option = useEChartOption({ 
  dataset: [
    { date: 'Mon', type: 'Data1', value: 120 },
    { date: 'Tue', type: 'Data1', value: 200 },
    { date: 'Wed', type: 'Data1', value: 150 },
    { date: 'Mon', type: 'Data2', value: 678 },
    { date: 'Tue', type: 'Data2', value: 45 },
    { date: 'Wed', type: 'Data2', value: 89 },
  ], 
  dimensions: [
    {
      key: 'date',
      visual: DimensionType.CategoryAxis,
    }, {
      key: 'type',
      visual: DimensionType.Series,
    }
  ], 
  metrics: [
    {
      key: 'value',
      visual: MetricType.Bar,
    }
  ] 
})
```

### Meta

对某一个具体的 `dataset` 而言，可以通过 `meta` 参数指定对应字段的显示名称。如果不指定 `meta` 参数，会默认使用 `dataset`
的 `key` 作为显示名称。

`meta` 指定的显示名称会作用于直角坐标轴名、系列名称等地方。

```ts
import {
  useEChartOption,
  DimensionType,
  MetricType
} from 'echarts-composables'

const option = useEChartOption({ 
  dataset: [
    { date: 'Mon', type: 'Data1', value: 120 },
    { date: 'Tue', type: 'Data1', value: 200 },
    { date: 'Wed', type: 'Data1', value: 150 },
    { date: 'Mon', type: 'Data2', value: 678 },
    { date: 'Tue', type: 'Data2', value: 45 },
    { date: 'Wed', type: 'Data2', value: 89 },
  ], 
  dimensions: [
    {
      key: 'date',
      visual: DimensionType.CategoryAxis,
    }, {
      key: 'type',
      visual: DimensionType.Series,
    }
  ], 
  metrics: [
    {
      key: 'value',
      visual: MetricType.Bar,
    }
  ], 
  meta: [
    { key: 'date', alias: '日期' },
    { key: 'type', alias: '阵地' },
    { key: 'value', alias: '互动量' },
  ] 
})
```

### Addons

针对各种不同的可视化场景，我们提供了大量的内置 Addon 插件，用于扩展默认生成的 `option`. 传入 `addons` 参数即可启用这些插件。

Addon 的详细介绍请查看 [Add-ons](/echarts/addons).

```ts
import {
  useEChartOption,
  DimensionType,
  MetricType,
  useLineArea,
} from 'echarts-composables'

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
  addons: [
    useLineArea()
  ]
})
```

## useEChartTheme

通过 `useEChartTheme` 可以为你的图表生成一份 EChart theme 对象。可以将这个对象传入 `vue-echarts` 的 `:theme`
属性中，或者调用 `registerTheme` 注册到 EChart 中使用。

```ts
import { useEChartTheme } from 'echarts-composables'

const theme = useEChartTheme()
```


