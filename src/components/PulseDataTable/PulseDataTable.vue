<script setup lang="ts" generic="T extends ObjectUnknown = ObjectUnknown">
import { computed, ref, useId } from 'vue'
import { DataTable, Column } from 'primevue'
import type { DataTablePageEvent, DataTableRowClickEvent, DataTableSortEvent } from 'primevue/datatable'

import type { ObjectUnknown } from '@/types'
import { PulseMenu, PulseEmptyState, PulseInputText } from '@/components'
import type { PulseDataTableEmits, PulseDataTableProps, PulseDataTableSlots } from './PulseDataTable.types'
import PulseComponent from '../PulseComponent.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PulseDataTableProps<T>>(), {
  rows: 5,
  emptyTitle: 'No records found',
  navigationLabel: 'View',
  filtersDebounce: 500,
})

defineSlots<PulseDataTableSlots<T>>()

const emit = defineEmits<PulseDataTableEmits<T>>()

let filtersDebounceTimer: ReturnType<typeof setTimeout>

const selectedRow = ref<T>()

const searchInputId = `pulse-datatable-search-${useId()}`
const filters = ref({
  global: { value: undefined as string | undefined, matchMode: 'contains' },
})

const globalSearchValue = computed({
  get: () => filters.value.global.value ?? '',
  set: (val: string) => {
    filters.value.global.value = val
    if (props.lazy) {
      clearTimeout(filtersDebounceTimer)
      filtersDebounceTimer = setTimeout(() => {
        emit('search', val)
      }, props.filtersDebounce)
    }
  },
})

const isEmpty = computed(() => !props.loading && (props.items?.length ?? 0) === 0)
const displayColumns = computed(() => (isEmpty.value ? [] : props.columns))

function getRowActions(row: T) {
  const navItem = props.navigableRows
    ? [
        {
          label: props.navigationLabel,
          command: () => emit('row-click', { data: row }),
        },
      ]
    : []

  const actionItems = (props.actions ?? [])
    .filter((action) => !action.visible || action.visible(row))
    .map((action) => ({
      label: action.label,
      icon: action.icon,
      command: () => action.command?.(row),
    }))

  return [...navItem, ...actionItems]
}

function onPage(e: DataTablePageEvent) {
  emit('page', e)
}

function onRowClick(e: DataTableRowClickEvent<T>) {
  emit('row-click', e)
}

function onSort(e: DataTableSortEvent) {
  emit('sort', e)
}
</script>

