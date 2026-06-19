import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import CarePlanHome from './CarePlanHome.vue'
import type { CarePlanHomeProps } from './CarePlanHome.types'

export default {
  title: 'Components/CarePlanHome',
  component: CarePlanHome,
} as Meta<typeof CarePlanHome>

// ── Shared prototype data ──────────────────────────────────────────────────

const prototypeArgs: CarePlanHomeProps = {
  patientName: 'Isabel Hill',
  patientAge: '82 Years old',
  patientTags: [{ value: 'Nursing', colour: 'lapis' }],

  sidebarQuickLinks: [
    { id: 'recommendations', label: 'Recommendations', badge: 3 },
    { id: 'archived', label: 'Archived', badge: 18 },
    { id: 'image-gallery', label: 'Image Gallery', badge: 2 },
  ],

  sidebarDomains: [
    { id: 'behaviour', label: 'Behaviour' },
    { id: 'cognition', label: 'Cognition and Mental Capacity' },
    { id: 'continence', label: 'Continence' },
    { id: 'cultural', label: 'Cultural, Religious & Spiritual' },
    { id: 'daily-living', label: 'Daily Living and Environment' },
    { id: 'education', label: 'Education & Employment' },
    {
      id: 'food-allergies',
      label: 'Food Allergies',
      children: [
        { id: 'diet-need', label: 'Diet Need' },
        { id: 'enteral-feeding', label: 'Enteral Feeding' },
        { id: 'weight-management', label: 'Weight Management' },
      ],
    },
    { id: 'medication', label: 'Medication and Healthcare' },
    { id: 'mental-health', label: 'Mental Health' },
    { id: 'mobility', label: 'Mobility and Physical' },
    { id: 'nutrition', label: 'Nutrition and Hydration' },
    { id: 'skin-integrity', label: 'Skin Integrity' },
    { id: 'sleep', label: 'Sleep And Rest' },
    { id: 'social', label: 'Social, Community and Recreation' },
    { id: 'ltc', label: 'Specific LTC' },
  ],

  recentlyUpdated: [
    {
      id: 'ru-1',
      title: 'Infection prevention',
      category: 'Medication and healthcare',
      description: 'New interaction linked',
    },
    {
      id: 'ru-2',
      title: 'Weight management',
      category: 'Medication and healthcare',
      description: 'Planned outcome altered',
    },
    {
      id: 'ru-3',
      title: 'Pressure injury prevention',
      category: 'Medication and healthcare',
      description: 'New need added',
    },
    {
      id: 'ru-4',
      title: 'Pain Management',
      category: 'Medication and healthcare',
      description: 'Interaction removed',
    },
    {
      id: 'ru-5',
      title: 'Oral hygiene',
      category: 'Daily Living and Environment',
      description: 'New interaction linked',
    },
  ],

  adminItems: [
    {
      id: 'archived',
      title: 'Archived',
      description: 'Manage archived Sections, Careplans and needs',
      icon: 'archive',
      iconBg: 'var(--pulse-color-primary-20)',
      stats: [
        { count: 13, label: 'Sections' },
        { count: 14, label: 'Pages' },
        { count: 14, label: 'Needs' },
      ],
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      description: 'Review and act on care recommendations from the clinical team.',
      icon: 'sparkle',
      iconBg: 'var(--pulse-color-primary-20)',
      stats: [
        { count: 3, label: 'Added' },
        { count: 1, label: 'Removed' },
        { count: 2, label: 'Modified' },
      ],
    },
  ],

  careDomains: [
    {
      id: 'behaviour',
      title: 'Behaviour',
      description:
        'Relates to behavioural patterns with proactive strategies that promote safety.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 4, label: 'Needs' },
        { count: 2, label: 'Logs' },
        { count: 3, label: 'Documents' },
      ],
    },
    {
      id: 'food-nutrition',
      title: 'Food and Nutrition',
      description:
        'Nutritional planning, allergy management, and assistance with meal preparation to promote autonomy and health.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 7, label: 'Needs' },
        { count: 11, label: 'Logs' },
        { count: 4, label: 'Documents' },
      ],
    },
    {
      id: 'cognition',
      title: 'Cognition and Mental Capacity',
      description:
        'Supports residents in therapeutic activities to promote cognitive resilience.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 5, label: 'Needs' },
        { count: 8, label: 'Logs' },
        { count: 2, label: 'Documents' },
      ],
    },
    {
      id: 'cultural',
      title: 'Cultural, Religious and Spiritual',
      description:
        'Respects and supports individual values, beliefs, needs, and daily activities to foster independence and wellbeing.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 2, label: 'Needs' },
        { count: 3, label: 'Logs' },
        { count: 1, label: 'Documents' },
      ],
    },
    {
      id: 'daily-living',
      title: 'Daily Living and Environment',
      description:
        'Covers all personal care, hygiene, dressing, and environmental adaptations to maintain daily living skills and dignity.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 9, label: 'Needs' },
        { count: 15, label: 'Logs' },
        { count: 6, label: 'Documents' },
      ],
    },
    {
      id: 'education',
      title: 'Education & Employment',
      description:
        'Facilitates access to educational opportunities, vocational activities, and social participation to foster independence.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 1, label: 'Needs' },
        { count: 0, label: 'Logs' },
        { count: 1, label: 'Documents' },
      ],
    },
  ],
}

