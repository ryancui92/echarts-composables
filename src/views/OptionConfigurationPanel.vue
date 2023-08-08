<template>
  <div class="box-border px-16 pb-16 h-full overflow-auto">
    <h3>
      数据集 Dataset
    </h3>
    <div class="flex items-center gap-8">
      <n-select v-model:value="presetIndex" size="small" :options="presetDatasetOptions" />
      <n-button secondary size="small" @click="isDatasetModalShow = true">
        查看
      </n-button>
      <n-button secondary size="small" @click="isImportModalShow = true">
        导入
      </n-button>
    </div>
    <h3>
      指标 Metric
    </h3>
    <div class="flex flex-col gap-6">
      <div
        v-for="key in datasetKeys"
        :key="key"
        class="flex items-center gap-8 h-30"
      >
        <n-checkbox
          :checked="!!metrics.find(_ => _.key === key)"
          @update:checked="() => toggleMetric(key)"
        />
        <span class="flex-1 truncate">{{ key }}</span>
        <n-select
          v-if="!!metrics.find(_ => _.key === key)"
          :value="metrics.find(_ => _.key === key)?.visual"
          size="small"
          :options="metricOptions"
          class="w-150"
          @update:value="(visual) => changeMetricVisual(key, visual)"
        />
      </div>
    </div>
    <h3>
      维度 Dimension
    </h3>
    <div class="flex flex-col gap-6">
      <div
        v-for="key in datasetKeys"
        :key="key"
        class="flex items-center gap-8 h-30"
      >
        <n-checkbox
          :checked="!!dimensions.find(_ => _.key === key)"
          @update:checked="() => toggleDimension(key)"
        />
        <span class="flex-1 truncate">{{ key }}</span>
        <n-select
          v-if="!!dimensions.find(_ => _.key === key)"
          :value="dimensions.find(_ => _.key === key)?.visual"
          size="small"
          :options="dimensionOptions"
          class="w-150"
          @update:value="(visual) => changeDimensionVisual(key, visual)"
        />
      </div>
    </div>
    <h3>
      元信息 Meta
    </h3>
    <div class="flex flex-col gap-6">
      <div
        v-for="(meta, index) in metas"
        :key="index"
        class="flex items-center gap-8 h-30"
      >
        <n-input v-model:value="meta.key" size="small" placeholder="key" />
        <n-input v-model:value="meta.alias" size="small" placeholder="alias" />
        <n-icon class="cursor-pointer hover:color-red" @click="metas.splice(index, 1)">
          <Delete />
        </n-icon>
      </div>
      <div class="h-30">
        <n-button
          type="primary"
          secondary
          block
          size="small"
          :disabled="metas.some(_ => !_.key)"
          @click="metas.push({ key: '', alias: '' })"
        >
          新增
        </n-button>
      </div>
    </div>
    <h3>
      配件 Add-on
    </h3>
    <div class="flex flex-col gap-6">
      <div
        v-for="addonName in addonOptions"
        :key="addonName"
        class="flex items-center gap-8 h-30"
      >
        <n-checkbox
          :checked="!!addons.find(_ => _.name === addonName)"
          @update:checked="() => toggleAddon(addonName)"
        />
        <span class="flex-1 truncate">{{ addonName }}</span>
      </div>
    </div>
    <n-modal v-model:show="isDatasetModalShow">
      <SimpleModalContent title="数据集 Dataset" class="w-800 h-400">
        <div class="h-full flex flex-col gap-8">
          <div class="flex items-center justify-end">
            <n-button secondary size="small" @click="exportCSV">
              导出
            </n-button>
          </div>
          <n-data-table
            size="small"
            :columns="columns"
            :data="normalizedDataset"
            :pagination="false"
            flex-height
            class="h-0 flex-1"
          />
        </div>
      </SimpleModalContent>
    </n-modal>
    <n-modal v-model:show="isImportModalShow">
      <SimpleModalContent title="导入数据" class="w-800">
        <div class="text-13 color-neutral-600 pb-8">
          最大支持 20 列，500 行数据
        </div>
        <n-input
          v-model:value="dataStr"
          type="textarea"
          placeholder="请输入你要导入的数据"
          :autosize="{ minRows: 8, maxRows: 20 }"
        />
        <template #footer>
          <n-button type="primary" @click="importData()">
            确认
          </n-button>
        </template>
      </SimpleModalContent>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { usePlayground, presetDataset } from '@/views/usePlayground'
