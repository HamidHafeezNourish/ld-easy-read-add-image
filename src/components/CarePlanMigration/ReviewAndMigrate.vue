<script setup lang="ts">
import { ref, computed } from 'vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import PulseTag from '../PulseTag/PulseTag.vue'
import PulseCheckbox from '../input/PulseCheckbox/PulseCheckbox.vue'

defineProps<{
  residentName: string
  residentTags?: string[]
}>()

const emit = defineEmits<{
  'save-and-exit': []
  'return': []
  'migrate': []
}>()

const confirmed = ref(false)
const canMigrate = computed(() => confirmed.value)

type NavItem = { label: string; bold?: boolean; expanded?: boolean; isNew?: boolean }

const navItems: NavItem[] = [
  { label: 'Care plan Section', bold: true, expanded: true },
  { label: 'Initial Assessments overview' },
  { label: 'Behaviour' },
  { label: 'Communication' },
  { label: 'Continence' },
  { label: 'Cultural, Religious & Spiritual Identity' },
  { label: 'Daily Living and Environment' },
  { label: 'Education & Employment' },
  { label: 'Medication & Healthcare' },
  { label: 'Mental Health' },
  { label: 'Mobility & Physical' },
  { label: 'Personal Care & Hygiene' },
  { label: 'Sensory' },
  { label: 'Sexuality & Relationships' },
  { label: 'Skin Integrity' },
  { label: 'Sleep & Rest' },
  { label: 'Social, Community & Recreation' },
  { label: 'Specific Diagnoses & LTCs' },
  { label: 'Incidents', bold: true },
  { label: 'Emergency & Hospital', bold: true },
  { label: 'Agreements & Contracts', bold: true },
  { label: 'Other Documentation', bold: true },
  { label: 'Statutory Information', bold: true, isNew: true },
  { label: 'Archived Plans', bold: true },
]
</script>

