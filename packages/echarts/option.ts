import { cloneDeep, merge } from 'lodash-es'
import type {
  BarMetric,
  BasicDataset,
  BasicDimension,
  BasicMeta,
  BasicMetric,
  BuiltInAddon,
  CategoryAxisDimension,
  GeoDimension,
  LegacyDataset,
  LineMetric,
  NormalizedDataset,
  NormalizedEChartOption,
  NormalMetric,
  RadarIndicatorDimension,
  SeriesDimension,
  UniversalAddon, UseBarStack,
  UseDoughnut,
} from '@packages/echarts/types'
import { BuiltInAddonType, DimensionType, MetricType } from '@packages/echarts/types'
import type { BarSeriesOption } from 'echarts'

function isValid(value: string | number) {
  return value === 0 || !!value
}

function normalizeDataset(dataset: LegacyDataset): NormalizedDataset {
  // 默认第一行就是维度名
  const result: NormalizedDataset = []
  const dimensionNames = dataset[0]
  for (let row = 1; row < dataset.length; row++) {
    const datum: Record<string, string | number> = {}
    for (let col = 0; col < dimensionNames.length; col++) {
      datum[`${dimensionNames[col]}`] = dataset[row][col]
    }
    result.push(datum)
  }
  return result
}

const defaultOption: NormalizedEChartOption = {
  series: [],
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    },
    confine: true,
  },
  legend: {
    show: true,
    type: 'scroll',
    itemWidth: 8,
    itemHeight: 8,
    orient: 'horizontal',
    left: 'center',
    bottom: 5,
  }
}

const defaultVisualMap = {
  text: [
    '高',
    '低'
  ],
  left: 20,
  bottom: 20,
  itemWidth: 15,
  itemHeight: 100,
  calculable: true,
  show: true,
  textStyle: {
    fontSize: 12,
  }
}

export interface EChartOptionParams {
  dataset: BasicDataset,
  dimensions: BasicDimension | BasicDimension[],
  metrics: BasicMetric | BasicMetric[],
  meta?: BasicMeta[],
  addons?: (UniversalAddon | BuiltInAddon)[],
}