// ── Stories ────────────────────────────────────────────────────────────────

export const Prototype: StoryFn<typeof CarePlanHome> = () => ({
  components: { CarePlanHome },
  setup() {
    const avatarUrl = ref<string | undefined>(undefined)
    function onAvatarChange(url: string) {
      avatarUrl.value = url
    }
    return { prototypeArgs, avatarUrl, onAvatarChange }
  },
  template: `
    <CarePlanHome
      v-bind="prototypeArgs"
      :patient-avatar-url="avatarUrl"
      @avatar-change="onAvatarChange"
      @search="q => console.log('search:', q)"
      @domain-click="id => console.log('domain:', id)"
      @admin-item-click="id => console.log('admin:', id)"
      @sidebar-item-click="id => console.log('sidebar:', id)"
    />
  `,
})

Prototype.parameters = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'Full-page prototype matching the Figma design. Click the avatar circle to upload a photo from your desktop. Use the sidebar to navigate care domains.',
    },
  },
}

// Legacy simple story kept for docs
const Template: StoryFn<typeof CarePlanHome> = (args: CarePlanHomeProps) => ({
  components: { CarePlanHome },
  setup() {
    return { args }
  },
  template: `<CarePlanHome v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {
  patientName: 'Darah Joy',
  patientAge: '22 Years old',
  patientTags: [{ value: 'Nursing', colour: 'lapis' }],
  recentlyUpdated: [
    { id: '1', title: 'Infection prevention', category: 'Medication and healthcare', description: 'New interaction linked' },
    { id: '2', title: 'Weight management', category: 'Medication and healthcare', description: 'Planned outcome altered' },
    { id: '3', title: 'Pressure injury prevention', category: 'Medication and healthcare', description: 'New need added' },
    { id: '4', title: 'Pain Management', category: 'Medication and healthcare', description: 'Interaction removed' },
    { id: '5', title: 'Pain Management', category: 'Medication and healthcare', description: 'New interaction linked' },
  ],
  adminItems: [
    {
      id: 'archived',
      title: 'Archived',
      description: 'Manage archived Sections, Careplans and needs',
      iconBg: 'var(--pulse-color-primary-20)',
      stats: [
        { count: 13, label: 'Sections' },
        { count: 14, label: 'Pages' },
        { count: 14, label: 'Needs' },
      ],
    },
    {
      id: 'recommendations',
      title: 'Recommendations',
      description: 'This is description of what this interaction does and how it should be used.',
      iconBg: 'var(--pulse-color-primary-20)',
      stats: [
        { count: 13, label: 'Added' },
        { count: 14, label: 'Removed' },
        { count: 14, label: 'Modified' },
      ],
    },
  ],
  careDomains: [
    {
      id: 'nutrition',
      title: 'Nutrition & Hydration',
      description: 'Covers nutritional planning, allergy management, and assistance with meal preparation to promote autonomy and health.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 13, label: 'Needs' },
        { count: 14, label: 'Logs' },
        { count: 14, label: 'Documents' },
      ],
    },
    {
      id: 'infection',
      title: 'Infection Prevention',
      description: 'Strategies to prevent the spread of infection and maintain hygiene standards.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 8, label: 'Needs' },
        { count: 12, label: 'Logs' },
        { count: 5, label: 'Documents' },
      ],
    },
    {
      id: 'pain',
      title: 'Pain Management',
      description: 'Assessment and management of pain to maximise comfort and wellbeing.',
      iconBg: 'var(--pulse-color-care-delivery-1)',
      stats: [
        { count: 6, label: 'Needs' },
        { count: 9, label: 'Logs' },
        { count: 3, label: 'Documents' },
      ],
    },
  ],
}
