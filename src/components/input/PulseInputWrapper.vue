<script setup lang="ts" generic="T extends PulseInputValue = PulseInputValue">
import { computed } from 'vue'
import { IconField, InputIcon } from 'primevue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import { usePulseField } from '../../composables/useFormField'
import type { PulseInputWrapperProps, PulseInputValue } from './PulseInputWrapper.types'

defineOptions({ inheritAttrs: false })

const props = defineProps<PulseInputWrapperProps>()

const model = defineModel<T>()

// Use the composable that handles both form and standalone modes
const field = usePulseField({
  name: props.inputId,
  modelValue: model,
})

// Use either form field error or error prop (external error takes precedence)
const displayError = computed(() => {
  return props.error || field.errorMessage.value
})

const inputWidth = computed(() => (props.fullWidth ? '100%' : '216px'))
const inputSizeClass = computed(() => `pulse-input-${props.size}`)
const inputHeight = computed(() => {
  switch (props.size) {
    case 'small':
      return '32px'
    default:
      return '54px'
  }
})

// TODO: Consider replacing this function with onChange.
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  field.value.value = target.value as T
}

const onChange = (value?: T) => {
  field.value.value = value
}

const onBlur = () => {
  field.handleBlur()
}
</script>

<template>
  <div
    class="pulse-input-wrapper pulse-input-group"
    :class="[inputSizeClass, { 'pulse-input-disabled': disabled }]"
  >
    <label
      v-if="label"
      :for="inputId"
      class="pulse-input-label"
    >
      <PulseIcon
        v-if="labelIcon"
        :icon="labelIcon"
      />
      {{ label }}{{ required ? '*' : '' }}
    </label>
    <div
      v-if="hint"
      class="pulse-input-hint"
    >
      {{ hint }}
    </div>
    <div
      v-if="displayError"
      class="pulse-input-error"
    >
      <span class="icon">!</span> <span class="message">{{ displayError }}</span>
    </div>
    <IconField>
      <InputIcon v-if="icon">
        <PulseIcon :icon="icon" />
      </InputIcon>
      <slot
        :value="field.value.value"
        :error="displayError"
        :on-input="onInput"
        :on-change="onChange"
        :on-blur="onBlur"
      />
    </IconField>
  </div>
</template>

<style scoped>
.pulse-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  width: v-bind(inputWidth);
}

.pulse-input-hint {
  color: var(--pulse-color-neutral-100);
  font-size: var(--pulse-font-size-caption-small);
}

.pulse-input-error .message {
  background-color: var(--pulse-color-error-10);
  font-size: var(--pulse-font-size-caption-regular);
  padding: 2px 4px;
}

.pulse-input-error .icon {
  color: var(--pulse-color-error-70);
  padding: 2px;
}

.pulse-input-label {
  display: flex;
  flex-direction: row;
  gap: 4px;
  flex-wrap: wrap;
  align-items: center;
  font-size: var(--pulse-font-size-small);
  font-weight: var(--pulse-font-weight-regular);
  margin: 0;
}
</style>

<style>
.pulse-input-group .p-inputtext,
.pulse-input-group .p-datepicker,
.pulse-input-group .p-textarea,
.pulse-input-group .p-select,
.pulse-input-group .p-select-label,
.pulse-input-group .p-treeselect,
.pulse-input-group .p-treeselect-label {
  color: var(--pulse-color-primary-120);
  font-size: var(--pulse-font-size-regular);
  line-height: var(--pulse-font-size-xlarge);
  width: 100%;
}

.pulse-input-group.pulse-input-small .p-inputtext,
.pulse-input-group.pulse-input-small .p-textarea,
.pulse-input-group.pulse-input-small .p-select-label,
.pulse-input-group.pulse-input-small .p-treeselect-label {
  font-size: var(--pulse-font-size-small);
  padding-block: var(--pulse-space-xs);
  padding-inline: var(--pulse-space-xs);
}

.pulse-input-group .p-inputtext,
.pulse-input-group .p-select,
.pulse-input-group .p-treeselect,
.pulse-input-group .p-treeselect-label {
  height: v-bind(inputHeight);
}

.pulse-input-disabled .p-inputtext:disabled,
.pulse-input-disabled .p-textarea:disabled,
.pulse-input-disabled .p-select.p-disabled,
.pulse-input-disabled .p-treeselect.p-disabled,
.pulse-input-disabled .p-datepicker.p-disabled {
  color: var(--pulse-color-neutral-100);
  opacity: 1;
}

.pulse-input-disabled .p-inputtext:disabled::placeholder,
.pulse-input-disabled .p-textarea:disabled::placeholder {
  color: var(--pulse-color-neutral-100);
  opacity: 1;
}
</style>
