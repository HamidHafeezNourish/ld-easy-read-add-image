<script setup lang="ts">
import PulseDataTable from '../../PulseDataTable.vue'
import type { PulseDataTableProps } from '../../PulseDataTable.types'

const props = defineProps<PulseDataTableProps>()
</script>

<template>
  <PulseDataTable v-bind="props">
    <template #header>
      <h4>Global Search</h4>
    </template>
    <template #subheader>
      <p style="margin: 0; color: #666; font-size: 0.875rem">
        Showing all registered individuals. Use filters to narrow results.
      </p>
    </template>
  </PulseDataTable>
</template>