<template>
  <PulseComponent>
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedRow"
      :value="items"
      :pt="tableAriaLabel ? { table: { 'aria-label': tableAriaLabel } } : undefined"
      :loading="loading"
      :paginator="paginator"
      :selection-mode="selectionMode"
      :rows="rows"
      :rows-per-page-options="rowsPerPageOptions"
      :lazy="lazy"
      :first="first"
      :total-records="totalRecords"
      :row-group-mode="rowGroupMode"
      :group-rows-by="groupRowsBy"
      :global-filter-fields="globalFilterFields"
      :sort-mode="sortMode"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      @page="onPage"
      @row-click="onRowClick"
      @sort="onSort"
    >
      <template
        v-if="(globalFilterFields?.length || $slots.header || $slots.subheader) && (!isEmpty || showHeaderWhenEmpty)"
        #header
      >
        <div class="pulse-datatable-header">
          <slot name="header" />
          <PulseInputText
            v-if="globalFilterFields?.length"
            v-model="globalSearchValue"
            :input-id="searchInputId"
            placeholder="Search..."
            icon="search"
            :disabled="loading"
          />
        </div>
        <div
          v-if="$slots.subheader"
          class="divider"
        />
        <slot name="subheader" />
      </template>

      <Column
        v-for="col in displayColumns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
        :sort-field="col.sortField ?? col.field"
        :pt="col.pt"
      >
        <template
          v-if="col.headerSlot && $slots[col.headerSlot]"
          #header
        >
          <slot :name="col.headerSlot" />
        </template>
        <template
          v-if="col.sortable"
          #sorticon="{ sorted, sortOrder }"
        >
          <svg
            v-if="sorted"
            class="pulse-data-table-sort-icon pulse-data-table-sort-icon--sorted"
            :class="{ 'pulse-data-table-sort-icon--asc': sortOrder === 1 }"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12.8538 9.35375L8.35375 13.8538C8.30731 13.9002 8.25217 13.9371 8.19147 13.9623C8.13077 13.9874 8.06571 14.0004 8 14.0004C7.93429 14.0004 7.86923 13.9874 7.80853 13.9623C7.74783 13.9371 7.69269 13.9002 7.64625 13.8538L3.14625 9.35375C3.05243 9.25993 2.99972 9.13268 2.99972 9C2.99972 8.86732 3.05243 8.74007 3.14625 8.64625C3.24007 8.55243 3.36732 8.49972 3.5 8.49972C3.63268 8.49972 3.75993 8.55243 3.85375 8.64625L7.5 12.2931V2.5C7.5 2.36739 7.55268 2.24021 7.64645 2.14645C7.74022 2.05268 7.86739 2 8 2C8.13261 2 8.25979 2.05268 8.35355 2.14645C8.44732 2.24021 8.5 2.36739 8.5 2.5V12.2931L12.1463 8.64625C12.2401 8.55243 12.3673 8.49972 12.5 8.49972C12.6327 8.49972 12.7599 8.55243 12.8538 8.64625C12.9476 8.74007 13.0003 8.86732 13.0003 9C13.0003 9.13268 12.9476 9.25993 12.8538 9.35375Z"
              fill="currentColor"
            />
          </svg>
          <svg
            v-else
            class="pulse-data-table-sort-icon pulse-data-table-sort-icon--sortable"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M11.3538 10.6462C11.4002 10.6927 11.4371 10.7478 11.4623 10.8085C11.4874 10.8692 11.5004 10.9343 11.5004 11C11.5004 11.0657 11.4874 11.1308 11.4623 11.1915C11.4371 11.2522 11.4002 11.3073 11.3538 11.3537L8.35375 14.3537C8.30731 14.4002 8.25217 14.4371 8.19147 14.4623C8.13077 14.4874 8.06571 14.5004 8 14.5004C7.93429 14.5004 7.86923 14.4874 7.80853 14.4623C7.74783 14.4371 7.69269 14.4002 7.64625 14.3537L4.64625 11.3537C4.55243 11.2599 4.49972 11.1327 4.49972 11C4.49972 10.8673 4.55243 10.7401 4.64625 10.6462C4.74007 10.5524 4.86732 10.4997 5 10.4997C5.13268 10.4997 5.25993 10.5524 5.35375 10.6462L8 13.2931L10.6462 10.6462C10.6927 10.5998 10.7478 10.5629 10.8085 10.5377C10.8692 10.5126 10.9343 10.4996 11 10.4996C11.0657 10.4996 11.1308 10.5126 11.1915 10.5377C11.2522 10.5629 11.3073 10.5998 11.3538 10.6462ZM5.35375 5.35375L8 2.70688L10.6462 5.35375C10.7401 5.44757 10.8673 5.50028 11 5.50028C11.1327 5.50028 11.2599 5.44757 11.3538 5.35375C11.4476 5.25993 11.5003 5.13268 11.5003 5C11.5003 4.86732 11.4476 4.74007 11.3538 4.64625L8.35375 1.64625C8.30731 1.59976 8.25217 1.56288 8.19147 1.53772C8.13077 1.51256 8.06571 1.49961 8 1.49961C7.93429 1.49961 7.86923 1.51256 7.80853 1.53772C7.74783 1.56288 7.69269 1.59976 7.64625 1.64625L4.64625 4.64625C4.55243 4.74007 4.49972 4.86732 4.49972 5C4.49972 5.13268 4.55243 5.25993 4.64625 5.35375C4.74007 5.44757 4.86732 5.50028 5 5.50028C5.13268 5.50028 5.25993 5.44757 5.35375 5.35375Z"
              fill="currentColor"
            />
          </svg>
        </template>
        <template
          v-if="$slots[col.field]"
          #body="slotProps"
        >
          <slot
            :name="col.field"
            v-bind="slotProps"
          />
        </template>
      </Column>
      <Column
        v-if="!isEmpty && (actions?.length || navigableRows)"
        :style="{ width: '56px' }"
        :exportable="false"
        body-class="pulse-data-table-actions-cell"
      >
        <template #header>
          <span class="pulse-data-table-sr-only">Actions</span>
        </template>
        <template #body="{ data }">
          <div
            class="pulse-data-table-row-actions"
            @click.stop
          >
            <PulseMenu
              :items="getRowActions(data)"
              icon="more options"
              :aria-label="props.actionsLabel ? props.actionsLabel(data) : 'More options'"
            />
          </div>
        </template>
      </Column>
      <template
        v-if="$slots.groupheader && !isEmpty"
        #groupheader="slotProps"
      >
        <slot
          name="groupheader"
          :data="slotProps.data"
          :index="slotProps.index"
        />
      </template>
      <template #empty>
        <PulseEmptyState
          :empty-title="emptyTitle"
          :empty-action="emptyAction"
          :empty-result="emptyResult"
        />
      </template>
      <template
        v-if="$slots.footer && !isEmpty"
        #footer
      >
        <slot name="footer" />
      </template>
    </DataTable>
  </PulseComponent>
