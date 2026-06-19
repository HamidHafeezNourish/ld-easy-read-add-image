<script setup lang="ts">
import { computed } from 'vue'
import { Tag } from 'primevue'

import type { PulseTagProps } from './PulseTag.types'
import PulseComponent from '../PulseComponent.vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'

const props = defineProps<PulseTagProps>()

const severity = computed(() => {
  switch (props.colour) {
    case 'pink-clay':
      return 'primary'
    case 'lapis':
      return 'secondary'
    case 'lavender':
      return 'success'
    case 'olive':
      return 'info'
    case 'mulberry':
      return 'warn'
    case 'ice':
      return 'danger'
    case 'jade':
      return 'contrast'
    default:
      return undefined
  }
})

const overrideStyle = computed(() => {
  switch (props.colour) {
    case 'cont-improv':
      return {
        background: 'var(--pulse-color-cont-improv-5)',
        color: 'var(--pulse-color-neutral-10)',
      }
    default:
      return undefined
  }
})
</script>

<template>
  <PulseComponent>
    <Tag
      :severity="severity"
      :value="value"
      :style="overrideStyle"
    >
      <template
        v-if="iconTitle"
        #icon
      >
        <PulseIcon
          :icon="iconTitle"
          size="small"
          :colour
        />
      </template>
    </Tag>
  </PulseComponent>
</template>

<style scoped>
* {
  --p-tag-primary-background: var(--pulse-color-pink-clay-1);
  --p-tag-primary-color: var(--pulse-color-neutral-120);
  --p-tag-secondary-background: var(--pulse-color-lapis-1);
  --p-tag-secondary-color: var(--pulse-color-neutral-120);
  --p-tag-success-background: var(--pulse-color-lavender-1);
  --p-tag-success-color: var(--pulse-color-neutral-120);
  --p-tag-info-background: var(--pulse-color-olive-1);
  --p-tag-info-color: var(--pulse-color-neutral-120);
  --p-tag-warn-background: var(--pulse-color-mulberry-1);
  --p-tag-warn-color: var(--pulse-color-neutral-120);
  --p-tag-danger-background: var(--pulse-color-ice-1);
  --p-tag-danger-color: var(--pulse-color-neutral-120);
  --p-tag-contrast-background: var(--pulse-color-jade-1);
  --p-tag-contrast-color: var(--pulse-color-neutral-120);
}
</style>
