<script setup lang="ts">
import { computed, ref } from 'vue'
import { DatePicker, Select, ToggleSwitch } from 'primevue'
import PulseStatusTag from '../PulseStatusTag/PulseStatusTag.vue'
import PulsePaginator from '../PulsePaginator/PulsePaginator.vue'
import type { MigrationAdminProps, MigrationService, MigrationServiceStatus } from './MigrationAdmin.types'

const props = withDefaults(defineProps<MigrationAdminProps>(), {
  services: () => [],
  totalRecords: 0,
  currentPage: 1,
  rows: 10,
  rowsPerPageOptions: () => [10, 25, 50],
  loading: false,
  toggleFirst: false,
  hideToggle: false,
})

const emit = defineEmits<{
  'update:startDate': [id: string, date: string | null]
  'update:active': [id: string, active: boolean]
  'update:status': [id: string, status: MigrationServiceStatus]
  'change': [event: { page: number; rows: number }]
  'sort': [field: string, order: 'asc' | 'desc']
}>()

// ── Toast ──────────────────────────────────────────────────────────────────
type ToastVariant = 'success' | 'warning'

const toast = ref<{ title: string; body: string; variant: ToastVariant } | null>(null)
let toastTimer: ReturnType<typeof setTimeout> | null = null

function showToast(title: string, body: string, variant: ToastVariant = 'success') {
  if (toastTimer) clearTimeout(toastTimer)
  toast.value = { title, body, variant }
  toastTimer = setTimeout(() => { toast.value = null }, 5000)
}

function dismissToast() {
  if (toastTimer) clearTimeout(toastTimer)
  toast.value = null
}

// ── Filter / Sort ──────────────────────────────────────────────────────────
const filterValue = ref<string | null>(null)
const sortField = ref<string>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')

const filterOptions = [
  { label: 'All', value: null },
  { label: 'Not Set', value: 'not-set' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in-progress' },
]

// ── Summary counts ─────────────────────────────────────────────────────────
const statusCounts = computed(() => ({
  notSet: props.services.filter((s) => s.status === 'not-set').length,
  scheduled: props.services.filter((s) => s.status === 'scheduled').length,
  inProgress: props.services.filter((s) => s.status === 'in-progress').length,
}))

// ── Helpers ────────────────────────────────────────────────────────────────
function statusTagProps(status: MigrationServiceStatus) {
  switch (status) {
    case 'scheduled':   return { status: 'general' as const,   value: 'Scheduled' }
    case 'in-progress': return { status: 'attention' as const, value: 'In Progress' }
    default:            return { status: 'greyed' as const,    value: 'Not Set' }
  }
}

function parseDate(dateStr: string | null): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? null : d
}

function formatDate(d: Date | null): string | null {
  if (!d) return null
  return d.toISOString().split('T')[0]
}

function formatDateHuman(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Event handlers ─────────────────────────────────────────────────────────
function onDateChange(service: MigrationService, value: Date | null) {
  if (!value) return

  const hadDate = !!service.startDate
  emit('update:startDate', service.id, formatDate(value))
  emit('update:active', service.id, true)
  emit('update:status', service.id, 'scheduled')

  const shortName = service.name.split('–')[0].trim()
  const dateStr = formatDateHuman(value)

  if (hadDate) {
    showToast(
      'Migration Rescheduled',
      `${shortName} has been rescheduled for ${dateStr}`,
      'warning',
    )
  } else {
    showToast(
      'Migration Active',
      `${shortName} has been scheduled to begin migration on ${dateStr}`,
      'success',
    )
  }
}

function onActiveChange(service: MigrationService, value: boolean) {
  emit('update:active', service.id, value)
  if (!value) {
    emit('update:status', service.id, 'not-set')
    const shortName = service.name.split('–')[0].trim()
    showToast(
      'Migration no longer active',
      `${shortName} scheduled migration has been set to inactive`,
      'warning',
    )
  }
}

function toggleSort(field: string) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
  emit('sort', sortField.value, sortOrder.value)
}

function onPage(event: { page: number; rows: number }) {
  emit('change', event)
}
</script>