<template>
  <div class="rmg-shell">
    <!-- Info bar -->
    <div class="rmg-infobar">
      <div class="rmg-infobar__resident">
        <div class="rmg-infobar__avatar" />
        <span class="rmg-infobar__name">{{ residentName }}</span>
        <span
          v-for="tag in residentTags"
          :key="tag"
          class="rmg-infobar__care-tag"
          :class="tag === 'Residential' ? 'rmg-infobar__care-tag--info' : 'rmg-infobar__care-tag--lavender'"
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
    <div class="rmg-wizard">
      <div class="rmg-wizard__info">
        <p class="rmg-wizard__step-label">Step 4 of 4</p>
        <div class="rmg-wizard__heading-group">
          <h2 class="rmg-wizard__title">Review and Migrate</h2>
          <p class="rmg-wizard__description">
            Review the migration summary below and confirm the migration. This action is permanent and will take effect immediately.
          </p>
        </div>
        <div class="rmg-wizard__confirm">
          <PulseCheckbox
            v-model="confirmed"
            input-id="confirm-migration"
            label="I confirm these changes are correct and understand this migration cannot be undone"
          />
        </div>
      </div>
      <div class="rmg-wizard__actions">
        <PulseButton
          label="Return"
          type="secondary"
          @click="emit('return')"
        />
        <PulseButton
          label="Migrate"
          type="primary"
          icon="continue"
          :disabled="!canMigrate"
          @click="emit('migrate')"
        />
      </div>
    </div>

    <!-- Main content -->
    <div class="rmg-content">
      <!-- Summary cards -->
      <div class="rmg-cards">
        <!-- Archived Content card -->
        <div class="rmg-card">
          <div class="rmg-card__header">
            <div>
              <h3 class="rmg-card__title">Archived Content</h3>
              <p class="rmg-card__meta">12 Sections in total</p>
            </div>
          </div>
          <p class="rmg-card__body">
            The current Archived items in this Care Plan has automatically been migrated to the new Care Plans Archived content
          </p>
          <div class="rmg-card__panel">
            <span class="rmg-card__panel-icon rmg-card__panel-icon--archive">⬇</span>
            <span class="rmg-card__panel-label">Migrating Archived</span>
            <PulseTag colour="mulberry" value="Archived 14" />
          </div>
        </div>

        <!-- Section card -->
        <div class="rmg-card">
          <div class="rmg-card__header">
            <div>
              <h3 class="rmg-card__title">Section</h3>
              <p class="rmg-card__meta">12 Sections in total</p>
            </div>
            <PulseButton label="Edit" type="secondary" small @click="() => {}" />
          </div>
          <div class="rmg-card__rows">
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon">≡</span>
              <span class="rmg-card__row-label">Matched Sections</span>
              <PulseTag colour="jade" value="Matched 4" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--new">⊕</span>
              <span class="rmg-card__row-label">New Sections</span>
              <PulseTag colour="lapis" value="New 2" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--merge">⋔</span>
              <span class="rmg-card__row-label">Merged Need</span>
              <PulseTag colour="lavender" value="Renamed 2" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--rename">✎</span>
              <span class="rmg-card__row-label">Renamed Need</span>
              <PulseTag colour="jade" value="Matched 4" />
            </div>
          </div>
        </div>

        <!-- Pages card -->
        <div class="rmg-card">
          <div class="rmg-card__header">
            <div>
              <h3 class="rmg-card__title">Pages</h3>
              <p class="rmg-card__meta">54 Pages in total</p>
            </div>
            <PulseButton label="Edit" type="secondary" small @click="() => {}" />
          </div>
          <div class="rmg-card__rows">
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon">≡</span>
              <span class="rmg-card__row-label">Matched Pages</span>
              <PulseTag colour="jade" value="Matched 4" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--new">⊕</span>
              <span class="rmg-card__row-label">New Page Created</span>
              <PulseTag colour="lapis" value="New 2" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--merge">⋔</span>
              <span class="rmg-card__row-label">Merged Pages</span>
              <PulseTag colour="lavender" value="Renamed 2" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--rename">✎</span>
              <span class="rmg-card__row-label">Renamed Pages</span>
              <PulseTag colour="jade" value="Matched 4" />
            </div>
          </div>
        </div>

        <!-- Needs card -->
        <div class="rmg-card">
          <div class="rmg-card__header">
            <div>
              <h3 class="rmg-card__title">Needs</h3>
              <p class="rmg-card__meta">84 Needs in total</p>
            </div>
            <PulseButton label="Edit" type="secondary" small @click="() => {}" />
          </div>
          <div class="rmg-card__rows">
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon">≡</span>
              <span class="rmg-card__row-label">Matched Need</span>
              <PulseTag colour="jade" value="Matched 4" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--new">⊕</span>
              <span class="rmg-card__row-label">New Need Created</span>
              <PulseTag colour="lapis" value="New 2" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--merge">⋔</span>
              <span class="rmg-card__row-label">Merged Need</span>
              <PulseTag colour="lavender" value="Renamed 2" />
            </div>
            <div class="rmg-card__row">
              <span class="rmg-card__row-icon rmg-card__row-icon--rename">✎</span>
              <span class="rmg-card__row-label">Renamed Need</span>
              <PulseTag colour="jade" value="Matched 4" />
            </div>
          </div>
        </div>
      </div>

      <!-- Preview panel -->
      <aside class="rmg-preview">
        <h3 class="rmg-preview__title">Preview</h3>
        <div class="rmg-preview__tree">
          <div
            v-for="item in navItems"
            :key="item.label"
            class="rmg-preview__item"
            :class="{ 'rmg-preview__item--sub': !item.bold }"
          >
            <span class="rmg-preview__chevron">{{ item.bold ? '∨' : '›' }}</span>
            <span
              class="rmg-preview__label"
              :class="{ 'rmg-preview__label--bold': item.bold }"
            >{{ item.label }}</span>
            <span
              v-if="item.isNew"
              class="rmg-preview__new-badge"
            >New Section</span>
          </div>
        </div>
        <div class="rmg-preview__archived">
          <span class="rmg-preview__archived-icon">⬇</span>
          <span>Archived Plans</span>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.rmg-shell {
  display: flex;
  flex-direction: column;
  background-color: var(--pulse-color-neutral-30);
  min-height: 100vh;
  font-family: Inter, sans-serif;
}

/* ── Info bar ── */
.rmg-infobar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: #fff;
  box-shadow: 0 1px 1.5px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.1);
  border-radius: 9px;
  margin: 4px;
}

.rmg-infobar__resident {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rmg-infobar__avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--pulse-color-neutral-40);
}

