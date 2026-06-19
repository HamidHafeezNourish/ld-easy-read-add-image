import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

import PulseCheckboxGroup from './PulseCheckboxGroup.vue'
import type { PulseCheckboxGroupOptions } from './PulseCheckboxGroup.types'

const options: PulseCheckboxGroupOptions = [
  { inputId: 'option-1', label: 'Option 1' },
  { inputId: 'option-2', label: 'Option 2' },
  { inputId: 'option-3', label: 'Option 3' },
]

export default {
  title: 'Components/Input/PulseCheckboxGroup',
  component: PulseCheckboxGroup,
  argTypes: {
    inputId: {
      control: 'text',
      description: 'A unique identifier for the group, used for accessibility',
    },
    label: {
      control: 'text',
      description: 'Group label displayed above the checkboxes',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below the label',
    },
    required: {
      control: 'boolean',
      description: 'Whether at least one selection is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all checkboxes in the group are disabled',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox group component that renders multiple selectable checkboxes under a single group label. The v-model is an array of selected option IDs.',
      },
    },
  },
} satisfies Meta<typeof PulseCheckboxGroup>

const Template: StoryFn<typeof PulseCheckboxGroup> = (args) => ({
  components: { PulseCheckboxGroup },
  setup() {
    const selected = ref(args.modelValue ?? [])
    return { args, selected }
  },
  template: '<PulseCheckboxGroup v-bind="args" v-model="selected" />',
})

/** All unchecked */
export const Default = Template.bind({})
Default.args = {
  inputId: 'checkbox-group-default',
  label: 'Checkbox Group Label',
  labelIcon: 'target',
  options,
}

/** Pre-selected options */
export const WithPreselected = Template.bind({})
WithPreselected.args = {
  inputId: 'checkbox-group-preselected',
  label: 'Select options',
  options,
  modelValue: ['option-1', 'option-3'],
}

/** With hint text */
export const WithHint = Template.bind({})
WithHint.args = {
  inputId: 'checkbox-group-hint',
  label: 'Select your interests',
  hint: 'Select all that apply',
  options,
}

/** Required group */
export const Required = Template.bind({})
Required.args = {
  inputId: 'checkbox-group-required',
  label: 'Select at least one option',
  required: true,
  options,
}

/** Fully disabled */
export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'checkbox-group-disabled',
  label: 'Select options',
  disabled: true,
  options,
  modelValue: ['option-2'],
}

/** One option individually disabled */
export const PartiallyDisabled = Template.bind({})
PartiallyDisabled.args = {
  inputId: 'checkbox-group-partial',
  label: 'Select options',
  hint: 'Option 2 is not available',
  options: [
    { inputId: 'option-1', label: 'Option 1' },
    { inputId: 'option-2', label: 'Option 2 (unavailable)', disabled: true },
    { inputId: 'option-3', label: 'Option 3' },
  ],
}
