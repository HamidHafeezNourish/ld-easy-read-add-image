<script setup lang="ts">
import Card from 'primevue/card'
import PulseComponent from '../PulseComponent.vue'
import PulseEmptyState from './PulseEmptyState.vue'
import type { PulseCardProps } from './PulseCard.types'

withDefaults(defineProps<PulseCardProps>(), {
  title: '',
})
</script>

<template>
  <PulseComponent>
    <Card>
      <template #header>
        <slot name="header" />
      </template>
      <template #title>
        <span class="pulse-card-header">
          <div class="pulse-card-title">{{ title }}</div>
          <div
            v-if="$slots['header-tag'] || $slots['header-button']"
            class="pulse-card-header-actions"
          >
            <slot name="header-tag" />
            <slot name="header-button" />
          </div>
        </span>
      </template>
      <template #subtitle>
        <span class="pulse-text-caption"><slot name="subtitle" /></span>
      </template>
      <template
        v-if="$slots.content || empty"
        #content
      >
        <PulseEmptyState
          v-if="empty"
          :empty-title="emptyTitle"
          :empty-action="emptyAction"
          :empty-result="emptyResult"
        >
          <template #actions>
            <slot
              v-if="empty"
              name="empty-state-actions"
            />
          </template>
        </PulseEmptyState>
        <slot
          v-else
          name="content"
        />
      </template>
      <template
        v-if="$slots.footer"
        #footer
      >
        <slot name="footer" />
      </template>
    </Card>
  </PulseComponent>
</template>

<style scoped>
.pulse-card-title {
  color: var(--pulse-color-primary-100);
}

.pulse-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--pulse-font-size-large);
  font-weight: var(--pulse-font-weight-strong);
}

.pulse-card-header-actions {
  display: flex;
  align-items: center;
  gap: var(--pulse-space-xs);
  flex-shrink: 0;
}
</style>
