# Add-ons

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

实际上，在内部实现中，Addon 会被分为两种类型：Built-in Addon 和 Universal Addon. 但对于调用者来说，你无须在意他们的区别，只需要选用你需要的 Addon 并添加即可。

## Built-in Addon

待补充。

## Universal Addon

更广泛地说，实际上一个 Addon 就是一个对 EChart option 进行原地修改的函数。因此我们允许所有开发者编写属于自己的 Addon 插件。

::: warning
特别需要注意的是，在 Universal Addon 的语境下，Addon 不再是一个 declarative 的东西，背后会是依赖执行顺序的若干次函数调用。
:::

待补充例子。
