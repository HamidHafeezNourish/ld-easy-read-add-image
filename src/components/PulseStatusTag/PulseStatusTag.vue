<script setup lang="ts">
import PulseComponent from '../PulseComponent.vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import { Tag } from 'primevue'
import { IconTitle } from '@/iconRegistry'
import { computed } from 'vue'
import { getMainColourVar, PulseStatusColour } from '@/types/colour'
import type { PulseStatusTagProps } from './PulseStatusTag.types'

const props = defineProps<PulseStatusTagProps>()

const severity = computed(() => {
  switch (props.status) {
    case 'general':
      return 'primary'
    case 'greyed':
      return 'secondary'
    case 'success':
      return 'success'
    case 'attention':
      return 'info'
    case 'error':
      return 'warn'
    case 'urgency':
      return 'danger'
    default:
      return 'primary'
  }
})

const icon = computed<IconTitle>(() => {
  if (props.icon) {
    return props.icon
  }
  switch (props.status) {
    case 'general':
      return 'information'
    case 'greyed':
      return 'information'
    case 'success':
      return 'success'
    case 'attention':
      return 'alert'
    case 'error':
      return 'alert'
    case 'urgency':
      return 'alert'
    default:
      return 'information'
  }
})

const colour = computed<PulseStatusColour>(() => {
  switch (props.status) {
    case 'greyed':
      return 'neutral'
    default:
      return props.status
  }
})

const borderColour = computed(() => getMainColourVar(colour.value))
</script>

<template>
  <PulseComponent>
    <Tag
      :severity="severity"
      :value="value"
    >
      <template #icon>
        <PulseIcon
          :icon="icon"
          size="xxsmall"
          :colour
        />
      </template>
    </Tag>
  </PulseComponent>
</template>

<style scoped>
* {
  --p-tag-primary-background: var(--pulse-color-general-10);
  --p-tag-primary-color: var(--pulse-color-neutral-120);
  --p-tag-secondary-background: var(--pulse-color-neutral-20);
  --p-tag-secondary-color: var(--pulse-color-neutral-120);
  --p-tag-success-background: var(--pulse-color-success-10);
  --p-tag-success-color: var(--pulse-color-neutral-120);
  --p-tag-info-background: var(--pulse-color-attention-10);
  --p-tag-info-color: var(--pulse-color-neutral-120);
  --p-tag-warn-background: var(--pulse-color-error-10);
  --p-tag-warn-color: var(--pulse-color-neutral-120);
  --p-tag-danger-background: var(--pulse-color-urgency-10);
  --p-tag-danger-color: var(--pulse-color-neutral-120);
}

.p-tag {
  border: 0.5px solid v-bind(borderColour);
  height: 25px;
}
</style>
