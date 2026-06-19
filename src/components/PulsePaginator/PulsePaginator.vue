<script lang="ts" setup>
import PulseComponent from '@/components/PulseComponent.vue'
import { PageState, Paginator } from 'primevue'
import { computed, watch } from 'vue'
import type { PulsePaginatorProps } from './PulsePaginator.types'

const props = withDefaults(defineProps<PulsePaginatorProps>(), {
  mode: 'local',
  alwaysShow: true,
})

const emit = defineEmits(['update:currentPage', 'update:rows', 'change'])

const totalRecords = computed(() => (props.mode === 'local' ? (props.items?.length ?? 0) : (props.total ?? 0)))

const firstItem = computed({
  get: () => props.currentPage * props.rows,
  set: (p: number) => emit('update:currentPage', Math.floor(p / props.rows)),
})

const pagedItems = computed(() => {
  if (props.mode === 'local') {
    const start = firstItem.value
    return (props.items ?? []).slice(start, start + props.rows)
  }
  return []
})

const onPage = (event: PageState) => {
  const nextPage = Math.floor(event.first / event.rows)
  emit('update:rows', event.rows)
  emit('update:currentPage', nextPage)
  emit('change', { first: event.first, rows: event.rows, page: nextPage })
}

watch(totalRecords, (t) => {
  const maxPage = Math.max(0, Math.ceil(t / props.rows) - 1)
  if (props.currentPage > maxPage) emit('update:currentPage', maxPage)
})

watch(
  () => props.rowsPerPageOptions,
  (r) => {
    emit('update:rows', r)
  },
)
</script>
<template>
  <PulseComponent>
    <slot
      :items="pagedItems"
      :page="currentPage"
      :rows="rows"
      :total="totalRecords"
    />

    <Paginator
      :first="firstItem"
      :rows="rows"
      :total-records="totalRecords"
      :rows-per-page-options="rowsPerPageOptions"
      :always-show="alwaysShow"
      @page="onPage"
    />
  </PulseComponent>
</template>
