import vPulseTooltip from './vPulseTooltip'
import PulseButton from '../../components/PulseButton/PulseButton.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Directives/PulseTooltip',
  argTypes: {
    content: {
      control: 'text',
      description: 'The text content of the tooltip',
    },
  },
} as Meta

const Template: StoryFn = (args) => ({
  components: { PulseButton },
  directives: { PulseTooltip: vPulseTooltip },
  setup() {
    return { args }
  },
  template: `
    <div style="padding: 50px; display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <div style="padding: 50px; display: flex; gap: 20px;">
        <PulseButton v-pulse-tooltip.left="{ value: args.content, hideDelay: 100000 }" label="Tooltip Left" />
        <PulseButton v-pulse-tooltip.top="args.content" label="Tooltip Top" />
      </div>

      <div style="padding: 50px; display: flex; gap: 20px;">
        <PulseButton v-pulse-tooltip.bottom="args.content" label="Tooltip Bottom" />
        <PulseButton v-pulse-tooltip="args.content" label="Tooltip Default" />
      </div>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  content: 'This is a pulse tooltip directive',
}
