<script setup lang="ts">
import { ComponentPublicInstance, ref } from 'vue'
import { Select } from 'primevue'
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import type { PulseSelectProps, PulseSelectValue } from './PulseSelect.types'
import { inputDefaultProps } from '../inputDefaults'

withDefaults(defineProps<PulseSelectProps>(), {
  ...inputDefaultProps,
  placeholder: 'Select an option',
})

const model = defineModel<PulseSelectValue>({ default: null })

const selectRef = ref<ComponentPublicInstance | null>(null)
const overlayStyle = ref<Record<string, string>>({})

function syncOverlayWidth() {
  const el = selectRef.value?.$el as HTMLElement | undefined
  if (el) {
    overlayStyle.value = { width: `${el.offsetWidth}px` }
  }
}
</script>

<template>
  <PulseComponent>
    <PulseInputWrapper
      v-slot="{ value, onChange, onBlur }"
      v-model="model"
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
      <Select
        :id="inputId"
        ref="selectRef"
        :options="options"
        :model-value="value"
        :placeholder="placeholder"
        :option-label="optionLabel"
        :option-value="optionValue"
        :disabled="disabled"
        :filter="filter"
        :empty-filter-message="emptyFilterMessage"
        :class="{ 'pulse-select--truncate': truncate }"
        overlay-class="pulse-select-overlay"
        :pt="{ overlay: { style: overlayStyle } }"
        @update:model-value="onChange"
        @blur="onBlur"
        @before-show="syncOverlayWidth"
      />
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style scoped>
:deep(.pulse-select--truncate.p-select) {
  min-width: 0;
  width: 100%;
}

:deep(.pulse-select--truncate .p-select-label) {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1 1 0;
  min-width: 0;
  align-self: center;
}
</style>
