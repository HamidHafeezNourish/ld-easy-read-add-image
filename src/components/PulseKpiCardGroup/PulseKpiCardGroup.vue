<script setup lang="ts">
import PulseComponent from '../PulseComponent.vue'
</script>

<template>
  <PulseComponent>
    <div class="pulse-kpi-card-group">
      <slot />
    </div>
  </PulseComponent>
</template>

<style scoped>
.pulse-component {
  display: block;
  width: 100%;
}

.pulse-kpi-card-group {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: var(--pulse-space-s);
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
}

.pulse-kpi-card-group > :deep(*) {
  flex: 1 0 200px;
}
</style>
