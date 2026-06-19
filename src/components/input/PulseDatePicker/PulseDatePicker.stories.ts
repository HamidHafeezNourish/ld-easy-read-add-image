import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

import PulseDatePicker from './PulseDatePicker.vue'
import type { PulseDatePickerValue } from './PulseDatePicker.types'

export default {
  title: 'Components/Input/PulseDatePicker',
  component: PulseDatePicker,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the date picker',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below the label',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'range', 'multiple'],
      description: "Change selection mode from the default 'single' to 'range' or 'multiple'",
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
    numberOfMonths: {
      control: { type: 'number' },
      description: 'Number of months to display in the calendar panel',
    },
    timeMode: {
      control: { type: 'select' },
      options: ['date', 'datetime', 'time'],
      description: 'Changes time mode to select only date, date and time or only time',
    },
    dateFormat: {
      control: { type: 'select' },
      options: [
        'dd/mm/yy',
        'd M yy', // pulse design system preferred format
      ],
      description: 'Date formats to use for displaying dates',
    },
  },
} satisfies Meta<typeof PulseDatePicker>

const Template: StoryFn<typeof PulseDatePicker> = (args) => ({
  components: { PulseDatePicker },
  setup() {
    const value = ref<PulseDatePickerValue>(null)
    return { args, value }
  },
  template: '<PulseDatePicker v-bind="args" v-model="value" />',
})

export const Default = Template.bind({})
Default.args = {
  inputId: 'date-default',
  label: 'Date of Birth',
  placeholder: 'Select date',
}

export const WithHint = Template.bind({})
WithHint.args = {
  inputId: 'date-hint',
  label: 'Appointment Date',
  placeholder: 'Choose a date',
  hint: 'Select your preferred appointment date',
}

export const Required = Template.bind({})
Required.args = {
  inputId: 'date-required',
  label: 'Start Date',
  placeholder: 'Select start date',
  required: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'date-disabled',
  label: 'Date of Birth',
  placeholder: 'Select date',
  disabled: true,
}

export const Range = Template.bind({})
Range.args = {
  inputId: 'date-range',
  label: 'Date Range',
  placeholder: 'Select date range',
  selectionMode: 'range',
}

export const RangeDualMonth = Template.bind({})
RangeDualMonth.args = {
  inputId: 'date-range-dual',
  label: 'Date Range',
  placeholder: 'Select date range',
  selectionMode: 'range',
  numberOfMonths: 2,
}

export const WithTime = Template.bind({})
WithTime.args = {
  inputId: 'date-with-time',
  label: 'Date and Time',
  placeholder: 'Select Date and Time',
  timeMode: 'datetime',
}

export const OnlyTime = Template.bind({})
OnlyTime.args = {
  inputId: 'date-only-time',
  label: 'Only Time',
  placeholder: 'Select Time',
  timeMode: 'time',
}
