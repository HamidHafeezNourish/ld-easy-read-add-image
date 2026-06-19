<script setup lang="ts">
import { computed } from 'vue'
import TreeSelect from 'primevue/treeselect'
import PulseIcon from '../../PulseIcon/PulseIcon.vue'
import PulseComponent from '../../PulseComponent.vue'
import type { PulseTreeSelectProps, PulseTreeSelectOptions } from './PulseTreeSelect.types'
import PulseInputWrapper from '@/components/input/PulseInputWrapper.vue'
import { inputDefaultProps } from '../inputDefaults'

const props = withDefaults(defineProps<PulseTreeSelectProps>(), {
  ...inputDefaultProps,
  selectionMode: 'single',
})

const emit = defineEmits(['update:selectedValues'])

const expandedKeys = computed(() => {
  const keys: { [key: string]: boolean } = {}
  if (props.options !== undefined) {
    const traverseAndExpand = (nodes: PulseTreeSelectOptions) => {
      nodes.forEach((node) => {
        if (node.children && node.children.length > 0) {
          keys[node.key] = true
          traverseAndExpand(node.children as PulseTreeSelectOptions)
        }
      })
    }
    traverseAndExpand(props.options)
  }
  return keys
})

const localSelectedValues = computed({
  get() {
    return props.selectedValues?.reduce((a, v) => ({ ...a, [v]: true }), {})
  },
  set(vals: PulseTreeSelectOptions) {
    emit('update:selectedValues', Object.keys(vals))
  },
})
</script>

<template>
  <PulseComponent>
    <PulseInputWrapper
      :input-id="inputId"
      :label="label"
      :label-icon="labelIcon"
      :hint="hint"
      :icon="icon"
      :required="required"
      :disabled="disabled"
      :error="error"
      :full-width="fullWidth"
      :size="size"
    >
      <TreeSelect
        :id="inputId"
        v-model="localSelectedValues"
        :disabled="disabled"
        :expanded-keys="expandedKeys"
        :filter="filter"
        :fluid="true"
        :options="options"
        :selection-mode="selectionMode"
        size="large"
      >
        <template #option="{ node }">
          <div class="node-content">
            <template v-if="node.children && node.children.length > 0">
              <span class="parent-label">
                <PulseIcon icon="target" />
                {{ node.label }}
              </span>
            </template>
            <template v-else>
              {{ node.label }}
            </template>
          </div>
        </template>
      </TreeSelect>
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style scoped>
.parent-label {
  align-items: center;
  display: inline-flex;
  font-size: var(--pulse-font-size-regular);
  font-style: normal;
  gap: 0.5rem;
  line-height: var(--pulse-font-size-xlarge);
  user-select: none;
}
</style>
