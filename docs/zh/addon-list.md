# Addon 列表

## useBarStack

将柱状图变成堆叠柱状图。

### Examples

```ts
// 所有 seriesType='bar' 都会被堆叠
useBarStack()

// 指定需要堆叠的指标 key
useBarStack(['data1', 'data2'])

// 分开两组进行堆叠
useBarStack(['data1', 'data2'], ['data3', 'data4'])
```

## useDoughnut

将饼图变成环形图。

### Examples

```ts
useDoughnut()

useDoughnut({
  inner: 20,
  outer: 60,
})
```

## useLineArea

为所有 `type=line` 的系列添加区域填充色。

### Examples

```ts
useLineArea()
```

## useRadarArea

对所有 `type=radar` 的雷达图系列增加区域填充色。

### Examples

```ts
useRadarArea()
```
