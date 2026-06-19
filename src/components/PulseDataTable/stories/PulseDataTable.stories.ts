import type { Meta, StoryFn } from '@storybook/vue3-vite'

import PulseDataTable from '../PulseDataTable.vue'
import type { PulseDataTableProps } from '../PulseDataTable.types'
import { DataSetItem, largeDataSet, smallDataSet } from './dataSet'
import BaseTemplate from './templates/BaseTemplate.vue'
import CustomHeaderAndFooterTemplate from './templates/CustomHeaderAndFooterTemplate.vue'
import AsyncTableTemplate from './templates/AsyncTableTemplate.vue'
import GlobalSearchTemplate from './templates/GlobalSearchTemplate.vue'

export default {
  title: 'Components/PulseDataTable',
  component: PulseDataTable,
  argTypes: {
    items: {
      required: true,
      control: 'object',
    },
    loading: {
      control: 'boolean',
    },
    paginator: {
      control: 'boolean',
    },
    showHeaderWhenEmpty: {
      control: 'boolean',
    },
    lazy: {
      control: 'boolean',
    },
    first: {
      control: 'number',
    },
    totalRecords: {
      control: 'number',
    },
    rows: {
      control: 'number',
    },
    emptyTitle: {
      control: 'text',
      default: 'No records found',
    },
    emptyAction: {
      control: 'text',
      default: '',
    },
    emptyResult: {
      control: 'text',
      default: '',
    },
    rowGroupMode: {
      control: { type: 'select' },
      options: ['subheader', 'rowspan'],
    },
    groupRowsBy: {
      control: 'text',
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
  },
  tags: ['Unstyled'],
} as Meta<typeof PulseDataTable>

const BasicTableStory: StoryFn<PulseDataTableProps<DataSetItem>> = (args) => ({
  components: { BaseTemplate },
  setup() {
    return { args }
  },
  template: '<BaseTemplate v-bind="args" />',
})

export const BasicTable = BasicTableStory.bind({})
BasicTable.args = {
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'gender', header: 'Gender' },
  ],
  items: smallDataSet,
}

export const EmptyTable = BasicTableStory.bind({})
EmptyTable.args = {
  items: [],
  columns: [],
  emptyTitle: 'No people found',
  emptyAction: 'Try adjusting your filters',
  emptyResult: '0 results',
}

export const CustomContent = BasicTableStory.bind({})
CustomContent.args = {
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'gender', header: 'Gender' },
    { field: 'allergies', header: 'Allergies' },
  ],
  items: largeDataSet,
  paginator: true,
}

export const CustomColumnHeaders = BasicTableStory.bind({})
CustomColumnHeaders.args = {
  columns: [
    { field: 'id', header: 'ID', headerSlot: 'idHeader' },
    { field: 'name', header: 'Name', headerSlot: 'nameHeader' },
    { field: 'age', header: 'Age', headerSlot: 'ageHeader' },
  ],
  items: smallDataSet,
}

export const CustomHeaderAndFooter: StoryFn<typeof PulseDataTable> = () => ({
  components: { CustomHeaderAndFooterTemplate },
  setup() {
    return { args: BasicTable.args }
  },
  template: '<CustomHeaderAndFooterTemplate v-bind="args" />',
})

export const WithRowActions = BasicTableStory.bind({})
WithRowActions.args = {
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'gender', header: 'Gender' },
  ],
  items: smallDataSet,
  actions: [
    {
      label: 'View details',
      icon: 'access',
      command: (row) => alert(`View: ${row.name}`),
    },
    {
      label: 'Edit',
      icon: 'edit',
      command: (row) => alert(`Edit: ${row.name}`),
    },
    {
      label: 'Delete',
      icon: 'delete',
      command: (row) => alert(`Delete: ${row.name}`),
      visible: (row) => row.age >= 18,
    },
  ],
}
WithRowActions.parameters = {
  docs: {
    description: {
      story:
        'Pass an `actions` array to render a kebab menu in a 56 px trailing cell on every row. Each action can opt out per-row via `visible(row)` — the Delete action below is hidden for rows where `age < 18`.',
    },
  },
}

export const NavigableRows = BasicTableStory.bind({})
NavigableRows.args = {
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'gender', header: 'Gender' },
  ],
  items: smallDataSet,
  navigableRows: true,
  navigationLabel: 'View',
  selectionMode: 'single',
}
NavigableRows.parameters = {
  docs: {
    description: {
      story:
        'Set `navigableRows: true` to enable row-click navigation. Adds hover/pressed styling, a pointer cursor, and emits `@row-click` when a row is activated. A labelled menu item (controlled by `navigationLabel`, defaults to `"View"`) is automatically injected at the top of every row\'s kebab menu so keyboard users can trigger the same action.',
    },
  },
}

export const SortableColumns = BasicTableStory.bind({})
SortableColumns.args = {
  columns: [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'age', header: 'Age', sortable: true },
    { field: 'gender', header: 'Gender' },
  ],
  items: largeDataSet,
  sortMode: 'single',
  paginator: true,
}
SortableColumns.parameters = {
  docs: {
    description: {
      story:
        'Columns opt in to sorting via `sortable: true`. Sortable-but-unsorted headers show a stacked up+down caret; the active sort column shows a single up or down arrow.',
    },
  },
}

export const GroupBySubheader = BasicTableStory.bind({})
GroupBySubheader.args = {
  columns: [
    { field: 'gender', header: 'Gender' },
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
  ],
  items: smallDataSet?.sort((a, b) => a.gender.localeCompare(b.gender)),
  rowGroupMode: 'subheader',
  groupRowsBy: 'gender',
}

export const GroupByRowSpan = BasicTableStory.bind({})
GroupByRowSpan.args = {
  columns: GroupBySubheader.args.columns,
  items: smallDataSet?.sort((a, b) => a.gender.localeCompare(b.gender)),
  rowGroupMode: 'rowspan',
  groupRowsBy: 'gender',
}

const GlobalSearchStory: StoryFn<typeof PulseDataTable> = (args) => ({
  components: { GlobalSearchTemplate },
  setup() {
    return { args }
  },
  template: '<GlobalSearchTemplate v-bind="args" />',
})
export const GlobalSearch = GlobalSearchStory.bind({})
GlobalSearch.args = {
  columns: BasicTable.args.columns,
  items: largeDataSet,
  globalFilterFields: ['name', 'gender'],
  paginator: true,
  showHeaderWhenEmpty: true,
}

const AsyncTableStory: StoryFn<typeof PulseDataTable> = (args) => ({
  components: { AsyncTableTemplate },
  setup() {
    return { args }
  },
  template: '<AsyncTableTemplate v-bind="args" />',
})
export const AsyncPaginatedTable = AsyncTableStory.bind({})
AsyncPaginatedTable.args = {
  columns: [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
    { field: 'gender', header: 'Gender' },
  ],
  items: [],
  paginator: true,
  lazy: true,
  rowsPerPageOptions: [5, 10],
}

export const AsyncPaginatedTableWithSearch = AsyncTableStory.bind({})
AsyncPaginatedTableWithSearch.args = {
  ...AsyncPaginatedTable.args,
  globalFilterFields: ['name', 'gender'],
  showHeaderWhenEmpty: true,
}

export const AsyncTableWithPagingAndSorting = AsyncTableStory.bind({})
AsyncTableWithPagingAndSorting.args = {
  ...AsyncPaginatedTable.args,
  columns: [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'age', header: 'Age', sortable: true },
    { field: 'gender', header: 'Gender' },
  ],
  sortMode: 'single',
}
