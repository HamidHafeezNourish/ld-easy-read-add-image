<script setup lang="ts">
import { computed } from 'vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import PulseTag from '../PulseTag/PulseTag.vue'
import PulseProgressBar from '../PulseProgressBar/PulseProgressBar.vue'
import PulseSelect from '../input/PulseSelect/PulseSelect.vue'
import PulseIcon from '../PulseIcon/PulseIcon.vue'
import type { CarePlanMigrationProps, NavSection, PageRow, TableGroup } from './CarePlanMigration.types'

const props = withDefaults(defineProps<CarePlanMigrationProps>(), {
  residentTags: () => [],
  stepNumber: 3,
  totalSteps: 4,
  stepTitle: 'Assign Needs',
  stepDescription: "We've matched each Pages to the confirmed Sections. Please review and confirm so we can continue.",
  sections: () => [],
  tableGroups: () => [],
  sectionOptions: () => [],
  allMapped: false,
})

const emit = defineEmits<{
  'save-and-exit': []
  'return': []
  'proceed': []
  'preview': []
  'update:mapping': [rowId: string, value: string | null]
}>()

const mappings = defineModel<Record<string, string | null>>('mappings', { default: () => ({}) })

const sectionSelectOptions = computed(() =>
  props.sectionOptions.map((s) => ({ label: s, value: s })),
)

function getMapping(rowId: string) {
  return mappings.value[rowId] ?? null
}

function setMapping(rowId: string, value: string | null) {
  mappings.value = { ...mappings.value, [rowId]: value }
  emit('update:mapping', rowId, value)
}

function unmatchedCount(section: NavSection) {
  return section.status === 'unmatched' ? section.pageCount : 0
}
</script>

