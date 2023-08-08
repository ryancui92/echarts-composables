export type LegacyDataset = (string | number)[][]
export type NormalizedDataset = Record<string, string | number>[]
export type BasicDataset = LegacyDataset | NormalizedDataset

export function isLegacyDataset(dataset: BasicDataset): dataset is LegacyDataset {
  return dataset.length > 0 && Array.isArray(dataset[0])
}

export function isNormalizedDataset(dataset: BasicDataset): dataset is NormalizedDataset {
  return dataset.length > 0 && !Array.isArray(dataset[0])
}

export function normalizeDataset(dataset: BasicDataset): NormalizedDataset {
  if (isNormalizedDataset(dataset))
    return dataset
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
