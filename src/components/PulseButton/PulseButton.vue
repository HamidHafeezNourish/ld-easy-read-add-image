<script setup lang="ts">
import { computed } from 'vue'
import Button, { ButtonProps } from 'primevue/button'

import PulseComponent from '../PulseComponent.vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import type { PulseButtonProps } from './PulseButton.types'

defineEmits(['click'])

// This stops us passing through any undefined props through to the PrimeVue Button
// Allowing us to be strict with what props we accept
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PulseButtonProps>(), {
  type: 'primary',
  htmlType: 'button',
})

const severity = props.type

const isDisabled = computed(() => props.disabled)
const isLoading = computed(() => props.loading)

const args = computed<ButtonProps>(() => ({
  label: props.label,
  disabled: isDisabled.value,
  loading: isLoading.value,
  rounded: true,
  severity: severity,
  type: props.htmlType,
}))

const fontSize = computed(() =>
  props.small ? 'var(--pulse-font-size-caption-regular)' : 'var(--pulse-font-size-regular)',
)
const padding = computed(() => (props.small ? '4px 8px' : '7px 10.5px'))
const width = computed(() => (props.fullWidth ? '100%' : 'auto'))
</script>

<template>
  <PulseComponent>
    <Button
      v-bind="args"
      @click="$emit('click', $event)"
    >
      <template
        v-if="icon"
        #icon
      >
        <PulseIcon :icon="icon" />
      </template>
    </Button>
  </PulseComponent>
</template>

<style scoped>
.p-button {
  font-size: v-bind(fontSize);
  font-weight: var(--pulse-font-weight-regular);
  padding: v-bind(padding);
  width: v-bind(width);
}

.pulse-component {
  display: inline-block;
  width: v-bind(width);
}
</style>
