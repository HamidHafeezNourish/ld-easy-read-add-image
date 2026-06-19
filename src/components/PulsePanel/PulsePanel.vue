<script setup lang="ts">
import Panel from 'primevue/panel'
import PulseComponent from '../PulseComponent.vue'
import type { PulsePanelProps } from './PulsePanel.types'

withDefaults(defineProps<PulsePanelProps>(), {
  dark: false,
})
</script>

<template>
  <PulseComponent>
    <Panel :class="dark ? 'dark-override' : ''">
      <template #header>
        <div
          v-if="
            title ||
            caption ||
            $slots.icon ||
            $slots.topHeader ||
            $slots.topHeader ||
            $slots.middleHeaderRight ||
            $slots.bottomHeader
          "
          class="pulse-panel-header"
        >
          <slot
            v-if="$slots.icon"
            class="pulse-panel-icon"
            name="icon"
          />
          <div class="pulse-panel-header-content">
            <span
              v-if="$slots.topHeader"
              class="pulse-panel-header-top"
            >
              <slot
                v-if="$slots.topHeader"
                name="topHeader"
              />
            </span>

            <div class="pulse-panel-header-middle">
              <div class="pulse-panel-header-middle-left">
                <div class="pulse-panel-title">
                  {{ title }}
                </div>
                <div
                  v-if="caption"
                  class="pulse-panel-caption pulse-text-caption-small"
                >
                  {{ caption }}
                </div>
              </div>
              <span class="pulse-panel-header-middle-right">
                <slot
                  v-if="$slots.middleHeaderRight"
                  class="pulse-panel-header-middle-right"
                  name="middleHeaderRight"
                />
              </span>
            </div>

            <span
              v-if="$slots.bottomHeader"
              class="pulse-panel-header-bottom"
            >
              <slot name="bottomHeader" />
            </span>
          </div>
        </div>
      </template>
      <template #default>
        <div
          v-if="$slots.default"
          class="pulse-panel-content"
        >
          <slot name="default" />
        </div>
      </template>
      <template
        v-if="$slots.footer"
        #footer
      >
        <span class="pulse-panel-footer">
          <slot name="footer" />
        </span>
      </template>
    </Panel>
  </PulseComponent>
</template>

<style scoped>
.pulse-panel-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: start;
  margin-bottom: var(--pulse-space-2xs);
}

.pulse-panel-icon {
  height: 64px;
  width: 64px;
}

.pulse-panel-header-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--pulse-space-2xs);
}

.pulse-panel-header-top {
  display: flex;
  flex-direction: row;
  min-height: 26px;
  padding-top: 4px;
  padding-bottom: 4px;
  gap: 8px;
}

.pulse-panel-header-top {
  display: flex;
  flex-direction: row;
}

.pulse-panel-header-middle {
  display: flex;
  flex-direction: row;
}

.pulse-panel-header-middle-left {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--pulse-space-2xs);
}

.pulse-panel-title {
  font-size: var(--pulse-font-size-regular);
  font-weight: var(--pulse-font-weight-strong);
  color: var(--pulse-color-primary-100);
  line-height: 132.222%;
}

.pulse-panel-caption {
  color: var(--pulse-color-neutral-100);
}

.pulse-panel-header-middle-right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: end;
}

.pulse-panel-header-bottom {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 4px;
}

.pulse-panel-footer {
  display: flex;
}

.dark-override {
  background: var(--pulse-color-primary-100);
  color: var(--pulse-color-neutral-20);
}

.dark-override .pulse-panel-title {
  color: var(--pulse-color-neutral-20);
}

.dark-override .pulse-panel-caption {
  color: var(--pulse-color-neutral-60);
}

.dark-override .pulse-panel-icon {
  color: var(--pulse-color-neutral-20);
}
</style>