<template>
  <div class="cpm-shell">
    <!-- Info bar -->
    <div class="cpm-infobar">
      <div class="cpm-infobar__resident">
        <div class="cpm-infobar__avatar">
          <PulseIcon
            icon="account"
            colour="primary"
          />
        </div>
        <span class="cpm-infobar__name">{{ residentName }}</span>
        <span
          v-for="tag in residentTags"
          :key="tag"
          class="cpm-infobar__care-tag"
        >{{ tag }}</span>
      </div>
      <PulseButton
        label="Save and Exit"
        type="secondary"
        small
        @click="emit('save-and-exit')"
      />
    </div>

    <!-- Wizard step panel -->
    <div class="cpm-wizard">
      <div class="cpm-wizard__info">
        <p class="cpm-wizard__step-label">Step {{ stepNumber }} of {{ totalSteps }}</p>
        <div class="cpm-wizard__heading-group">
          <h2 class="cpm-wizard__title">{{ stepTitle }}</h2>
          <p class="cpm-wizard__description">{{ stepDescription }}</p>
        </div>
        <div class="cpm-wizard__status">
          <PulseTag
            v-if="allMapped"
            colour="jade"
            value="Resolved"
            icon-title="submit"
          />
          <PulseTag
            v-else
            colour="mulberry"
            value="Unmatched"
            icon-title="warning circle"
          />
          <span
            v-if="allMapped"
            class="cpm-wizard__status-text cpm-wizard__status-text--success"
          >
            All Needs have been mapped to a Page
          </span>
          <span
            v-else
            class="cpm-wizard__status-text cpm-wizard__status-text--warning"
          >
            Resolve all unmatched sections before continuing
          </span>
        </div>
      </div>
      <div class="cpm-wizard__actions">
        <PulseButton
          label="Return to Pages"
          type="secondary"
          @click="emit('return')"
        />
        <PulseButton
          label="Proceed"
          type="primary"
          icon="continue"
          :disabled="!allMapped"
          @click="emit('proceed')"
        />
      </div>
    </div>

    <!-- Main content -->
    <div class="cpm-content">
      <!-- Left navigation -->
      <aside class="cpm-nav">
        <h3 class="cpm-nav__title">Navigation</h3>
        <div class="cpm-nav__panel">
          <div class="cpm-nav__panel-header">
            <span class="cpm-nav__sections-label">Sections</span>
            <PulseButton
              label="Preview"
              type="secondary"
              small
              @click="emit('preview')"
            />
          </div>
          <div class="cpm-nav__divider" />
          <div class="cpm-nav__list">
            <div
              v-for="section in sections"
              :key="section.id"
              class="cpm-nav__item"
              :class="{ 'cpm-nav__item--active': section.active }"
            >
              <div class="cpm-nav__item-row">
                <span
                  class="cpm-nav__item-name"
                  :class="{
                    'cpm-nav__item-name--active': section.active,
                    'cpm-nav__item-name--muted': section.status === 'pending',
                  }"
                >{{ section.name }}</span>
                <PulseIcon
                  v-if="section.status === 'resolved'"
                  icon="submit"
                  colour="success"
                  size="small"
                />
              </div>
              <div class="cpm-nav__item-meta">
                <span
                  class="cpm-nav__item-count"
                  :class="{ 'cpm-nav__item-count--muted': section.active }"
                >{{ section.pageCount }} Pages</span>
                <PulseTag
                  v-if="section.status === 'unmatched'"
                  colour="mulberry"
                  :value="String(unmatchedCount(section))"
                  icon-title="warning circle"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Table area -->
      <div class="cpm-tables">
        <div
          v-for="group in tableGroups"
          :key="group.id"
          class="cpm-table-group"
        >
          <!-- Group header -->
          <div class="cpm-table-header">
            <span class="cpm-table-header__title">{{ group.name }}</span>
            <div class="cpm-table-header__cols">
              <span class="cpm-table-header__col">Mapping</span>
              <span class="cpm-table-header__col cpm-table-header__col--wide">New Care Plan Need</span>
            </div>
          </div>

          <!-- Rows -->
          <div class="cpm-table-rows">
            <div
              v-for="row in group.rows"
              :key="row.id"
              class="cpm-table-row"
            >
              <div class="cpm-table-row__left">
                <div class="cpm-table-row__icon-wrap">
                  <PulseIcon
                    icon="document"
                    override-colour="var(--pulse-color-primary-90)"
                  />
                </div>
                <span class="cpm-table-row__name">{{ row.name }}</span>
              </div>
              <div class="cpm-table-row__arrow">
                <PulseIcon
                  icon="continue"
                  colour="neutral"
                />
              </div>
              <div class="cpm-table-row__progress">
                <PulseProgressBar
                  :value="row.progress"
                  :completed="row.progress === 100"
                />
              </div>
              <div class="cpm-table-row__select">
                <PulseSelect
                  :input-id="`mapping-${row.id}`"
                  label=""
                  :options="sectionSelectOptions"
                  :model-value="getMapping(row.id)"
                  placeholder="Select a section"
                  @update:model-value="setMapping(row.id, $event)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cpm-shell {
  display: flex;
  flex-direction: column;
  background-color: var(--pulse-color-neutral-30);
  min-height: 100vh;
  font-family: Inter, sans-serif;
}

/* ── Info bar ── */
.cpm-infobar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: #fff;
  box-shadow: 0 1px 1.5px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  margin: 4px;
}

.cpm-infobar__resident {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cpm-infobar__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--pulse-color-neutral-40);
  overflow: hidden;
}

.cpm-infobar__name {
  font-size: var(--pulse-font-size-body-small, 16px);
  font-weight: 500;
  color: var(--pulse-color-primary-100);
}

.cpm-infobar__care-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--pulse-color-neutral-120);
}

.cpm-infobar__care-tag:nth-child(3) {
  background: #e0f2fe;
  color: #0369a1;
}

.cpm-infobar__care-tag:nth-child(4) {
  background: #f2eef9;
  color: #9879ce;
}

