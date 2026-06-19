import PulseCompositeCheckbox from './PulseCompositeCheckbox.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Input/PulseCompositeCheckbox',
  component: PulseCompositeCheckbox,
  argTypes: {
    inputId: {
      control: 'text',
      description: 'A unique identifier for the input group, used for accessibility purposes',
    },
    header: {
      control: 'text',
      description: 'The main header text displayed above the checkboxes',
    },
    hint: {
      control: 'text',
      description: 'Additional hint text displayed below the header',
    },
    checkboxHint: {
      control: 'text',
      description: 'Additional hint text displayed for each input field when a checkbox is selected',
    },
    required: {
      control: 'boolean',
      description: 'Whether at least one checkbox must be selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the composite checkbox is disabled',
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
  parameters: {
    docs: {
      description: {
        component:
          'A composite checkbox component for consent collection. When a checkbox is selected, an input field appears for signature confirmation by typing the full name.',
      },
    },
  },
} satisfies Meta<typeof PulseCompositeCheckbox>

const Template: StoryFn<typeof PulseCompositeCheckbox> = (args) => ({
  components: { PulseCompositeCheckbox },
  setup() {
    return { args }
  },
  template: `<PulseCompositeCheckbox v-bind="args" v-model="args.modelValue" />`,
})

/**
 * Default state with required consent.
 */
export const Default = Template.bind({})
Default.args = {
  inputId: 'consent-checkboxes',
  header: 'Who is agreeing to this goal?',
  hint: 'At least one person must be selected',
  checkboxHint: 'Type the full name to sign consent',
  required: true,
  modelValue: [makeCheckboxOption(1, 'Jess Thorley'), makeCheckboxOption(2, 'Representative')],
}

/**
 * Optional consent (not required).
 */
export const Optional = Template.bind({})
Optional.args = {
  inputId: 'consent-checkboxes',
  header: 'Who is agreeing to this goal?',
  hint: 'This consent is optional',
  checkboxHint: 'Type the full name to sign consent',
  required: false,
  modelValue: [
    makeCheckboxOption(1, 'Sarah Johnson'),
    makeCheckboxOption(2, 'Michael Johnson (Guardian)'),
    makeCheckboxOption(3, 'Case Manager'),
    makeCheckboxOption(4, 'Healthcare Provider'),
  ],
}

/**
 * Example with longer names to test layout handling.
 */
export const LongNames = Template.bind({})
LongNames.args = {
  inputId: 'consent-checkboxes',
  header: 'Who is agreeing to this care plan?',
  hint: 'At least one person must be selected',
  checkboxHint: 'Type the full name to sign consent',
  required: true,
  modelValue: [
    makeCheckboxOption(1, 'Alexander Christopher Wellington-Smith', 'consent-checkboxes-1'),
    makeCheckboxOption(2, 'Margaret Elizabeth Thompson-Davies (Power of Attorney)', 'consent-checkboxes-2'),
    makeCheckboxOption(3, 'Dr. Jonathan Michael Richardson (Primary Care Physician)', 'consent-checkboxes-3'),
    makeCheckboxOption(
      4,
      'Funny Parents Put a Funnily Neverending Huge Large Humongous Colossal Massive Name Here',
      'consent-checkboxes-4',
    ),
  ],
}

function makeCheckboxOption(id: number, label: string, inputId?: string) {
  return {
    id,
    label,
    checked: false,
    inputValue: '',
    inputId: inputId || `consent-checkboxes-${id}`,
  }
}

/**
 * Disabled state.
 */
export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'consent-checkboxes-disabled',
  header: 'Who is agreeing to this goal?',
  hint: 'At least one person must be selected',
  checkboxHint: 'Type the full name to sign consent',
  required: true,
  disabled: true,
  modelValue: [makeCheckboxOption(1, 'Jess Thorley'), makeCheckboxOption(2, 'Representative')],
}
