import PulseNumberSelectButton from './PulseNumberSelectButton.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Input/PulseNumberSelectButton',
  component: PulseNumberSelectButton,
  argTypes: {
    scale: {
      control: { type: 'select' },
      options: [5, 10],
      description: 'Scale of the rating (1-5 or 1-10)',
    },
    modelValue: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Selected value',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      defaultValue: true,
      description: 'Whether the input should take full width of its container',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      defaultValue: 'medium',
      description: 'Size of the input field',
    },
  },
} satisfies Meta<typeof PulseNumberSelectButton>

const Template: StoryFn<typeof PulseNumberSelectButton> = (args) => ({
  components: { PulseNumberSelectButton },
  setup() {
    return { args }
  },
  template: `<PulseNumberSelectButton v-bind="args" v-model="args.modelValue" />`,
})

export const DefaultScale = Template.bind({})
DefaultScale.args = {
  inputId: 'default-scale',
  scale: 10,
  modelValue: 7,
  label: '{Label}',
  hint: '{1 = Poor, 10 = Excellent}',
  required: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'disabled-scale',
  scale: 10,
  modelValue: 7,
  label: '{Label}',
  hint: '{1 = Poor, 10 = Excellent}',
  disabled: true,
}
