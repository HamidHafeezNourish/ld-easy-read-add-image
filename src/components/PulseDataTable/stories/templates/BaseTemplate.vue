<script setup lang="ts">
import { PulseIcon, PulseTag } from '@/components'
import PulseDataTable from '../../PulseDataTable.vue'
import type { PulseDataTableProps } from '../../PulseDataTable.types'
import { DataSetItem } from '../dataSet'

const props = defineProps<PulseDataTableProps<DataSetItem>>()
</script>

<template>
  <PulseDataTable v-bind="props">
    <!-- Group Header -->
    <template #groupheader="{ data }">
      <span>{{ data.gender }}</span>
    </template>

    <!-- Column Headers -->
    <template #idHeader>
      <PulseIcon icon="thumbs up" />
    </template>
    <template #nameHeader>
      <PulseIcon icon="person" />
    </template>
    <template #ageHeader>
      <PulseIcon icon="clock" />
    </template>

    <!-- Columns -->
    <template #allergies="{ data }">
      <PulseTag
        v-for="allergy in data.allergies"
        :key="allergy.id"
        :value="allergy.name"
        :colour="allergy.colour"
      />
    </template>
  </PulseDataTable>
</template>
