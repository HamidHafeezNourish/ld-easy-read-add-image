import { DatatableComponentToken } from '@/themes/primePresetTypes'

export const pulseDataTableTheme: DatatableComponentToken = {
  headerCell: {
    background: 'var(--pulse-color-neutral-10)',
    color: 'var(--pulse-color-neutral-120)',
    // Hover/pressed are intentionally no-ops at the theme level so unsortable
    // columns stay static. Sortable columns opt in to hover + pressed via the
    // `.p-datatable-sortable-column` scoped styles in PulseDataTable.vue.
    hoverBackground: 'var(--pulse-color-neutral-10)',
    hoverColor: 'var(--pulse-color-neutral-120)',
    selectedBackground: 'var(--pulse-color-neutral-10)',
    selectedColor: 'var(--pulse-color-neutral-120)',
    padding: '10.5px 14px',
  },
  columnTitle: {
    fontWeight: 'var(--pulse-font-weight-strong)',
  },
  row: {
    background: 'var(--pulse-color-neutral-10)',
    // Hover/selected are intentionally no-ops here; the `navigableRows` prop
    // opts in to hover + pressed via the `.pulse-data-table-row--clickable`
    // scoped class. Suppressing selectedBackground/selectedColor prevents
    // PrimeVue's default highlight from persisting after a row is clicked.
    hoverBackground: 'var(--pulse-color-neutral-20)',
    selectedBackground: 'var(--pulse-color-neutral-40)',
    color: 'var(--pulse-color-neutral-120)',
    selectedColor: 'var(--pulse-color-neutral-130)',
  },
  bodyCell: {
    borderColor: 'var(--pulse-color-neutral-50)',
    padding: '10.5px 14px',
  },
  sortIcon: {
    color: 'var(--pulse-color-neutral-80)',
    hoverColor: 'var(--pulse-color-primary-90)',
  },
}
