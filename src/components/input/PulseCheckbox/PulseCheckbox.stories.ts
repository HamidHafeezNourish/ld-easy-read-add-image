import PulseCheckBox from './PulseCheckbox.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Input/PulseCheckBox',
  component: PulseCheckBox,
  argTypes: {
    inputId: {
      control: 'text',
      description: 'A unique identifier for the checkbox, used for label association and accessibility',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state (renders error border colour)',
    },
    modelValue: {
      control: 'boolean',
      description: 'The checked state of the checkbox (v-model)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A standalone checkbox component following the Pulse design system (Figma: Checkbox/Desktop). Supports enabled, hovered, focused, pressed, disabled, and error states. Use v-model to bind the boolean checked value.',
      },
    },
  },
} satisfies Meta<typeof PulseCheckBox>

const Template: StoryFn<typeof PulseCheckBox> = (args) => ({
  components: { PulseCheckBox },
  setup() {
    return { args }
  },
  template: `<PulseCheckBox v-bind="args" v-model="args.modelValue" />`,
})

export const WithLabel = Template.bind({})
WithLabel.args = {
  inputId: 'cb-with-label',
  label: 'Subscribe to newsletter',
  disabled: false,
  invalid: false,
  modelValue: false,
}

/** Unselected – Enabled */
export const UnselectedEnabled = Template.bind({})
UnselectedEnabled.args = {
  inputId: 'cb-unselected-enabled',
  disabled: false,
  invalid: false,
  modelValue: false,
}

/** Selected – Enabled */
export const SelectedEnabled = Template.bind({})
SelectedEnabled.args = {
  inputId: 'cb-selected-enabled',
  disabled: false,
  invalid: false,
  modelValue: true,
}

/** Unselected – Disabled */
export const UnselectedDisabled = Template.bind({})
UnselectedDisabled.args = {
  inputId: 'cb-unselected-disabled',
  disabled: true,
  invalid: false,
  modelValue: false,
}

/** Selected – Disabled */
export const SelectedDisabled = Template.bind({})
SelectedDisabled.args = {
  inputId: 'cb-selected-disabled',
  disabled: true,
  invalid: false,
  modelValue: true,
}

/** Error – Unselected (invalid border #F77321) */
export const ErrorUnselected = Template.bind({})
ErrorUnselected.args = {
  inputId: 'cb-error-unselected',
  disabled: false,
  invalid: true,
  modelValue: false,
}

/** Error – Disabled (resets to disabled style: bg #DBDDE2, border #CFD2D8) */
export const ErrorDisabled = Template.bind({})
ErrorDisabled.args = {
  inputId: 'cb-error-disabled',
  disabled: true,
  invalid: true,
  modelValue: false,
}
