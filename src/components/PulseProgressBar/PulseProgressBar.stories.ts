import PulseProgressBar from './PulseProgressBar.vue'

import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/PulseProgressBar',
  component: PulseProgressBar,
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
  },
} as Meta<typeof PulseProgressBar>

const Template: StoryFn<typeof PulseProgressBar> = (args) => ({
  components: { PulseProgressBar },
  setup() {
    return { args }
  },
  template: `
    <PulseProgressBar v-bind="args">
    </PulseProgressBar>
  `,
})

export const Default = Template.bind({})
Default.args = {
  value: 75,
}

export const Completed = Template.bind({})
Completed.args = {
  value: 100,
  completed: true,
}
