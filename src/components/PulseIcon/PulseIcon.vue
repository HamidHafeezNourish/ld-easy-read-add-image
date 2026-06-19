<script setup lang="ts">
import { computed } from 'vue'
import { iconRegistry } from '../../iconRegistry'
import { getMainColourVar } from '../../types'
import type { PulseIconProps } from './PulseIcon.types'

const props = withDefaults(defineProps<PulseIconProps>(), {
  size: 'regular',
})

const icon = computed(() => (props.icon ? iconRegistry[props.icon] : null))

const iconColour = computed(() => {
  if (props.overrideColour) return props.overrideColour
  if (!props.colour) return ''
  return getMainColourVar(props.colour)
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span
    :class="`pulse-icon pulse-icon-${size} `"
    aria-hidden="true"
    v-html="icon"
  />
</template>

<style scoped>
.pulse-icon {
  display: flex;
}
</style>

<style>
.pulse-icon svg {
  fill: currentColor;
  color: v-bind(iconColour);
  vertical-align: middle;
  width: 1em;
  height: 1em;
}

.pulse-icon {
  font-size: var(--pulse-font-size-regular);
}

.pulse-icon-xxsmall {
  font-size: var(--pulse-font-size-caption-small);
}

.pulse-icon-xsmall {
  font-size: var(--pulse-font-size-caption-regular);
}

.pulse-icon-small {
  font-size: var(--pulse-font-size-small);
}

.pulse-icon-regular {
  font-size: var(--pulse-font-size-regular);
}

.pulse-icon-large {
  font-size: var(--pulse-font-size-large);
}

.pulse-icon-xlarge {
  font-size: var(--pulse-font-size-xlarge);
}

.pulse-icon-xxlarge {
  font-size: var(--pulse-font-size-xxlarge);
}

.pulse-icon-xxxlarge {
  font-size: var(--pulse-font-size-xxxlarge);
}
</style>
