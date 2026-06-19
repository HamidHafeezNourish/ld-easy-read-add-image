<script setup lang="ts">
import { ref } from 'vue'
import PulseDrawer from '@/components/PulseDrawer/PulseDrawer.vue'
import PulseButton from '@/components/PulseButton/PulseButton.vue'

const emit = defineEmits<{
  close: []
  generate: [selectedIds: string[]]
}>()

interface SubItem {
  id: string
  label: string
  checked: boolean
}

interface DomainItem {
  id: string
  label: string
  checked: boolean
  expanded: boolean
  subItems?: SubItem[]
}

const sectionExpanded = ref(true)

const domains = ref<DomainItem[]>([
  { id: 'behaviour', label: 'Behaviour', checked: false, expanded: false },
  { id: 'cognition', label: 'Cognition and Mental Capacity', checked: false, expanded: false },
  { id: 'communication', label: 'Communication', checked: false, expanded: false },
  { id: 'continence', label: 'Continence', checked: false, expanded: false },
  { id: 'cultural', label: 'Cultural, Religious & Spiritual Identity', checked: false, expanded: false },
  { id: 'daily-living', label: 'Daily Living and Environment', checked: false, expanded: false },
  { id: 'education', label: 'Education & Employment', checked: false, expanded: false },
  {
    id: 'medication',
    label: 'Medication & Healthcare',
    checked: false,
    expanded: true,
    subItems: [
      { id: 'medication-asthma', label: 'Asthma care', checked: true },
      { id: 'medication-arthritis', label: 'Arthritis care', checked: true },
    ],
  },
  { id: 'mental-health', label: 'Mental Health', checked: true, expanded: false },
  { id: 'mobility', label: 'Mobility & Physical', checked: false, expanded: false },
  {
    id: 'nutrition',
    label: 'Nutrition & Hydration',
    checked: false,
    expanded: true,
    subItems: [
      { id: 'nutrition-general', label: 'General Nutrition and Hydration', checked: true },
      { id: 'nutrition-dysphagia', label: 'Dysphagia / Swallowing', checked: false },
      { id: 'nutrition-allergies', label: 'Food Allergies', checked: true },
      { id: 'nutrition-enteral', label: 'Enteral Feeding', checked: false },
      { id: 'nutrition-weight', label: 'Weight Management', checked: false },
    ],
  },
  { id: 'personal-care', label: 'Personal Care & Hygiene', checked: false, expanded: false },
  { id: 'sensory', label: 'Sensory', checked: false, expanded: false },
  { id: 'sexuality', label: 'Sexuality & Relationships', checked: true, expanded: false },
  { id: 'skin', label: 'Skin Integrity', checked: false, expanded: false },
  { id: 'sleep', label: 'Sleep & Rest', checked: false, expanded: false },
  { id: 'social', label: 'Social, Community & Recreation', checked: false, expanded: false },
])

function toggleDomain(domain: DomainItem) {
  domain.expanded = !domain.expanded
}

function toggleSectionExpand() {
  sectionExpanded.value = !sectionExpanded.value
}

function onGenerate() {
  const selected: string[] = []
  domains.value.forEach(d => {
    if (d.checked) selected.push(d.id)
    d.subItems?.forEach(s => { if (s.checked) selected.push(s.id) })
  })
  emit('generate', selected)
  emit('close')
}
</script>

