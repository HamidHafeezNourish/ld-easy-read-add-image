<script setup lang="ts">
import Panel from 'primevue/panel'
import PulseComponent from '@/components/PulseComponent.vue'
import type { PulseOverflowBarProps } from './PulseOverflowBar.types'

defineOptions({ inheritAttrs: false })

defineProps<PulseOverflowBarProps>()
</script>

<template>
  <PulseComponent>
    <Panel>
      <div class="pulse-panel-title">
        {{ text }}
      </div>
    </Panel>
  </PulseComponent>
</template>

<style scoped>
.pulse-panel-title {
  font-size: var(--pulse-font-size-caption-regular);
  font-weight: var(--pulse-font-weight-strong);
  color: var(--pulse-color-neutral-120);
  text-align: center;
}

.p-panel {
  background: var(--pulse-color-neutral-20);
  border: solid var(--pulse-color-neutral-30);
  padding: 8px;
}
</style>
