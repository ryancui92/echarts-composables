# useBarStack

将柱状图变成堆叠柱状图。

## Examples

```ts
// 所有 seriesType='bar' 都会被堆叠
useBarStack()

// 指定需要堆叠的指标 key
useBarStack(['data1', 'data2'])

// 分开两组进行堆叠
useBarStack(['data1', 'data2'], ['data3', 'data4'])
```
