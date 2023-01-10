export enum DimensionType {
  CategoryAxis = 'categoryAxis',
  Series = 'series',
  RadarIndicator = 'radarIndicator',
  Geo = 'geo',
}

export type BasicDimension =
  | CategoryAxisDimension
  | SeriesDimension
  | RadarIndicatorDimension
  | GeoDimension

export interface CategoryAxisDimension {
  key: string;
  visual: DimensionType.CategoryAxis;
}

export interface SeriesDimension {
  key: string;
  visual: DimensionType.Series;
}

export interface RadarIndicatorDimension {
  key: string;
  visual: DimensionType.RadarIndicator;
}

export interface GeoDimension {
  key: string;
  visual: DimensionType.Geo;
  map: string; // 使用 registerMap 注册的地图名称
}

