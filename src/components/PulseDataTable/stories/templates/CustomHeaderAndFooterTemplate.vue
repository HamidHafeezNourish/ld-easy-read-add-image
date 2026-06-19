<script setup lang="ts">
import PulseDataTable from '../../PulseDataTable.vue'
import type { PulseDataTableProps } from '../../PulseDataTable.types'

const props = defineProps<PulseDataTableProps>()
</script>

<template>
  <PulseDataTable v-bind="props">
    <template #header>
      <h3>People we support</h3>
    </template>
    <template #footer>
      <span>I am a custom table footer</span>
    </template>
  </PulseDataTable>
</template>
