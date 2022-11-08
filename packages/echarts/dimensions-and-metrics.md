---
outline: [2, 3]
---
# Dimensions & Metrics

图表的定义来自于维度与指标的定义。

## Dimensions

### CategoryAxis

类目轴维度。直角坐标下的一条维度轴，默认情况下为 X 轴。

### Series

系列维度。在可视化上通常用图例表示。

### RadarIndicator

雷达图维度。指雷达图的不同轴。（本质上，雷达图维度是极坐标下的角度轴）

### Geo

地理维度。需要在 EChart 中调用 `registerMap` 注册地图，并将地图 `key` 传入。

```ts
const dimensions = [
  {
    key: 'province',
    visual: DimensionType.Geo,
    map: 'china'
  }
]
```

### DateAxis

> 待开发。

## Metrics

在我们的设计中，没有「图表类型」这样的参数，图表的表现完全根据数据指标被定义成哪种可视化元素。

Metrics 所包含的类型大多与 EChart 的 series type 相同。

### Bar

柱状图。

### Line

折线图。

### Radar

雷达图。

### Pie

饼图。

### Funnel

漏斗图。

### Map

地图。
