<script setup lang="ts">
import type { PulseEmptyStateProps } from './PulseEmptyState.types'
import emptySvg from '../../assets/images/empty.svg?raw'

defineProps<PulseEmptyStateProps>()
</script>

<template>
  <div class="pulse-empty-state">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="emptySvg" />
    <div class="pulse-empty-body">
      <h3
        v-if="emptyTitle"
        class="pulse-empty-title"
      >
        {{ emptyTitle }}
      </h3>
      <div
        v-if="emptyAction"
        class="pulse-empty-subtitle"
      >
        {{ emptyAction
        }}<span
          v-if="emptyResult"
          class="pulse-empty-result"
        >
          to {{ emptyResult }}</span
        >
      </div>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.pulse-empty-state {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pulse-empty-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
}

.pulse-empty-title {
  color: var(--pulse-color-primary-100);
}

.pulse-empty-subtitle {
  font-size: var(--pulse-font-size-small);
}

.pulse-empty-result {
  color: var(--pulse-color-neutral-90);
}
</style>