<template>
  <PulseDrawer
    :visible="true"
    position="right"
    title="Generate Easy Read"
    @update:visible="(v) => { if (!v) emit('close') }"
  >
    <div class="erp__body">
      <p class="erp__subtitle">Select pages you want to export for easy read version</p>

      <div class="erp__list">
        <!-- Care plan Section (root) -->
        <div class="erp__row erp__row--parent">
          <button class="erp__chevron" @click="toggleSectionExpand">
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              :style="{ transform: sectionExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }"
              style="transition: transform 0.15s"
            >
              <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <span class="erp__row-label erp__row-label--parent">Care plan Section</span>
          <label class="erp__checkbox-wrap">
            <input type="checkbox" class="erp__checkbox" />
          </label>
        </div>

        <!-- Domain items -->
        <template v-if="sectionExpanded">
          <template v-for="domain in domains" :key="domain.id">
            <!-- Domain row -->
            <div class="erp__row erp__row--domain">
              <button
                class="erp__chevron"
                :class="{ 'erp__chevron--hidden': !domain.subItems?.length }"
                @click="domain.subItems?.length && toggleDomain(domain)"
              >
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  :style="{ transform: domain.expanded ? 'rotate(90deg)' : 'rotate(0deg)' }"
                  style="transition: transform 0.15s"
                >
                  <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <span class="erp__row-label">{{ domain.label }}</span>
              <label class="erp__checkbox-wrap">
                <input v-model="domain.checked" type="checkbox" class="erp__checkbox" />
                <span v-if="domain.checked" class="erp__check-icon">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#2b5656" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
              </label>
            </div>

            <!-- Sub-items -->
            <template v-if="domain.expanded && domain.subItems">
              <div
                v-for="sub in domain.subItems"
                :key="sub.id"
                class="erp__row erp__row--sub"
              >
                <span class="erp__dot" />
                <span class="erp__row-label erp__row-label--sub">{{ sub.label }}</span>
                <label class="erp__checkbox-wrap">
                  <input v-model="sub.checked" type="checkbox" class="erp__checkbox" />
                  <span v-if="sub.checked" class="erp__check-icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#2b5656" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </span>
                </label>
              </div>
            </template>
          </template>
        </template>
      </div>
    </div>

    <!-- Footer -->
    <div class="erp__footer">
      <PulseButton
        label="Cancel"
        type="secondary"
        :full-width="true"
        @click="emit('close')"
      />
      <PulseButton
        label="Generate"
        type="primary"
        icon="target"
        :full-width="true"
        @click="onGenerate"
      />
    </div>
  </PulseDrawer>
</template>

<style scoped>
.erp__body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.erp__subtitle {
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #6c727e;
  margin: 0 0 8px;
  padding: 0 0 12px;
  border-bottom: 1px solid var(--pulse-color-neutral-30, #e5e7eb);
}

/* List */
.erp__list {
  flex: 1;
  overflow-y: auto;
}

/* Rows */
.erp__row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 0;
  border-bottom: 1px solid var(--pulse-color-neutral-20, #f3f4f5);
  min-height: 36px;
}

.erp__row--parent {
  padding-left: 0;
}

.erp__row--domain {
  padding-left: 20px;
}

.erp__row--sub {
  padding-left: 60px;
  gap: 8px;
}

/* Chevron */
.erp__chevron {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #6c727e;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 0;
  transition: color 0.1s;
}

.erp__chevron:hover {
  color: #2b5656;
}

.erp__chevron--hidden {
  visibility: hidden;
  cursor: default;
}

/* Dot for sub-items */
.erp__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6c727e;
  flex-shrink: 0;
}

/* Labels */
.erp__row-label {
  flex: 1;
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: #36393f;
  line-height: 1.4;
}

.erp__row-label--parent {
  font-weight: 600;
  color: #36393f;
  font-size: 13px;
}

.erp__row-label--sub {
  font-size: 13px;
  color: #36393f;
}

/* Checkbox */
.erp__checkbox-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: auto;
  cursor: pointer;
}

.erp__checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 17px;
  height: 17px;
  border: 1.5px solid #c0c4cc;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  display: block;
  transition: border-color 0.1s, background 0.1s;
}

.erp__checkbox:checked {
  border-color: #2b5656;
  background: transparent;
}

.erp__check-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Footer */
.erp__footer {
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--pulse-color-neutral-40, #d1d5db);
  flex-shrink: 0;
}
</style>
