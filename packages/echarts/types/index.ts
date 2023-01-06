import type { EChartsOption, SeriesOption } from 'echarts'
import type { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'

export interface NormalizedEChartOption extends EChartsOption {
  series: SeriesOption[];
  xAxis?: XAXisOption[];
  yAxis?: YAXisOption[];
}

export type LegacyDataset = (string | number)[][]
export type NormalizedDataset = Record<string, string | number>[]
export type BasicDataset = LegacyDataset | NormalizedDataset

export * from './dimensions'
export * from './metrics'
export * from './addons'

export interface BasicMeta {
  key: string;
  alias: string;
}

