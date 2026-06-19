<script setup lang="ts">
import { computed } from 'vue'
import { SelectButton } from 'primevue'
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import type { PulseNumberSelectButtonProps, PulseNumberSelectButtonValue } from './PulseNumberSelectButton.types'
import { inputDefaultProps } from '../inputDefaults'

const props = withDefaults(defineProps<PulseNumberSelectButtonProps>(), {
  ...inputDefaultProps,
  scale: 5,
})

const model = defineModel<PulseNumberSelectButtonValue>({ default: null })

const scaleOptions = computed(() => {
  return Array.from({ length: props.scale }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }))
})
</script>

<template>
  <PulseComponent>
    <PulseInputWrapper
      v-slot="{ value, onChange }"
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
      <SelectButton
        :id="inputId"
        :options="scaleOptions"
        :model-value="value"
        :disabled="disabled"
        option-label="label"
        option-value="value"
        @update:model-value="onChange"
      />
    </PulseInputWrapper>
  </PulseComponent>
</template>
