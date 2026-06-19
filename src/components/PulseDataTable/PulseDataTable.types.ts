import type { VNode } from 'vue'
import type { DataTableProps, DataTableSlots, ColumnSlots } from 'primevue'
import type { PassThrough } from '@primevue/core'
import type { ColumnPassThroughOptions } from 'primevue/column'
import type { DataTablePageEvent, DataTableSortEvent } from 'primevue/datatable'

import type { ObjectUnknown } from '@/types'
import type { PulseEmptyStateProps, PulseMenuItems } from '@/components'

export type PulseDataTableColumnProps = {
  field: string
  header?: string
  sortable?: boolean
  sortField?: string
  headerSlot?: string
  pt?: PassThrough<ColumnPassThroughOptions>
}

export type PulseDataTableProps<T = ObjectUnknown> = {
  columns: PulseDataTableColumnProps[]
  items: DataTableProps<T>['value']
  showHeaderWhenEmpty?: boolean
  /** Per-row actions rendered in the trailing kebab menu.
   * `visible(row)` controls which *items* appear for a given row — it does not
   * hide the menu button itself. The button is always present when the table has
   * an actions column (i.e. `actions` is passed or `navigableRows` is true). */
  actions?: PulseMenuItems<T>
  /** Enables row-click navigation: adds hover/pressed styling, a pointer cursor,
   * and emits `row-click` when a row is activated. Also injects a labelled menu
   * item into every row's kebab menu so keyboard users can trigger the same action. */
  navigableRows?: boolean
  /** Label for the row-navigation menu item injected when `navigableRows` is true.
   * Defaults to `'View'`. */
  navigationLabel?: string
  /** Returns the accessible label for each row's kebab menu button.
   * Used to give screen-reader users row-specific context, e.g. `(row) => \`Actions for ${row.name}\``.
   * Defaults to `'More options'` when omitted. */
  actionsLabel?: (row: T) => string
  /** Accessible name for the `<table>` element (maps to `aria-label`).
   * Required when more than one table appears on the same page so screen-reader
   * users can distinguish them, e.g. `"Outstanding actions"` or `"Recent audits"`. */
  tableAriaLabel?: string
  filtersDebounce?: number
} & Pick<
  DataTableProps<T>,
  | 'loading'
  | 'paginator'
  | 'rows'
  | 'rowsPerPageOptions'
  | 'lazy'
  | 'first'
  | 'totalRecords'
  | 'rowGroupMode'
  | 'groupRowsBy'
  | 'globalFilterFields'
  | 'sortMode'
  | 'selectionMode'
> &
  PulseEmptyStateProps

export type PulseDataTableSlots<T> = {
  [columnKey: string]:
    | ((
        props: {
          data: T
          node: T
        } & Omit<Parameters<ColumnSlots['body']>[0], 'data' | 'node'>,
      ) => VNode[])
    | Parameters<ColumnSlots['header']>
    | undefined
} & {
  header?: DataTableSlots<T>['header']
  footer?: DataTableSlots<T>['footer']
  empty?: DataTableSlots<T>['empty']
  groupheader?: DataTableSlots<T>['groupheader']
}

export type PulseDataTableEmits<T> = {
  (e: 'page', event: DataTablePageEvent): void
  (e: 'row-click', event: { data: T }): void
  (e: 'sort', event: DataTableSortEvent): void
  (e: 'search', value: string): void
}
