<script setup lang="ts">
import { ref } from 'vue'
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'

import PulseDataTable from '../../PulseDataTable.vue'
import type { PulseDataTableProps } from '../../PulseDataTable.types'
import { largeDataSet } from '../dataSet'
import type { DataSetItem } from '../dataSet'

const props = defineProps<PulseDataTableProps<DataSetItem>>()

const items = ref<DataSetItem[]>([])
const loading = ref(false)
const rows = ref(5)
const first = ref(0)
const totalRecords = ref(largeDataSet.length)
const currentSearch = ref('')
const currentSortField = ref<keyof DataSetItem>()
const currentSortOrder = ref<number>()

async function fakeApiFetch(
  page: number,
  perPage: number,
  search = '',
  sortField?: keyof DataSetItem,
  sortOrder?: number,
) {
  loading.value = true

  const data = await new Promise<DataSetItem[]>((resolve) => {
    setTimeout(() => {
      const start = page * perPage
      const end = start + perPage

      const searchedData = largeDataSet.filter((item) => {
        if (!search) return true
        const searchLower = search.toLowerCase()
        const fields = props.globalFilterFields ?? []
        return fields.some((field) =>
          String(item[field as keyof DataSetItem])
            .toLowerCase()
            .includes(searchLower),
        )
      })

      const sortedData = searchedData.sort((a, b) => {
        if (sortField && sortOrder !== undefined) {
          const aVal = a[sortField]
          const bVal = b[sortField]
          if (aVal < bVal) return sortOrder === 1 ? -1 : 1
          if (aVal > bVal) return sortOrder === 1 ? 1 : -1
        }
        return 0
      })

      resolve(sortedData.slice(start, end))
    }, 500)
  })
  items.value = data
  loading.value = false
}

function onPage(e: DataTablePageEvent) {
  first.value = e.first
  rows.value = e.rows

  fakeApiFetch(e.page, e.rows, currentSearch.value, currentSortField.value, currentSortOrder.value)
}

function onSort(e: DataTableSortEvent) {
  currentSortField.value = e.sortField as keyof DataSetItem
  currentSortOrder.value = e.sortOrder as number
  first.value = 0
  fakeApiFetch(0, rows.value, currentSearch.value, currentSortField.value, currentSortOrder.value)
}

function onRowClick(e: { data: DataSetItem }) {
  alert(`Row clicked: ${e.data.name}, Age: ${e.data.age}, Gender: ${e.data.gender}`)
}

function onSearch(value: string) {
  currentSearch.value = value
  first.value = 0
  fakeApiFetch(0, rows.value, value, currentSortField.value, currentSortOrder.value)
}

fakeApiFetch(0, rows.value, currentSearch.value, currentSortField.value, currentSortOrder.value)
</script>

<template>
  <PulseDataTable
    v-bind="props"
    :items="items"
    :loading="loading"
    :rows="rows"
    :first="first"
    :total-records="totalRecords"
    :sort-field="currentSortField"
    :sort-order="currentSortOrder"
    @page="onPage"
    @row-click="onRowClick"
    @sort="onSort"
    @search="onSearch"
  />
</template>
