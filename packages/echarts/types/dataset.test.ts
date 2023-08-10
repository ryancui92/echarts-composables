import { describe, expect, it } from 'vitest'
import { legacyDataset, standardDataset } from '@packages/echarts/mock-data'
import { isLegacyDataset, isNormalizedDataset, normalizeDataset } from '@packages/echarts'

describe.concurrent('dataset test suites', () => {
  it.concurrent('dataset narrow', () => {
    expect(isLegacyDataset(legacyDataset)).toEqual(true)
    expect(isNormalizedDataset(legacyDataset)).toEqual(false)
    expect(isNormalizedDataset(standardDataset)).toEqual(true)
    expect(isLegacyDataset(standardDataset)).toEqual(false)
  })

  it.concurrent('normalizeDataset', () => {
    expect(normalizeDataset(standardDataset)).toEqual(standardDataset)
    expect(normalizeDataset([
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
      [1, 2, 3],
    ])).toEqual([
      { a: 'a', b: 'b', c: 'c' },
      { a: 1, b: 2, c: 3 },
    ])
  })
})