export function useEChartOption(params: EChartOptionParams): NormalizedEChartOption {
  const { meta = [], addons = [] } = params

  if (params.dataset.length === 0) {
    return { series: [] }
  }

  const dimensions = Array.isArray(params.dimensions) ? params.dimensions : [params.dimensions]
  const metrics = Array.isArray(params.metrics) ? params.metrics : [params.metrics]
  const dataset = Array.isArray(params.dataset[0])
    ? normalizeDataset(params.dataset as LegacyDataset)
    : params.dataset as NormalizedDataset

  const universalAddons = addons.filter(addon => typeof addon === 'function') as UniversalAddon[]
  const builtInAddons = addons.filter(addon => typeof addon !== 'function') as BuiltInAddon[]

  const option = cloneDeep(defaultOption)

  const categoryAxisDimension = dimensions.find((dm) => dm.visual === DimensionType.CategoryAxis) as CategoryAxisDimension
  const seriesDimension = dimensions.find((dm) => dm.visual === DimensionType.Series) as SeriesDimension
  const radarIndicatorDimension = dimensions.find((dm) => dm.visual === DimensionType.RadarIndicator) as RadarIndicatorDimension
  const geoDimension = dimensions.find(dm => dm.visual === DimensionType.Geo) as GeoDimension

  // Bar and Line
  const barOrLineMetrics = metrics.filter((mt) => [MetricType.Bar, MetricType.Line].includes(mt.visual)) as (BarMetric | LineMetric)[]
  const usedBarStack = builtInAddons.find(addon => addon.name === BuiltInAddonType.useBarStack) as (UseBarStack | undefined)
  const barOrLineSeries = []
  for (const barOrLineMetric of barOrLineMetrics) {
    // 柱状图系列必须要有类目维度轴
    if (!categoryAxisDimension) {
      continue
    }

    // 找出存在这个指标的所有 datum
    const relatedData = dataset.filter((datum) => isValid(datum[barOrLineMetric.key]))
    // 每一个 Legend 对应的维度在 echarts 里就是一个 serie
    let serieNames: string[] = []
    if (seriesDimension) {
      serieNames = Array.from(new Set(relatedData.map((datum) => `${datum[seriesDimension.key]}`))) // TODO: 系列名排序
    } else {
      serieNames = [barOrLineMetric.key]
    }

    barOrLineSeries.push(...serieNames.map((serieName) => {
      const data = (
        seriesDimension ? relatedData.filter((datum) => datum[seriesDimension.key] === serieName) : relatedData
      ).map((datum) => ([datum[categoryAxisDimension?.key], datum[barOrLineMetric.key]]))
      const serieAlias = meta.find(({ key }) => key === serieName)?.alias ?? serieName
      if (barOrLineMetric.visual === MetricType.Bar) {
        let stack
        if (usedBarStack) {
          if (!usedBarStack.stacks) {
            stack = 'stack'
          } else {
            const belong2Stack = usedBarStack.stacks.find(stack => stack.keys.includes(serieName))
            if (belong2Stack) {
              stack = belong2Stack.name
            }
          }
        }
        return {
          type: 'bar' as const,
          name: serieAlias,
          data,
          yAxisIndex: barOrLineMetric.axisIndex ?? 0,
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
          },
          barGap: '50%',
          stack,
        }
      } else {
        return {
          type: 'line' as const,
          name: serieAlias,
          data,
          yAxisIndex: barOrLineMetric.axisIndex ?? 0,
          showSymbol: false,
        }
      }
    }))
  }

  // 堆叠的柱状图需要处理圆角，倒序遍历，将 stack 中除了第一个的圆角去掉
  if (usedBarStack) {
    const stackNames = new Set<string>()
    for (let i = barOrLineSeries.length - 1; i >= 0; i--) {
      if (barOrLineSeries[i].type === 'line') {
        continue
      }
      const bar = barOrLineSeries[i] as BarSeriesOption
      if (bar.stack && stackNames.has(bar.stack) && bar.itemStyle) {
        bar.itemStyle.borderRadius = 0
      }
      if (bar.stack) {
        stackNames.add(bar.stack)
      }
    }
  }
  option.series.push(...barOrLineSeries)

  // Pie and Funnel
  // TODO: 理论上允许多个 type=pie 的指标，只是要想一下怎么处理
  const pieOrFunnelMetric = metrics.find((mt) => [MetricType.Pie, MetricType.Funnel].includes(mt.visual)) as NormalMetric
  if (pieOrFunnelMetric) {
    const relatedData = dataset.filter((datum) => isValid(datum[pieOrFunnelMetric.key]))
    const data = relatedData.map((datum) => ({
      name: seriesDimension ? datum[seriesDimension.key] : pieOrFunnelMetric.key,
      value: +datum[pieOrFunnelMetric.key],
    }))
    const serieName = seriesDimension?.key ?? pieOrFunnelMetric.key
    const serieAlias = meta.find(({ key }) => key === serieName)?.alias ?? serieName
    if (pieOrFunnelMetric.visual === MetricType.Pie) {
      const doughnutAddon = builtInAddons.find(addon => addon.name === BuiltInAddonType.useDoughnut) as UseDoughnut
      const doughnutCenterTotalAddon = builtInAddons.find(addon => addon.name === BuiltInAddonType.useDoughnutCenterTotal)
      if (doughnutCenterTotalAddon) {
        const total = data.map(datum => datum.value).reduce((prev, current) => prev + current, 0)
        if (!option.graphic) option.graphic = {}
        // TODO: calculate the top/left/fontSize based on center/radius
        // FIXME: array in lodash.merge would be merge one by one, but here i just wanna append them
        merge(option.graphic, {
          elements: [{
            type: 'text',
            left: 'center',
            top: '38%',
            style: {
              text: `${total}`,
              fontSize: 28,
            },
            cursor: 'default',
          }, {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: serieAlias,
              fontSize: 12,
            },
            cursor: 'default',
          }]
        })
      }
      option.series.push({
        type: 'pie',
        name: serieAlias,
        center: ['50%', '45%'],
        radius: doughnutAddon ? [`${doughnutAddon.inner}%`, `${doughnutAddon.outer}%`] : undefined,
        data,
        itemStyle: {
          borderWidth: 3,
          borderColor: '#fff',
        },
        label: {
          formatter: (parmas) => parmas.percent?.toFixed(2) + '%', // TODO: 更加健壮
        },
      })
    } else {
      option.series.push({
        type: 'funnel',
        name: serieAlias,
        data,
        gap: 0,
        label: {
          position: 'inside',
          color: '#fff',
          formatter: (parmas) => parmas.percent?.toFixed(2) + '%', // TODO: 更加健壮
        },
      })
    }
  }

  // Radar
  const radarMetrics = metrics.filter((mt) => mt.visual === MetricType.Radar) as NormalMetric[]
  const radarData: { name: string, value: number[] }[] = []
  const indicators: { name: string }[] = []
  // 找出 radar 指标有效的所有 datum
  const relatedData = dataset.filter((datum) => radarMetrics.some(
    (metric) => isValid(datum[metric.key])
  ))
  // All metrics in radar should have same max, because it's represent by one polar-system (aka the radius dimension)
  const maxValue = Math.max(
    ...relatedData.map(datum => radarMetrics.map(metric => Number(datum[metric.key]))).flat()
  )
  if (radarIndicatorDimension) {
    indicators.push(...Array.from(
        new Set(relatedData.map((datum) => `${datum[radarIndicatorDimension.key]}`))
      ).map(name => ({ name, max: maxValue }))
    )
  }

  let serieNames: string[] = []
  if (seriesDimension && radarIndicatorDimension && radarMetrics.length === 1) {
    const radarMetric = radarMetrics[0]
    // 找出存在这个指标的所有 datum
    const relatedData = dataset.filter((datum) => isValid(datum[radarMetric.key]))
    serieNames = Array.from(new Set(relatedData.map((datum) => `${datum[seriesDimension.key]}`)))
    radarData.push(...serieNames.map(serieName => {
      const value = indicators.map(indicator =>
        +(relatedData.find(datum =>
          `${datum[radarIndicatorDimension.key]}` === indicator.name && `${datum[seriesDimension.key]}` === serieName
        )?.[radarMetric.key] ?? 0)
      )
      const serieAlias = meta.find(({ key }) => key === serieName)?.alias ?? serieName
      return {
        name: serieAlias,
        value,
      }
    }))
  } else if (!seriesDimension && radarIndicatorDimension) {
    serieNames = radarMetrics.map(metric => metric.key)
    radarData.push(...serieNames.map(serieName => {
      const value = indicators.map(indicator =>
        +(relatedData.find(datum =>
          `${datum[radarIndicatorDimension.key]}` === indicator.name
        )?.[serieName] ?? 0)
      )
      const serieAlias = meta.find(({ key }) => key === serieName)?.alias ?? serieName
      return {
        name: serieAlias,
        value,
      }
    }))
  }

  if (radarIndicatorDimension && radarData.length > 0) {
    option.radar = {
      indicator: indicators,
    }

    option.series.push({
      type: 'radar' as const,
      name: radarMetrics.length === 1 ? radarMetrics[0].key : 'radar', // TODO: 系列名
      data: radarData,
    })
  }

  // map
  const mapMetrics = metrics.filter((mt) => mt.visual === MetricType.Map) as NormalMetric[]
  for (const mapMetric of mapMetrics) {
    // 地图必须要有 dimension
    if (!geoDimension) {
      console.warn('[echarts-composables] MetricType.Map must has related dimension')
      continue
    }
    // 地图必须要指定 map
    if (!geoDimension.map) {
      console.warn('[echarts-composables] DimensionType.Geo\'s dimension must has param \'map\'')
      continue
    }
    // 找出存在这个指标的所有 datum
    const relatedData = dataset.filter((datum) => isValid(datum[mapMetric.key]))
    const data = relatedData.map(datum => {
      return {
        name: datum[geoDimension.key],
        value: Number(datum[mapMetric.key]),
      }
    }).sort((prev, next) => next.value - prev.value)

    const alias = meta.find(({ key }) => key === geoDimension.key)?.alias ?? geoDimension.key
    option.series.push(
      {
        type: 'map' as const,
        name: alias,
        map: geoDimension.map,
        roam: false,
        data,
        itemStyle: {
          borderColor: '#fff'
        },
        emphasis: {
          label: {
            show: false
          }
        },
      }
    )
    option.visualMap = {
      ...cloneDeep(defaultVisualMap),
      min: data[data.length - 1].value,
      max: data[0].value,
    }
  }

  if (categoryAxisDimension) {
    // 默认 x 轴是维度轴，y 轴是指标轴
    option.xAxis = [{
      type: 'category',
    }]
    option.yAxis = [{
      type: 'value',
    }]
    const hasAnotherValueAxis = metrics.some(m => 'axisIndex' in m && m.axisIndex === 1)
    if (hasAnotherValueAxis) {
      option.yAxis.push({
        type: 'value',
      })
    }
  }

  // 折线图的 x 轴 boundaryGap 要设置成 false
  const onlyLine = option.series.every((serie) => serie.type === 'line')
  const onlyBar = option.series.every((serie) => serie.type === 'bar')
  const onlyPie = option.series.every((serie) => serie.type === 'pie')
  const onlyFunnel = option.series.every((serie) => serie.type === 'funnel')
  const onlyRadar = option.series.every((serie) => serie.type === 'radar')
  const onlyMap = option.series.every((serie) => serie.type === 'map')
  if (onlyLine) {
    option.xAxis?.forEach((axis) => {
      if (axis.type === 'category') {
        // TODO: 怎么解决... axis 并没有被 narrow 成 XAxisBaseOption, 上面没有 boundaryGap 这个 key
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axis as any).boundaryGap = false
      }
    })
  }

  merge(option.tooltip, {
    trigger: (onlyPie || onlyFunnel || onlyRadar || onlyMap) ? 'item' : 'axis',
    axisPointer: {
      type: onlyBar ? 'shadow' : 'line'
    }
  })

  merge(option.legend, {
    show: !onlyMap,
    data: (onlyPie || onlyFunnel || onlyRadar)
      ? (option.series[0].data as { name: string }[])?.map(({ name }) => (
        { icon: 'circle', name: `${name}` }
      ))
      : option.series.map((serie) => {
        if (serie.type === 'line') {
          return { icon: 'path:// M0 0 L 200 0 L 200 40 L 0 40', name: `${serie.name}` }
        } else {
          return { icon: 'circle', name: `${serie.name}` }
        }
      }),
  })

  universalAddons.forEach((addon) => addon(option, { dataset, dimensions, metrics }))

  return option
}
