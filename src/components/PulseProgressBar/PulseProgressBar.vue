<script setup lang="ts">
import { computed } from 'vue'
import ProgressBar from 'primevue/progressbar'
import type { PulseProgressBarProps } from './PulseProgressBar.types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PulseProgressBarProps>(), {
  completed: false,
})

const clampValue = () => (props.value > 100 ? 100 : props.value < 0 ? 0 : props.value)

const ptOverrides = computed(() => {
  if (props.completed) {
    return { value: { style: { background: 'var(--pulse-color-primary-90)' } } }
  }
  return {}
})
</script>

<template>
  <ProgressBar
    :value="clampValue()"
    :show-value="false"
    :pt="ptOverrides"
  />
</template>

<style scoped></style>