<template>
  <div class="ma-shell">
    <!-- Toast -->
    <Transition name="ma-toast">
      <div
        v-if="toast"
        class="ma-toast"
        :class="`ma-toast--${toast.variant}`"
        role="status"
        aria-live="polite"
      >
        <span class="ma-toast__icon">
          <svg
            v-if="toast.variant === 'success'"
            viewBox="0 0 20 20"
            fill="none"
            width="16"
            height="16"
          >
            <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" />
            <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else
            viewBox="0 0 20 20"
            fill="none"
            width="16"
            height="16"
          >
            <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5" />
            <path d="M10 6v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="10" cy="14" r="0.75" fill="currentColor" />
          </svg>
        </span>
        <div class="ma-toast__content">
          <p class="ma-toast__title">{{ toast.title }}</p>
          <p class="ma-toast__body">{{ toast.body }}</p>
        </div>
        <button
          class="ma-toast__close"
          aria-label="Dismiss"
          @click="dismissToast"
        >
          ×
        </button>
      </div>
    </Transition>

    <!-- Page card -->
    <div class="ma-card">
      <h1 class="ma-title">Migration Admin</h1>

      <!-- Summary -->
      <div class="ma-summary">
        <p class="ma-summary__heading">Summary</p>
        <p class="ma-summary__description">
          Setup and manage the migration of your Services on to the new 1 Care Plan Platform
        </p>
        <div class="ma-summary__counts">
          <span class="ma-count ma-count--not-set">
            <span class="ma-count__dot" />
            Not Set {{ statusCounts.notSet }}
          </span>
          <span class="ma-count ma-count--scheduled">
            <span class="ma-count__dot" />
            Scheduled {{ statusCounts.scheduled }}
          </span>
          <span class="ma-count ma-count--in-progress">
            <span class="ma-count__dot" />
            In Progress {{ statusCounts.inProgress }}
          </span>
        </div>
      </div>

      <!-- Filter -->
      <div class="ma-filter-row">
        <Select
          v-model="filterValue"
          :options="filterOptions"
          option-label="label"
          option-value="value"
          placeholder="All"
          class="ma-filter__select"
        />
      </div>

      <!-- Table -->
      <div class="ma-table-wrap">
        <table class="ma-table">
          <thead>
            <tr class="ma-table__head-row">
              <th
                v-if="!hideToggle && toggleFirst"
                class="ma-table__th ma-table__th--active"
              >
                Active
              </th>
              <th
                class="ma-table__th ma-table__th--name"
                @click="toggleSort('name')"
              >
                <span class="ma-table__th-inner">
                  Service Name
                  <span class="ma-table__sort-arrow">{{ sortField === 'name' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕' }}</span>
                </span>
              </th>
              <th
                class="ma-table__th ma-table__th--date"
                @click="toggleSort('startDate')"
              >
                <span class="ma-table__th-inner">
                  Start Date
                  <span class="ma-table__sort-arrow">{{ sortField === 'startDate' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕' }}</span>
                </span>
              </th>
              <th
                class="ma-table__th ma-table__th--status"
                @click="toggleSort('status')"
              >
                <span class="ma-table__th-inner">
                  Status
                  <span class="ma-table__sort-arrow">{{ sortField === 'status' ? (sortOrder === 'asc' ? '↓' : '↑') : '↕' }}</span>
                </span>
              </th>
              <th
                v-if="!hideToggle && !toggleFirst"
                class="ma-table__th ma-table__th--active"
              >
                Active
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="service in services"
              :key="service.id"
              class="ma-table__row"
              :class="{ 'ma-table__row--inactive': !service.active }"
            >
              <td
                v-if="!hideToggle && toggleFirst"
                class="ma-table__td ma-table__td--active"
              >
                <ToggleSwitch
                  :model-value="service.active"
                  @update:model-value="(v) => onActiveChange(service, v)"
                />
              </td>
              <td class="ma-table__td ma-table__td--name">
                {{ service.name }}
              </td>
              <td class="ma-table__td ma-table__td--date">
                <DatePicker
                  :model-value="parseDate(service.startDate)"
                  :disabled="!hideToggle && service.active"
                  date-format="d M yy"
                  show-icon
                  icon-display="input"
                  placeholder="-"
                  class="ma-date-picker"
                  @update:model-value="(v) => onDateChange(service, v as Date | null)"
                />
              </td>
              <td class="ma-table__td ma-table__td--status">
                <PulseStatusTag v-bind="statusTagProps(service.status)" />
              </td>
              <td
                v-if="!hideToggle && !toggleFirst"
                class="ma-table__td ma-table__td--active"
              >
                <ToggleSwitch
                  :model-value="service.active"
                  @update:model-value="(v) => onActiveChange(service, v)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="ma-pagination">
        <PulsePaginator
          mode="remote"
          :current-page="currentPage"
          :rows="rows"
          :total="totalRecords"
          :rows-per-page-options="rowsPerPageOptions"
          always-show
          @change="onPage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ma-shell {
  padding: 24px;
  background: var(--pulse-color-neutral-30, #f4f5f7);
  min-height: 100%;
  font-family: Inter, sans-serif;
  position: relative;
}

/* ── Toast ── */
.ma-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 340px;
  padding: 14px 16px;
  background: #fff;
  border-radius: 8px;
  border-left: 4px solid;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.ma-toast--success {
  border-left-color: var(--pulse-color-success-70, #16a34a);
}

.ma-toast--success .ma-toast__icon {
  color: var(--pulse-color-success-70, #16a34a);
}

.ma-toast--warning {
  border-left-color: var(--pulse-color-attention-70, #d97706);
}

.ma-toast--warning .ma-toast__icon {
  color: var(--pulse-color-attention-70, #d97706);
}

.ma-toast__icon {
  flex-shrink: 0;
  margin-top: 1px;
  display: flex;
}

.ma-toast__content {
  flex: 1;
  min-width: 0;
}

.ma-toast__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--pulse-color-neutral-120, #1f2937);
  margin: 0 0 2px;
}

.ma-toast__body {
  font-size: 13px;
  color: var(--pulse-color-neutral-100, #6b7280);
  margin: 0;
  line-height: 1.4;
}

.ma-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  color: var(--pulse-color-neutral-90, #9ca3af);
  padding: 0;
  margin-top: -2px;
}

.ma-toast__close:hover {
  color: var(--pulse-color-neutral-120, #1f2937);
}

/* Toast transition */
.ma-toast-enter-active,
.ma-toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.ma-toast-enter-from,
.ma-toast-leave-to {
  opacity: 0;
  transform: translateX(16px);
}

/* ── Card ── */
.ma-card {
  background: #fff;
  border-radius: 9px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* ── Title ── */
.ma-title {
  font-family: 'FS Me', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--pulse-color-primary-110, #004c5a);
  margin: 0 0 20px;
}

/* ── Summary ── */
.ma-summary {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
}

.ma-summary__heading {
  font-size: 14px;
  font-weight: 600;
  color: var(--pulse-color-primary-80, #009aab);
  margin: 0;
}

.ma-summary__description {
  font-size: 14px;
  color: var(--pulse-color-neutral-100, #6b7280);
  margin: 0;
}

.ma-summary__counts {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.ma-count {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid;
  font-size: 12px;
  font-weight: 500;
}

.ma-count__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ma-count--not-set {
  border-color: var(--pulse-color-neutral-60, #d1d5db);
  color: var(--pulse-color-neutral-100, #6b7280);
  background: var(--pulse-color-neutral-20, #f9fafb);
}
.ma-count--not-set .ma-count__dot { background: var(--pulse-color-neutral-80, #9ca3af); }

.ma-count--scheduled {
  border-color: var(--pulse-color-general-50, #a7d7db);
  color: var(--pulse-color-neutral-110, #374151);
  background: var(--pulse-color-general-10, #f0fafb);
}
.ma-count--scheduled .ma-count__dot { background: var(--pulse-color-general-70, #009aab); }

.ma-count--in-progress {
  border-color: var(--pulse-color-attention-50, #fcd34d);
  color: var(--pulse-color-neutral-110, #374151);
  background: var(--pulse-color-attention-10, #fffbeb);
}
.ma-count--in-progress .ma-count__dot { background: var(--pulse-color-attention-70, #f59e0b); }

/* ── Filter ── */
.ma-filter-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.ma-filter__select {
  width: 160px;
  font-size: 14px;
}

/* ── Table ── */
.ma-table-wrap { overflow-x: auto; }

.ma-table {
  width: 100%;
  border-collapse: collapse;
}

.ma-table__head-row {
  border-bottom: 1px solid var(--pulse-color-neutral-40, #e5e7eb);
}

.ma-table__th {
  padding: 10px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--pulse-color-neutral-110, #374151);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.ma-table__th--active { cursor: default; }

.ma-table__th-inner {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.ma-table__sort-arrow {
  font-size: 11px;
  opacity: 0.5;
}

.ma-table__th--name   { width: 50%; }
.ma-table__th--date   { width: 20%; }
.ma-table__th--status { width: 16%; }
.ma-table__th--active { width: 14%; }

.ma-table__row {
  border-bottom: 1px solid var(--pulse-color-neutral-30, #f3f4f6);
  transition: background 0.1s;
}

.ma-table__row:hover { background: var(--pulse-color-neutral-20, #f9fafb); }

.ma-table__row--inactive .ma-table__td--name {
  color: var(--pulse-color-neutral-70, #b0b9c4);
}

.ma-table__td {
  padding: 10px 12px;
  font-size: 14px;
  color: var(--pulse-color-neutral-120, #1f2937);
  vertical-align: middle;
}

/* ── Inline date picker ── */
.ma-date-picker { font-size: 14px; }

.ma-date-picker :deep(.p-datepicker-input) {
  height: 32px;
  min-width: 120px;
  font-size: 14px;
  padding: 4px 8px;
  border-color: var(--pulse-color-neutral-50, #e5e7eb);
  border-radius: 6px;
}

.ma-date-picker :deep(.p-datepicker-button) {
  height: 32px;
  width: 32px;
  border-radius: 0 6px 6px 0;
  border-color: var(--pulse-color-neutral-50, #e5e7eb);
}

.ma-date-picker :deep(.p-datepicker-input:disabled) {
  opacity: 1;
  color: var(--pulse-color-neutral-80, #9ca3af);
  background: var(--pulse-color-neutral-20, #f9fafb);
  cursor: default;
}

.ma-date-picker :deep(.p-datepicker-button:disabled) {
  opacity: 0.4;
  cursor: default;
}

/* ── Pagination ── */
.ma-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
