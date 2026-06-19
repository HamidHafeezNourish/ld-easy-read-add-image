import PulseStatusTag from './PulseStatusTag.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { iconNames } from '@/iconRegistry'

export default {
  title: 'Components/PulseTag/PulseStatusTag',
  component: PulseStatusTag,
  argTypes: {
    status: {
      control: 'select',
      options: ['urgency', 'error', 'attention', 'success', 'greyed', 'general'],
    },
    value: {
      control: 'text',
    },
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta<typeof PulseStatusTag>

const Template: StoryFn<typeof PulseStatusTag> = (args) => ({
  components: { PulseTag: PulseStatusTag },
  setup() {
    return { args }
  },
  template: `
    <PulseTag v-bind="args">
    </PulseTag>
  `,
})

export const Default = Template.bind({})
Default.args = {
  status: 'attention',
  value: 'Tag Text',
}