.rmg-infobar__name {
  font-size: 16px;
  font-weight: 500;
  color: var(--pulse-color-primary-100);
}

.rmg-infobar__care-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.rmg-infobar__care-tag--info {
  background: #e0f2fe;
  color: #0369a1;
}

.rmg-infobar__care-tag--lavender {
  background: #f2eef9;
  color: #9879ce;
}

/* ── Wizard ── */
.rmg-wizard {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 1.5px rgba(0,0,0,0.1), 0 1px 1px rgba(0,0,0,0.1);
  border-radius: 9px;
  padding: 8px;
  margin: 4px;
}

.rmg-wizard__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rmg-wizard__step-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--pulse-color-neutral-120);
  margin: 0;
}

.rmg-wizard__heading-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rmg-wizard__title {
  font-family: 'FS Me', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-primary-100);
  margin: 0;
}

.rmg-wizard__description {
  font-size: 12px;
  font-weight: 500;
  color: var(--pulse-color-neutral-120);
  margin: 0;
  max-width: 700px;
}

.rmg-wizard__confirm {
  padding-top: 8px;
}

.rmg-wizard__actions {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding-bottom: 4px;
}

/* ── Main content ── */
.rmg-content {
  display: flex;
  gap: 16px;
  padding: 16px;
  align-items: flex-start;
  flex: 1;
}

/* ── Summary cards ── */
.rmg-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.rmg-card {
  background: #fff;
  border-radius: 9px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rmg-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.rmg-card__title {
  font-size: 20px;
  font-weight: 500;
  color: var(--pulse-color-primary-100);
  margin: 0;
}

.rmg-card__meta {
  font-size: 12px;
  font-weight: 500;
  color: var(--pulse-color-neutral-100);
  margin: 4px 0 0;
}

.rmg-card__body {
  font-size: 18px;
  color: var(--pulse-color-neutral-120);
  line-height: 1.4;
  margin: 0;
}

.rmg-card__panel {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px;
  border: 1px solid var(--pulse-color-neutral-30);
  border-radius: 9px;
}

.rmg-card__panel-label {
  flex: 1;
  font-size: 18px;
  color: var(--pulse-color-primary-100);
}

.rmg-card__panel-icon {
  font-size: 18px;
  color: var(--pulse-color-neutral-100);
}

.rmg-card__rows {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.rmg-card__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px;
  border: 1px solid var(--pulse-color-neutral-30);
  border-radius: 9px;
}

.rmg-card__row-label {
  flex: 1;
  font-size: 18px;
  color: var(--pulse-color-primary-100);
}

.rmg-card__row-icon {
  width: 16px;
  text-align: center;
  font-size: 14px;
  color: var(--pulse-color-neutral-90);
  flex-shrink: 0;
}

.rmg-card__row-icon--new { color: var(--pulse-color-primary-80); }
.rmg-card__row-icon--merge { color: var(--pulse-color-primary-90); }
.rmg-card__row-icon--rename { color: var(--pulse-color-neutral-100); }

/* ── Preview panel ── */
.rmg-preview {
  width: 320px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 9px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.rmg-preview__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--pulse-color-primary-110);
  margin: 0;
  padding: 20px 18px 14px;
  border-bottom: 1px solid var(--pulse-color-neutral-30);
}

.rmg-preview__tree {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  max-height: 700px;
}

.rmg-preview__item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rmg-preview__item--sub {
  padding-left: 24px;
}

.rmg-preview__chevron {
  font-size: 10px;
  color: var(--pulse-color-neutral-90);
  width: 14px;
  flex-shrink: 0;
}

.rmg-preview__label {
  font-size: 12px;
  color: var(--pulse-color-neutral-120);
}

.rmg-preview__label--bold {
  font-family: 'FS Me', sans-serif;
  font-weight: 700;
}

.rmg-preview__new-badge {
  font-size: 11px;
  color: var(--pulse-color-primary-80);
  font-weight: 600;
  margin-left: 4px;
}

.rmg-preview__archived {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid var(--pulse-color-neutral-30);
  font-size: 12px;
  font-weight: 700;
  color: var(--pulse-color-neutral-120);
}

.rmg-preview__archived-icon {
  font-size: 14px;
}
</style>
