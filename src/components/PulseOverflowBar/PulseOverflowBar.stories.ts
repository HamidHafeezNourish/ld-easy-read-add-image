import PulseOverflowBar from './PulseOverflowBar.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Pagination/PulseOverflowBar',
  component: PulseOverflowBar,
  argTypes: {
    text: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof PulseOverflowBar>

const Template: StoryFn<typeof PulseOverflowBar> = (args) => ({
  components: { PulseOverflowBar },
  setup() {
    return { args }
  },
  template: `
    <PulseOverflowBar v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = {
  text: '+ 3 more Milestones',
}
