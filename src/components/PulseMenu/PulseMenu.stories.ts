import PulseMenu from './PulseMenu.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

import { iconNames } from '../../iconRegistry'

export default {
  title: 'Components/PulseMenu',
  component: PulseMenu,

  argTypes: {
    icon: {
      control: 'select',
      options: iconNames,
    },
  },
} as Meta<typeof PulseMenu>

const Template: StoryFn<typeof PulseMenu> = (args) => ({
  components: { PulseMenu },
  setup() {
    return { args }
  },
  template: `
    <PulseMenu v-bind="args">
    </PulseMenu>

  `,
})

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      label: 'New',
      icon: 'create',
      command: () => {
        alert('New clicked')
      },
    },
    {
      label: 'Search',
      icon: 'search',
      command: () => {
        alert('Search clicked')
      },
    },
  ],
}

export const FeedbackMenu = Template.bind({})
FeedbackMenu.args = {
  icon: 'thumbs down',
  items: [
    {
      label: 'Why is this suggestion poor?',
      command: () => {
        alert('Why is this suggestion poor? clicked')
      },
    },
    {
      label: 'Inaccurate information',
      command: () => {
        alert('Inaccurate information clicked')
      },
    },
    {
      label: 'Missing context',
      command: () => {
        alert('Missing context clicked')
      },
    },
    {
      label: 'Not relevant to person',
      command: () => {
        alert('Not relevant to person clicked')
      },
    },
    {
      label: 'Duplicate item',
      command: () => {
        alert('Duplicate item clicked')
      },
    },
    {
      label: 'Already addressed',
      command: () => {
        alert('Already addressed clicked')
      },
    },
    {
      label: 'Unclear explanation',
      command: () => {
        alert('Unclear explanation clicked')
      },
    },
    {
      label: 'Other',
      command: () => {
        alert('Other clicked')
      },
    },
  ],
}
