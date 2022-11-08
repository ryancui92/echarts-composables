import type { NormalizedEChartOption } from '@packages/echarts/types'

export type UniversalAddon = (option: NormalizedEChartOption) => void

export type BuiltInAddon =
  | DoughnutAddon
  | { name: Exclude<BuiltInAddonType, BuiltInAddonType.Doughnut> }

export const enum BuiltInAddonType {
  LineArea = 'lineArea',
  RadarArea = 'radarArea',
  Doughnut = 'useDoughnut',
  DoughnutCenterTotal = 'useDoughnutCenterTotal'
}

// export interface LineAreaAddon {
//   name: BuiltInAddonType.LineArea;
// }
//
// export interface RadarAreaAddon {
//   name: BuiltInAddonType.RadarArea;
// }

export interface DoughnutAddon {
  name: BuiltInAddonType.Doughnut;
  params: {
    inner: number;
    outer: number;
  };
}
