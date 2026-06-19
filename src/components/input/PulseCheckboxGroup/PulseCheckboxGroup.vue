<script setup lang="ts">
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import PulseCheckbox from '../PulseCheckbox/PulseCheckbox.vue'
import type { PulseCheckboxGroupProps, PulseCheckboxGroupValue } from './PulseCheckboxGroup.types'
import { inputDefaultProps } from '../inputDefaults'

withDefaults(defineProps<PulseCheckboxGroupProps>(), inputDefaultProps)

const model = defineModel<PulseCheckboxGroupValue>({ default: [] })

const toggle = (
  id: string,
  currentValue?: PulseCheckboxGroupValue,
  onChange?: (value: PulseCheckboxGroupValue) => void,
) => {
  const updated = currentValue?.includes(id) ? currentValue.filter((v) => v !== id) : [...(currentValue || []), id]
  if (onChange) {
    onChange(updated)
  } else {
    model.value = updated
  }
}
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
      <div class="pulse-checkbox-group">
        <div
          v-for="option in options"
          :key="option.inputId"
          class="pulse-checkbox-group__item"
        >
          <PulseCheckbox
            :input-id="`${inputId}-${option.inputId}`"
            :model-value="value?.includes(option.inputId)"
            :disabled="disabled || option.disabled"
            :invalid="option.invalid"
            :label="option.label"
            @change="toggle(option.inputId, value, onChange)"
          />
        </div>
      </div>
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style scoped>
.pulse-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--pulse-space-xs);
}

.pulse-checkbox-group__item {
  display: flex;
  align-items: center;
  gap: var(--pulse-space-xs);
}
</style>
