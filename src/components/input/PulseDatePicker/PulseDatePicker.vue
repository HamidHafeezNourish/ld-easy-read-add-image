<script setup lang="ts">
import { DatePicker } from 'primevue'
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import { PulseIcon } from '@/index'
import type { PulseDatePickerProps, PulseDatePickerValue } from './PulseDatePicker.types'
import { inputDefaultProps } from '../inputDefaults'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<PulseDatePickerProps>(), {
  ...inputDefaultProps,
  selectionMode: 'single',
  dateFormat: 'dd/mm/yy',
  timeMode: 'date',
})

const emit = defineEmits<{
  (event: 'hide'): void
}>()

const model = defineModel<PulseDatePickerValue>({ default: null })

function onHide() {
  emit('hide')
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
      <DatePicker
        :id="inputId"
        :model-value="value"
        :disabled="disabled"
        :placeholder="placeholder"
        :min-date="minDate"
        :max-date="maxDate"
        :show-time="timeMode !== 'date'"
        :time-only="timeMode === 'time'"
        show-icon
        icon-display="input"
        :date-format="dateFormat"
        :selection-mode="selectionMode"
        :number-of-months="numberOfMonths"
        @update:model-value="onChange"
        @blur="onBlur"
        @hide="onHide"
      >
        <template #inputicon="slotProps">
          <PulseIcon
            icon="calendar"
            colour="neutral"
            @click="slotProps.clickCallback"
          />
        </template>
      </DatePicker>
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style></style>
