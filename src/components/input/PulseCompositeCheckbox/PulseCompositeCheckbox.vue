<script setup lang="ts">
import PulseComponent from '../../PulseComponent.vue'
import { Checkbox } from 'primevue'
import PulseInputText from '../PulseInputText/PulseInputText.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import type {
  PulseCompositeCheckboxProps,
  CompositeCheckboxItem,
  PulseCompositeCheckboxValue,
} from './PulseCompositeCheckbox.types'
import { inputDefaultProps } from '../inputDefaults'

withDefaults(defineProps<PulseCompositeCheckboxProps>(), inputDefaultProps)

const model = defineModel<PulseCompositeCheckboxValue>({ required: false })

const updateChecked = (
  option: CompositeCheckboxItem,
  currentValue?: PulseCompositeCheckboxValue,
  onChange?: (value: PulseCompositeCheckboxValue) => void,
) => {
  const updated = currentValue?.map((i: CompositeCheckboxItem) =>
    i.id === option.id ? { ...i, checked: !i.checked } : i,
  )
  if (onChange && updated) {
    onChange(updated)
  } else {
    model.value = updated
  }
}

const updateInputValue = (
  option: CompositeCheckboxItem,
  value: string | undefined,
  currentValue?: PulseCompositeCheckboxValue,
  onChange?: (value: PulseCompositeCheckboxValue) => void,
) => {
  const updated = currentValue?.map((i: CompositeCheckboxItem) =>
    i.id === option.id ? { ...i, inputValue: value || '' } : i,
  )
  if (onChange && updated) {
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
      :label="header"
      :hint="hint"
      :required="required"
      :disabled="disabled"
      :input-id="inputId"
      :full-width="fullWidth"
      :size="size"
    >
      <span
        :id="inputId"
        class="pulse-checkboxes"
      >
        <span
          v-for="option in value"
          :key="option.id"
          class="pulse-checkbox"
        >
          <div class="pulse-checkbox-section">
            <Checkbox
              :model-value="option.checked"
              :binary="true"
              :input-id="`${inputId}-${option.label}-checkbox`"
              @update:model-value="() => updateChecked(option, value, onChange)"
            />
            <label :for="`${inputId}-${option.label}-checkbox`"> {{ option.label }} </label>
          </div>
          <span
            v-if="option.checked"
            class="pulse-name-input"
          >
            <PulseInputText
              :input-id="option.inputId"
              label=""
              :hint="checkboxHint"
              :model-value="option.inputValue"
              @update:model-value="(val) => updateInputValue(option, val, value, onChange)"
            />
          </span>
        </span>
      </span>
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style scoped>
.pulse-checkboxes {
  display: flex;
  flex-direction: column;
  gap: var(--pulse-space-s);
}

.pulse-checkbox {
  display: flex;
  flex-direction: column;
  gap: var(--pulse-space-xs);
  color: var(--pulse-color-primary-100);
  font-weight: var(--pulse-font-weight-strong);
}

.pulse-name-input {
  padding-left: var(--pulse-space-m-l);
  display: flex;
  flex-direction: column;
}

.pulse-checkbox-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--pulse-space-xs);
}
</style>
