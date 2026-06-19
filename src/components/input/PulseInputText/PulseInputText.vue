<script setup lang="ts">
import { InputText } from 'primevue'
import TimesIcon from '@primevue/icons/times'
import PulseComponent from '../../PulseComponent.vue'
import PulseInputWrapper from '../PulseInputWrapper.vue'
import type { PulseInputTextProps, PulseInputTextValue } from './PulseInputText.types'
import { inputDefaultProps } from '../inputDefaults'

const props = withDefaults(defineProps<PulseInputTextProps>(), inputDefaultProps)

const model = defineModel<PulseInputTextValue>({ default: '' })

function onClearClick() {
  model.value = ''
}
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
      <InputText
        :id="inputId"
        v-bind="props"
        :value="value"
        @input="onInput"
        @blur="onBlur"
      />
      <slot
        v-if="showClear && !disabled"
        name="clearicon"
        :clear-callback="onClearClick"
      >
        <TimesIcon
          v-show="value"
          class="clear-icon"
          @click="onClearClick"
        />
      </slot>
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

.clear-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--pulse-color-neutral-80);
}

.clear-icon:hover {
  color: var(--pulse-color-neutral-100);
}
</style>