</template>

<style scoped>
.pulse-datatable-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.divider {
  border-bottom: 1px solid var(--p-datatable-body-cell-border-color);
  margin: var(--pulse-space-s) 0;
}

.pulse-data-table-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.pulse-data-table-sort-icon {
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/*
 * PrimeVue wraps the header label + `#sorticon` in `.p-datatable-column-header-content`.
 * Force flex centering so the 16px caret sits on the optical middle of the header text
 * regardless of the text's line-height.
 */
:deep(.p-datatable-column-header-content) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse-data-table-sort-icon--sortable {
  color: var(--pulse-color-neutral-80);
}

.pulse-data-table-sort-icon--sorted {
  color: var(--pulse-color-primary-90);
}

.pulse-data-table-sort-icon--asc {
  transform: rotate(180deg);
}

/*
 * Hover + pressed for sortable header cells.
 * `.p-datatable-sortable-column` is applied by PrimeVue to any <th> with
 * `sortable` enabled, whether currently sorted or not — so these rules cover
 * both the Sortable* and Sorted* states from the Figma frame. Unsortable
 * columns do not receive this class and remain static, matching the design.
 */
:deep(.p-datatable-sortable-column) {
  cursor: pointer;
  transition: background-color 0.15s ease;
}

:deep(.p-datatable-sortable-column:hover) {
  background: var(--pulse-color-neutral-20) !important;
}

:deep(.p-datatable-sortable-column:active) {
  background: var(--pulse-color-neutral-30) !important;
}

:deep(.pulse-data-table-actions-cell) {
  vertical-align: middle;
  padding-top: 0;
  padding-bottom: 0;
}

.pulse-data-table-row-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

:deep(.pulse-data-table-row-actions .menu-button) {
  width: 24px;
  height: 24px;
  min-width: 24px;
  padding: 0;
}
</style>

<!-- Unscoped: reduced-motion override. Kept outside <style scoped> to avoid
     a Vue compiler issue where :deep() inside @media corrupts scoped attribute
     propagation on surrounding rules. Class names are component-specific so
     there is no meaningful global style pollution. -->
<style>
@media (prefers-reduced-motion: reduce) {
  .p-datatable-sortable-column {
    transition: none !important;
  }
}
</style>
