import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CarePlanMigration from './CarePlanMigration.vue'
import type { NavSection, TableGroup } from './CarePlanMigration.types'

const defaultSections: NavSection[] = [
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

const nutritionRows = [
  { id: 'r1', name: 'Current Page Name', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r2', name: 'Geriatric Nutrition Support', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r3', name: 'Pediatric Nutrition Care', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r4', name: 'General Nutrition and Hydration Guidelines', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r5', name: 'Chronic Disease Nutrition Management', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r6', name: 'Mental Health and Wellness Nutrition', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r7', name: 'Dysphagia Management Plan', progress: 15, mappedTo: 'Care Plan' },
  { id: 'r8', name: 'Dysphagia Management Plan', progress: 15, mappedTo: 'Care Plan' },
]

const personalCareRows = [
  { id: 'r9', name: 'Personal Care and Hygiene Needs', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r10', name: 'Hygiene and Daily Care Guidelines', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r11', name: 'Oral and Swallowing Care Plan', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r12', name: 'Chronic Condition Personal Care Manage...', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r13', name: 'Chronic Disease Nutrition Management', progress: 85, mappedTo: 'Care Plan' },
]

const sensoryRows = [
  { id: 'r14', name: 'Title of the Need', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r15', name: 'Title of the Need', progress: 85, mappedTo: 'Care Plan' },
  { id: 'r16', name: 'Title of the Need', progress: 85, mappedTo: 'Care Plan' },
]

const defaultTableGroups: TableGroup[] = [
  {
    id: 'g1',
    name: 'Nutrition and Hydration Care Plan Legacy',
    rows: nutritionRows,
  },
  {
    id: 'g2',
    name: 'Personal Care and Hygiene',
    rows: personalCareRows,
  },
  {
    id: 'g3',
    name: 'Sensory Page Legacy',
    rows: sensoryRows,
  },
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

export default {
  title: 'Features/CarePlanMigration',
  component: CarePlanMigration,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CarePlanMigration>

const Template: StoryFn<typeof CarePlanMigration> = (args) => ({
  components: { CarePlanMigration },
  setup() {
    const mappings = ref<Record<string, string | null>>(
      Object.fromEntries(
        [...nutritionRows, ...personalCareRows, ...sensoryRows].map((r) => [r.id, r.mappedTo]),
      ),
    )
    return { args, mappings }
  },
  template: `
    <CarePlanMigration
      v-bind="args"
      v-model:mappings="mappings"
      @save-and-exit="() => console.log('save-and-exit')"
      @return="() => console.log('return')"
      @proceed="() => console.log('proceed')"
      @preview="() => console.log('preview')"
    />
  `,
})

export const WithUnmatched = Template.bind({})
WithUnmatched.args = {
  residentName: 'Amy Jenson',
  residentTags: ['Residential', 'Respite'],
  stepNumber: 3,
  totalSteps: 4,
  stepTitle: 'Assign Needs',
  stepDescription: "We've matched each Pages to the confirmed Sections. Please review and confirm so we can continue.",
  sections: defaultSections,
  tableGroups: defaultTableGroups,
  sectionOptions,
  allMapped: false,
}

export const AllResolved = Template.bind({})
AllResolved.args = {
  ...WithUnmatched.args,
  allMapped: true,
  sections: defaultSections.map((s) => ({ ...s, status: 'resolved' as const })),
}
