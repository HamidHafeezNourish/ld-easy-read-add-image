import PulseButton from './PulseButton.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

import { iconNames } from '../../iconRegistry'

export default {
  title: 'Components/Button/Button',
  component: PulseButton,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Click me',
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    icon: {
      control: 'select',
      options: iconNames,
    },
    small: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'PulseButton is a wrapper around PrimeVue Button with controlled props and accessibility improvements.',
      },
    },
  },
} satisfies Meta<typeof PulseButton>

const Template: StoryFn<typeof PulseButton> = (args) => ({
  components: { PulseButton },
  setup() {
    const clicked = () => {
      console.log('Pulse Button clicked!')
    }
    return { args, clicked }
  },
  template: `<PulseButton v-bind="args" @click="clicked" />`,
})

export const Primary = Template.bind({})
Primary.args = {
  label: 'Click me',
  disabled: false,
  loading: false,
  type: 'primary',
  icon: 'create',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Click me',
  disabled: false,
  loading: false,
  type: 'secondary',
  icon: 'access',
}
