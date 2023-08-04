<template>
  <div class="box-border px-12 h-full overflow-auto">
    <h3>
      数据集 Dataset
    </h3>
    <div class="flex items-center gap-8">
      <n-select v-model:value="presetIndex" size="small" :options="presetDatasetOptions" />
      <n-button strong secondary size="small" disabled>
        查看
      </n-button>
    </div>
    <h3>
      指标 Metric
    </h3>
    <div>
      指标选择
    </div>
    <h3>
      维度 Dimension
    </h3>
    <div>
      维度选择
    </div>
    <h3>
      元信息 Meta
    </h3>
    <div>
      元信息输入
    </div>
    <h3>
      配件 Add-on
    </h3>
    <div>
      配件选择
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayground, presetDataset } from '@/views/usePlayground'
import { isEqual } from 'lodash-es'

const {
  dataset,
  metrics,
  dimensions,
  metas,
  addons,
} = usePlayground()

const isDatasetModalShow = ref(false)

const presetIndex = computed({
  get: () => {
    return presetDataset.findIndex(_ => isEqual(_, dataset.value))
  },
  set: (value: number) => {
    if (value !== -1)
      dataset.value = presetDataset[value]
  },
})
const presetDatasetOptions = computed(() => {
  return [
    ...presetDataset.map((dataset, index) => ({
      label: `预设数据 ${index + 1}`,
      value: index,
    })),
    // {
    //   label: '自定义数据',
    //   value: -1,
    // }
  ]
})
</script>
