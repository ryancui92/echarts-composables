# 数据元信息

默认情况下，数据的可视化会使用 `dataset` 中的字段名（即 JavaScript object 的 propertyName）。但很多时候，我们需要对字段进行有业务含义的定义，比如，我们需要对一个 `value` 的字段解释为 `声量`.

此时可以传入 `meta` 参数用于给 `dataset` 定义字段更丰富的含义。

使用 `alias` 可以给字段定义别名。

```ts {11-16}
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
