<script setup lang="ts">
import { Checkbox } from 'primevue'
import PulseComponent from '../../PulseComponent.vue'
import type { PulseCheckboxProps, PulseCheckboxValue } from './PulseCheckbox.types'

defineProps<PulseCheckboxProps>()

const model = defineModel<PulseCheckboxValue>({ required: false, default: false })
</script>

<template>
  <PulseComponent>
    <div class="p-field-checkbox">
      <Checkbox
        v-model="model"
        :binary="true"
        :input-id="inputId"
        :disabled="disabled"
        :invalid="invalid"
      />
      <label
        v-if="label"
        :for="inputId"
        class="p-checkbox-label"
        >{{ label }}</label
      >
    </div>
  </PulseComponent>
</template>

<style scoped>
:deep(
  .p-checkbox:not(.p-disabled):not(.p-checkbox-checked):not(.p-invalid):has(.p-checkbox-input:hover) .p-checkbox-box
) {
  background: var(--pulse-color-neutral-30);
}

:deep(
  .p-checkbox:not(.p-disabled):not(.p-checkbox-checked):not(.p-invalid):has(.p-checkbox-input:active) .p-checkbox-box
) {
  background: var(--pulse-color-neutral-40);
}

:deep(.p-checkbox.p-disabled:not(.p-checkbox-checked) .p-checkbox-box) {
  border-color: var(--pulse-color-neutral-60);
}

:deep(.p-checkbox.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:active) .p-checkbox-box) {
  background: var(--pulse-color-primary-120);
  border-color: var(--pulse-color-primary-120);
}

:deep(.p-checkbox.p-invalid:not(.p-checkbox-checked):not(.p-disabled)) {
  --p-checkbox-hover-border-color: var(--pulse-color-error-70);
  --p-checkbox-focus-border-color: var(--pulse-color-error-70);
}

:deep(.p-checkbox.p-invalid:not(.p-disabled):not(.p-checkbox-checked):has(.p-checkbox-input:hover) .p-checkbox-box) {
  background: var(--pulse-color-neutral-30);
  border-color: var(--pulse-color-error-70);
}

:deep(
  .p-checkbox.p-invalid:not(.p-disabled):not(.p-checkbox-checked):has(.p-checkbox-input:focus-visible) .p-checkbox-box
) {
  border-color: var(--pulse-color-error-70);
}

:deep(.p-checkbox.p-invalid:not(.p-disabled):not(.p-checkbox-checked):has(.p-checkbox-input:active) .p-checkbox-box) {
  background: var(--pulse-color-neutral-40);
  border-color: var(--pulse-color-error-70);
}

:deep(.p-checkbox.p-invalid.p-disabled:not(.p-checkbox-checked) .p-checkbox-box) {
  background: var(--pulse-color-neutral-50);
  border-color: var(--pulse-color-neutral-60);
}

.p-field-checkbox {
  display: flex;
  align-items: center;
  gap: var(--pulse-space-xs);
}
</style>
