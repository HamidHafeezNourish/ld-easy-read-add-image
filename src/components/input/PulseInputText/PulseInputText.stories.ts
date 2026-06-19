import PulseInputText from './PulseInputText.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'

export default {
  title: 'Components/Input/PulseInputText',
  component: PulseInputText,
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below the label',
    },
    icon: {
      control: 'text',
      description: 'Optional leading icon (IconTitle)',
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
      description: 'Whether the input is disabled',
    },
    showClear: {
      control: 'boolean',
      description: 'Whether to show clear button when input has value',
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
} satisfies Meta<typeof PulseInputText>

const Template: StoryFn<typeof PulseInputText> = (args) => ({
  components: { PulseInputText },
  setup() {
    const value = ref('')
    return { args, value }
  },
  template: '<PulseInputText v-bind="args" v-model="value" />',
})

export const Default = Template.bind({})
Default.args = {
  inputId: 'text-default',
  label: 'First Name',
  placeholder: 'Enter your first name',
}

export const Search = Template.bind({})
Search.args = {
  inputId: 'text-search',
  placeholder: 'Search',
  icon: 'search',
}

export const WithHint = Template.bind({})
WithHint.args = {
  inputId: 'text-hint',
  label: 'Email Address',
  placeholder: 'you@example.com',
  hint: 'We will never share your email with anyone else',
}

export const Required = Template.bind({})
Required.args = {
  inputId: 'text-required',
  label: 'Username',
  placeholder: 'Choose a username',
  required: true,
}

export const WithCharacterLimit = Template.bind({})
WithCharacterLimit.args = {
  inputId: 'text-limit',
  label: 'Short Bio',
  placeholder: 'Tell us about yourself',
  hint: 'Keep it brief and interesting',
  maxlength: 100,
}

export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'text-disabled',
  label: 'First Name',
  placeholder: 'Enter your first name',
  disabled: true,
}

export const WithClearButton = Template.bind({})
WithClearButton.args = {
  inputId: 'text-clear',
  label: 'Search',
  placeholder: 'Type to search',
  showClear: true,
}