/* ── Wizard step panel ── */
.cpm-wizard {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 1.5px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  padding: 4px 8px;
  margin: 4px;
}

.cpm-wizard__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cpm-wizard__step-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--pulse-color-neutral-120);
  margin: 0;
}

.cpm-wizard__heading-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cpm-wizard__title {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-primary-100);
  margin: 0;
}

.cpm-wizard__description {
  font-size: 14px;
  color: var(--pulse-color-neutral-120);
  margin: 0;
}

.cpm-wizard__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 4px;
  padding-bottom: 8px;
}

.cpm-wizard__status-text {
  font-size: 14px;
}

.cpm-wizard__status-text--success {
  color: var(--pulse-color-success-70);
}

.cpm-wizard__status-text--warning {
  color: var(--pulse-color-neutral-110);
}

.cpm-wizard__actions {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding-bottom: 8px;
}

/* ── Main content ── */
.cpm-content {
  display: flex;
  gap: 16px;
  padding: 16px;
  align-items: flex-start;
  flex: 1;
}

/* ── Left navigation ── */
.cpm-nav {
  width: 274px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cpm-nav__title {
  font-size: 18px;
  font-weight: 500;
  color: var(--pulse-color-primary-110);
  margin: 0;
  padding: 12px 0;
  min-height: 48px;
  display: flex;
  align-items: center;
}

.cpm-nav__panel {
  background: #fff;
  border: 1px solid var(--pulse-color-neutral-50);
  border-radius: 9px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cpm-nav__panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  padding-bottom: 0;
}

.cpm-nav__sections-label {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-primary-110);
}

.cpm-nav__divider {
  height: 1px;
  background: var(--pulse-color-neutral-30);
  margin: 8px 0;
}

.cpm-nav__list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cpm-nav__item {
  background: #fff;
  border: 1px solid var(--pulse-color-neutral-50);
  border-radius: 9px;
  padding: 4px 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.cpm-nav__item--active {
  background: var(--pulse-color-primary-10);
}

.cpm-nav__item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cpm-nav__item-name {
  font-size: 16px;
  color: var(--pulse-color-primary-90);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.cpm-nav__item-name--active {
  color: var(--pulse-color-primary-120);
}

.cpm-nav__item-name--muted {
  color: var(--pulse-color-primary-100);
}

.cpm-nav__item-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 25px;
}

.cpm-nav__item-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--pulse-color-neutral-100);
}

.cpm-nav__item-count--muted {
  color: var(--pulse-color-neutral-90);
}

/* ── Tables ── */
.cpm-tables {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.cpm-table-group {
  display: flex;
  flex-direction: column;
}

.cpm-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  font-size: 18px;
  font-weight: 500;
  color: var(--pulse-color-primary-110);
  border-bottom: none;
}

.cpm-table-header__title {
  flex: 1;
}

.cpm-table-header__cols {
  display: flex;
  gap: 0;
  align-items: center;
}

.cpm-table-header__col {
  font-size: 18px;
  font-weight: 500;
  color: var(--pulse-color-primary-110);
  text-align: left;
}

.cpm-table-header__col--wide {
  width: 281px;
  margin-left: 80px;
}

.cpm-table-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cpm-table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid var(--pulse-color-neutral-50);
  border-radius: 9px;
  padding: 8px;
  height: 80px;
}

.cpm-table-row__left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.cpm-table-row__icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 100px;
  background: #cdebfa;
  flex-shrink: 0;
}

.cpm-table-row__name {
  font-size: 16px;
  font-weight: 500;
  color: var(--pulse-color-primary-100);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cpm-table-row__arrow {
  display: flex;
  align-items: center;
  padding: 0 16px;
  flex-shrink: 0;
}

.cpm-table-row__progress {
  width: 114px;
  flex-shrink: 0;
}

.cpm-table-row__select {
  width: 275px;
  flex-shrink: 0;
}
</style>
