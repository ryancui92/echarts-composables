import type { NormalizedEChartOption, NormalizedDataset } from './index'
import type { BasicDimension } from './dimensions'
import type { BasicMetric } from './metrics'

export type UniversalAddon = (option: NormalizedEChartOption, params?: {
  dataset: NormalizedDataset,
  dimensions: BasicDimension[],
  metrics: BasicMetric[],
}) => void

export interface BuiltInAddon {
  name: BuiltInAddonType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export enum BuiltInAddonType {
  useDoughnut,
  useDoughnutCenterTotal,
  useBarStack,
}

export interface UseDoughnut {
  name: BuiltInAddonType.useDoughnut;
  inner: number;
  outer: number;
}

export interface UseBarStack {
  name: BuiltInAddonType.useBarStack;
  stacks?: { name: string, keys: string[] }[];
}
