<script setup lang="ts">
import { ref, computed } from 'vue'
import CarePlanMigration from '../components/CarePlanMigration/CarePlanMigration.vue'
import ReviewAndMigrate from '../components/CarePlanMigration/ReviewAndMigrate.vue'
import type { NavSection, TableGroup } from '../components/CarePlanMigration/CarePlanMigration.types'

const currentStep = ref<3 | 4>(3)

const sections: NavSection[] = [
  { id: 's1', name: 'Care Plan', pageCount: 33, status: 'unmatched' },
  { id: 's2', name: 'Incidents', pageCount: 33, status: 'unmatched' },
  { id: 's3', name: 'Other Documents', pageCount: 33, status: 'unmatched' },
  { id: 's4', name: 'Care Plan', pageCount: 33, status: 'unmatched' },
  { id: 's5', name: 'Agreements and Contracts', pageCount: 33, status: 'unmatched', active: true },
  { id: 's6', name: 'Treatment Protocols', pageCount: 33, status: 'unmatched' },
  { id: 's7', name: 'Patient Feedback', pageCount: 33, status: 'resolved' },
  { id: 's8', name: 'Compliance Reports', pageCount: 33, status: 'resolved' },
  { id: 's9', name: 'Meetings Minutes', pageCount: 33, status: 'resolved' },
  { id: 's10', name: 'End of Life', pageCount: 33, status: 'resolved' },
]

const allRows = [
  { id: 'r1', name: 'Current Page Name', progress: 85, mappedTo: null },
  { id: 'r2', name: 'Geriatric Nutrition Support', progress: 85, mappedTo: null },
  { id: 'r3', name: 'Pediatric Nutrition Care', progress: 85, mappedTo: null },
  { id: 'r4', name: 'General Nutrition and Hydration Guidelines', progress: 85, mappedTo: null },
  { id: 'r5', name: 'Chronic Disease Nutrition Management', progress: 85, mappedTo: null },
  { id: 'r6', name: 'Mental Health and Wellness Nutrition', progress: 85, mappedTo: null },
  { id: 'r7', name: 'Dysphagia Management Plan', progress: 15, mappedTo: null },
  { id: 'r8', name: 'Dysphagia Management Plan', progress: 15, mappedTo: null },
  { id: 'r9', name: 'Personal Care and Hygiene Needs', progress: 85, mappedTo: null },
  { id: 'r10', name: 'Hygiene and Daily Care Guidelines', progress: 85, mappedTo: null },
  { id: 'r11', name: 'Oral and Swallowing Care Plan', progress: 85, mappedTo: null },
  { id: 'r12', name: 'Chronic Condition Personal Care Management', progress: 85, mappedTo: null },
  { id: 'r13', name: 'Chronic Disease Nutrition Management', progress: 85, mappedTo: null },
  { id: 'r14', name: 'Title of the Need', progress: 85, mappedTo: null },
  { id: 'r15', name: 'Title of the Need', progress: 85, mappedTo: null },
  { id: 'r16', name: 'Title of the Need', progress: 85, mappedTo: null },
]

const tableGroups: TableGroup[] = [
  { id: 'g1', name: 'Nutrition and Hydration Care Plan Legacy', rows: allRows.slice(0, 8) },
  { id: 'g2', name: 'Personal Care and Hygiene', rows: allRows.slice(8, 13) },
  { id: 'g3', name: 'Sensory Page Legacy', rows: allRows.slice(13) },
]

const sectionOptions = [
  'Care Plan',
  'Incidents',
  'Other Documents',
  'Agreements and Contracts',
  'Treatment Protocols',
  'Patient Feedback',
  'Compliance Reports',
  'Meetings Minutes',
  'End of Life',
]

const mappings = ref<Record<string, string | null>>(
  Object.fromEntries(allRows.map((r) => [r.id, r.mappedTo])),
)

const allMapped = computed(() => allRows.every((r) => mappings.value[r.id] !== null))

function handleSaveAndExit() {
  alert('Progress saved.')
}

function handleProceed() {
  if (allMapped.value) currentStep.value = 4
}

function handleReturn() {
  currentStep.value = 3
}

function handleMigrate() {
  alert('Migration complete!')
}
</script>

<template>
  <CarePlanMigration
    v-if="currentStep === 3"
    resident-name="Amy Jenson"
    :resident-tags="['Residential', 'Respite']"
    :step-number="3"
    :total-steps="4"
    step-title="Assign Needs"
    step-description="We've matched each Pages to the confirmed Sections. Please review and confirm so we can continue."
    :sections="sections"
    :table-groups="tableGroups"
    :section-options="sectionOptions"
    :all-mapped="allMapped"
    v-model:mappings="mappings"
    @save-and-exit="handleSaveAndExit"
    @return="() => {}"
    @proceed="handleProceed"
  />

  <ReviewAndMigrate
    v-else-if="currentStep === 4"
    resident-name="Amy Jenson"
    :resident-tags="['Residential', 'Respite']"
    @save-and-exit="handleSaveAndExit"
    @return="handleReturn"
    @migrate="handleMigrate"
  />
</template>
