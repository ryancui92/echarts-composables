# 使用文档

> 本文档对应 `echarts-composables@0.2.2`
>
> 历史版本文档请查看对应版本 Tag 的分支。

## 简介

为什么要使用这个库？我可以直接查 ECharts 的[配置项文档](https://echarts.apache.org/en/option.html)，然后直接写 option,
这样不是更快吗？

如果你一直在做 EChart 相关的工作，每天都在写 EChart option,
对其配置项非常熟悉，那么这个库对你的帮助可能不大。在大部分时候，产品上只需要有一个能满足基本可视化需求的图表，使用这个库可以让你在
1 分钟内完成一个图表的开发，你不需要一直查阅 EChart 配置项手册，不需要写各种数据结构的转换函数来将你的数据转换成 EChart
所需要的数据。

你也可以将这个库理解成将 EChart 的大部分简单例子「集成」和「封装」了一下，变得更加方便和易用。

当然，这也意味着这不是一个对 EChart 所有配置项的封装，我只会支持所有足够「简单」并「常见」的场景，如果你的图表非常复杂，我会建议你直接使用
EChart 的原生配置项或者基于这个库生成的 option 做进一步的改动。

## 快速开始

### 安装

```bash
npm install echarts-composables
```

### 使用

准备好你需要做可视化的数据集，定义好维度和指标，然后调用 `useEChartOption` 方法即可，它会返回一个合法的 EChart option.

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

### 在 Vue 3 中使用

使用 [vue-echarts](https://github.com/ecomfe/vue-echarts) 即可，此处不再赘述。

需要注意的是，这里只是生成了 EChart option 并不会引入 EChart 相应的依赖，需要在代码中自行引入 EChart 的依赖。

```ts
// 【不推荐】直接全量引入 echarts
import 'echarts'

// 按需引入饼图
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent
])
```

## 数据集 Dataset

针对开发中常见的数据结构，我们支持了两种格式的数据集，分别是「二维数组」和「对象数组」。

```ts
// 二维数组，第一行为表头，后续行为数据
const dataset = [
  ['date', 'data1', 'data2'],
  ['2020', 1234, 456],
  ['2021', 567, 321],
  ['2022', 1, 5],
]
```

```ts
// 对象数组，每个对象的 key 为表头，value 为数据
const dataset = [
  { date: '2020', type: 'data1', value: 1234 },
  { date: '2020', type: 'data2', value: 456 },
  { date: '2021', type: 'data1', value: 567 },
  { date: '2021', type: 'data2', value: 321 },
  { date: '2022', type: 'data1', value: 1 },
  { date: '2022', type: 'data2', value: 5 },
]
```

在内部实现时，会将二维数组归一为对象数组处理。

## 维度 Dimension

使用 `DimensionType` 来定义数据维度的类型。不同的图表能使用的维度并不相同，如果你使用了不支持的维度，生成的 `option` 有可能不会被
EChart 所接受。

### DimensionType.CategoryAxis

类目轴维度。直角坐标下的一条维度轴，默认情况下为 X 轴。

### DimensionType.Series

系列维度。在可视化上通常用图例表示。

### DimensionType.RadarIndicator

雷达图维度。指雷达图的不同轴。（本质上，雷达图维度是极坐标下的角度轴）

### DimensionType.Geo

地理维度。需要在 EChart 中调用 `registerMap` 注册地图，并将地图 `key` 传入 `map` 参数。

```ts
const dimensions = [
  {
    key: 'province',
    visual: DimensionType.Geo,
    map: 'china'
  }
]
```

## 指标 Metric

在我们的设计中，没有「图表类型」这样的参数，图表的表现完全根据数据指标被定义成哪种可视化元素。

Metrics 所包含的类型大多与 EChart 的 series type 相同。使用 `MetricType` 来定义数据指标的类型。

### MetricType.Bar

柱状图。可以配置 `axisIndex: 1` 使用另一条指标轴。

### MetricType.Line

折线图。可以配置 `axisIndex: 1` 使用另一条指标轴。

### MetricType.Radar

雷达图。

### MetricType.Pie

饼图。

### MetricType.Funnel

漏斗图。

### MetricType.Map

地图。

## 元信息 Meta

默认情况下，数据的可视化会使用 `dataset` 中的字段名（即 JavaScript object 的 propertyName）。但很多时候，我们需要对字段进行有业务含义的定义，比如，我们需要对一个 `value` 的字段解释为 `声量`.

此时可以传入 `meta` 参数用于给 `dataset` 定义字段更丰富的含义。

使用 `alias` 可以给字段定义别名。

```ts
const option = useEChartOption({
  dataset,
  dimensions: [
    { key: 'date', visual: DimensionType.CategoryAxis },
    { key: 'type', visual: DimensionType.Series },
  ],
  metrics: {
    key: 'value',
    visual: MetricType.Bar,
  },
  meta: [
    { key: 'date', alias: '日期' },
    { key: 'type', alias: '类型' },
    { key: 'Data1', alias: '数据一' },
    { key: 'Data2', alias: '数据二' }
  ],
})
```

## 增强 Add-on

在保持尽可能简单的前提下，我们提供了 `useEChartOption` 方法用于根据数据、维度、指标生成最简单的 `option` 对象。

但很多时候，我们仍然需要对其中的可视化元素进行一些特定的修改，或变更图表最终的呈现形式。比如，增加折线图的区域填充颜色、将普通的柱状图变成堆叠柱状图。

这时候，Addon 就能很好的处理这些问题。你只需要选择你所需要的 Addon，然后通过 `addons` 参数指定开启即可。

```ts
import { 
  useEChartOption, 
  DimensionType, 
  MetricType,
  useLineArea,
} from 'echarts-composables'

const dataset = [
  ['Date', 'Data1', 'Data2'],
  ['2020', 450, 1233],
  ['2021', 23, 567],
  ['2022', 57, 77],
]

const dimensions = [{ 
  key: 'Date',
  visual: DimensionType.CategoryAxis,
}]

const metrics = [{
  key: 'Data1',
  visual: MetricType.Line,
}, {
  key: 'Data2',
  visual: MetricType.Line,
}]

const addons = [
  useLineArea()
]

const option = useEChartOption({ dataset, dimensions, metrics, addons })
```

所有 Addon 列表请参考 [Addon 列表](https://github.com/ryancui92/echarts-composables/blob/master/docs/zh/addon-list.md)。
