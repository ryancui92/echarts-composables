export const enum MetricType {
  Bar = 'bar',
  Line = 'line',
  Radar = 'radar',
  Pie = 'pie',
  Funnel = 'funnel',
  Map = 'map',
  Scatter = 'scatter',
}

export type BasicMetric =
  | BarMetric
  | LineMetric
  | ScatterMetric
  | NormalMetric

export interface BarMetric {
  key: string;
  visual: MetricType.Bar;
  axisIndex?: 0 | 1;
}

export interface LineMetric {
  key: string;
  visual: MetricType.Line;
  axisIndex?: 0 | 1;
}

export interface ScatterMetric {
  key: string | [string, string];
  visual: MetricType.Scatter;
}

export interface NormalMetric {
  key: string;
  visual: Exclude<MetricType, MetricType.Bar | MetricType.Line | MetricType.Scatter>;
}
