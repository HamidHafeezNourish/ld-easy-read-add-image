<script setup lang="ts">
import { Textarea } from 'primevue'
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import type { PulseInputTextAreaProps, PulseInputTextAreaValue } from './PulseInputTextArea.types'
import { inputDefaultProps } from '../inputDefaults'

const props = withDefaults(defineProps<PulseInputTextAreaProps>(), inputDefaultProps)

const model = defineModel<PulseInputTextAreaValue>({ default: '' })
</script>

<template>
  <PulseComponent>
    <PulseInputWrapper
      v-slot="{ value, onInput, onBlur }"
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
      <Textarea
        :id="inputId"
        v-bind="props"
        :value="value"
        style="resize: none"
        @input="onInput"
        @blur="onBlur"
      />
      <div
        v-if="maxlength"
        class="character-count"
      >
        {{ value?.length ?? 0 }} / {{ maxlength }} characters used
      </div>
    </PulseInputWrapper>
  </PulseComponent>
</template>

<style scoped>
.character-count {
  color: var(--pulse-color-neutral-100);
  font-size: var(--pulse-font-size-caption-small);
}
</style>