import { isEqual } from 'lodash-es'
import SimpleModalContent from '@/components/SimpleModalContent.vue'
import {
  normalizeDataset,
  MetricType,
  DimensionType,
  LegacyDataset,
  isLegacyDataset,
  isNormalizedDataset
} from '@packages/echarts'
import { Delete } from '@vicons/carbon'
import { parse } from 'csv-parse/browser/esm/sync'
import { stringify } from 'csv-stringify/browser/esm/sync'
import type { NormalizedDataset } from '@packages/echarts'
import type { DataTableColumns } from 'naive-ui'

const {
  dataset,
  metrics,
  dimensions,
  metas,
  addons,
  addonOptions,
  toggleMetric,
  changeMetricVisual,
  toggleDimension,
  changeDimensionVisual,
  toggleAddon,
} = usePlayground()

function clearOptions() {
  // remove all other properties
  metrics.value = []
  dimensions.value = []
  metas.value = []
  addons.value = []
}

const isDatasetModalShow = ref(false)

const presetIndex = computed({
  get: () => {
    return presetDataset.findIndex(_ => isEqual(_, dataset.value))
  },
  set: (value: number) => {
    if (value !== -1 && value !== presetIndex.value) {
      dataset.value = presetDataset[value]
      clearOptions()
    }
  },
})

const normalizedDataset = computed<NormalizedDataset>(() => normalizeDataset(dataset.value))
const datasetKeys = computed(() => Object.keys(normalizedDataset.value[0] ?? {}))
const columns = computed<DataTableColumns>(() => {
  return datasetKeys.value.map(key => ({
    title: key,
    key,
  }))
})

const presetDatasetOptions = computed(() => {
  return [
    ...presetDataset.map((_, index) => ({
      label: `预设数据 ${index + 1}`,
      value: index,
    })),
    ...(presetIndex.value === -1 ? [
      {
        label: '自定义数据',
        value: -1,
      },
    ] : []),
  ]
})

const metricOptions = computed(() => Object.keys(MetricType).map(key => ({
  label: key,
  value: MetricType[key as unknown as keyof typeof MetricType],
})))

const dimensionOptions = computed(() => Object.keys(DimensionType).map(key => ({
  label: key,
  value: DimensionType[key as unknown as keyof typeof DimensionType]
})))

const isImportModalShow = ref(false)
const dataStr = ref('')
function importData() {
  let data: LegacyDataset | NormalizedDataset
  try {
    data = JSON.parse(dataStr.value)
  } catch {
    // we can support data copied from Excel or .csv
    data = parse(dataStr.value, {
      columns: true,
      skip_empty_lines: true,
      delimiter: [',', '\t'],
      trim: true,
    })
  }
  console.debug('import data', data)
  // dataset size should not be greater than 20*500
  const columnMax = 20
  const rowMax = 500
  if (isLegacyDataset(data)) {
    data = data.slice(0, rowMax + 1).map(_ => _.slice(0, columnMax + 1))
  } else if (isNormalizedDataset(data)) {
    data = data.slice(0, rowMax + 1).map(_ => Object.fromEntries(Object.entries(_).slice(0, columnMax + 1)))
  }
  dataset.value = data
  clearOptions()
  isImportModalShow.value = false
}

function exportCSV() {
  const csvContent = stringify(dataset.value, {
    header: true,
  })
  const file = new Blob([csvContent], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.csv'
  a.click()
}
</script>
