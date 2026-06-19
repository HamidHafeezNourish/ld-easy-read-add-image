<script setup lang="ts">
import PulseComponent from '../PulseComponent.vue'
import { Tabs, TabList, Tab } from 'primevue'
import { ref, watch } from 'vue'
import type { PulseTabsProps } from './PulseTabs.types'

const props = defineProps<PulseTabsProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedTab = ref(props.modelValue ?? props.items[0].key)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== selectedTab.value) {
      selectedTab.value = newVal ?? props.items[0].key
    }
  },
)
</script>

<template>
  <PulseComponent>
    <Tabs :value="selectedTab">
      <TabList>
        <Tab
          v-for="tab in items"
          :key="tab.key"
          :value="tab.key"
          @click="emit('update:modelValue', tab.key)"
        >
          <span class="pulse-tab pulse-text-body-small">{{ tab.label }}</span>
        </Tab>
      </TabList>
    </Tabs>
  </PulseComponent>
</template>

<style scoped>
.p-tab-active .pulse-tab {
  font-weight: 500;
}
</style>
