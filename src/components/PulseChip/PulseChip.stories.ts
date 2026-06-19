import PulseChip from './PulseChip.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'

export default {
  title: 'Components/Chip',
  component: PulseChip,
  argTypes: {
    label: { control: 'text' },
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof PulseChip>

const Template: StoryFn<typeof PulseChip> = (args) => ({
  components: { PulseChip },
  setup() {
    const selected = ref(args.modelValue)
    return { args, selected }
  },
  template: `
		<div>
			<PulseChip v-bind="args" v-model="selected" />
		</div>
	`,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Active Filter',
  modelValue: true,
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true,
  modelValue: false,
}

export const NotRemovable = Template.bind({})
NotRemovable.args = {
  ...Default.args,
}

export const Deselected = Template.bind({})
Deselected.args = {
  ...Default.args,
  modelValue: false,
}
