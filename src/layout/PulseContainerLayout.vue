<script setup lang="ts">
import PulseLayout from './PulseLayout.vue'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
  }>(),
  {
    title: '',
    subtitle: undefined,
  },
)
</script>

<template>
  <PulseLayout>
    <div class="pulse-container-wrapper">
      <div class="pulse-container">
        <div class="pulse-container-header">
          <div class="pulse-container-headings">
            <h2>{{ title }}</h2>
            <h3
              v-if="subtitle"
              class="pulse-container-subtitle"
            >
              {{ subtitle }}
            </h3>
          </div>
          <slot name="header-right" />
        </div>
        <slot name="content" />
      </div>
    </div>
  </PulseLayout>
</template>

<style scoped>
.pulse-container-wrapper {
  display: flex;
  justify-content: center;
  background: var(--pulse-bg-color);
  padding-top: var(--pulse-layout-top-margin);
  height: 100%;
  overflow: auto;
}

.pulse-container {
  background: white;
  border-radius: 8px;
  padding: var(--pulse-padding);
  width: clamp(280px, 34.2857px + 76.7857vw, 1140px);
  height: fit-content;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto;
  grid-row-gap: var(--pulse-gap);
  margin-bottom: 24px;
}

.pulse-container-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.pulse-container-headings {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pulse-container-subtitle {
  font-weight: normal;
  font-size: var(--pulse-font-size-caption-regular);
  color: var(--pulse-color-neutral-100);
}
</style>
