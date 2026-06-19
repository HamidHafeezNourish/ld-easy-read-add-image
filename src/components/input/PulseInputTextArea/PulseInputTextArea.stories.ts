import PulseInputTextArea from './PulseInputTextArea.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'

export default {
  title: 'Components/Input/PulseInputTextArea',
  component: PulseInputTextArea,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below the label',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum character length with counter',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
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
} satisfies Meta<typeof PulseInputTextArea>

const Template: StoryFn<typeof PulseInputTextArea> = (args) => ({
  components: { PulseInputTextArea },
  setup() {
    const value = ref('')
    return { args, value }
  },
  template: '<PulseInputTextArea v-bind="args" v-model="value" />',
})

export const Default = Template.bind({})
Default.args = {
  inputId: 'textarea-default',
  label: 'Comments',
  placeholder: 'Enter your comments here...',
  rows: 4,
  size: 'small',
}

export const WithHint = Template.bind({})
WithHint.args = {
  inputId: 'textarea-hint',
  label: 'Feedback',
  placeholder: 'Share your thoughts...',
  hint: 'Be as detailed as you like',
  rows: 5,
}

export const Required = Template.bind({})
Required.args = {
  inputId: 'textarea-required',
  label: 'Description',
  placeholder: 'Provide a description',
  required: true,
  rows: 4,
}

export const WithCharacterLimit = Template.bind({})
WithCharacterLimit.args = {
  inputId: 'textarea-limit',
  label: 'Review',
  placeholder: 'Write a brief review',
  hint: 'Maximum 500 characters',
  rows: 6,
  maxlength: 500,
}

export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'textarea-disabled',
  label: 'Comments',
  placeholder: 'Enter your comments here...',
  rows: 4,
  disabled: true,
}
