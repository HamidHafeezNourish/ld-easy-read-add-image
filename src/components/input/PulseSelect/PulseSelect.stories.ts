import PulseSelect from './PulseSelect.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Input/PulseSelect',
  component: PulseSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A select dropdown input built on PrimeVue Select. Supports truncation of long selected values; dropdown options wrap within the trigger width.',
      },
    },
  },
  argTypes: {
    inputId: {
      control: 'text',
      description: 'ID for the select input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    label: {
      control: 'text',
      description: 'Label for the select input',
    },
    hint: {
      control: 'text',
      description: 'Hint text for the select input',
    },
    options: {
      control: 'object',
      description: 'Options for the select input (array of strings or objects)',
    },
    optionLabel: {
      control: 'text',
      description: 'Property name to use as label when options are objects',
    },
    optionValue: {
      control: 'text',
      description: 'Property name to use as value when options are objects',
    },
    modelValue: {
      control: 'text',
      description: 'The selected value',
    },
    filter: {
      control: 'boolean',
      description: 'Whether to enable filtering/searching of options',
    },
    emptyFilterMessage: {
      control: 'text',
      description: 'Whether to add a custom empty message when filtering the options',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    truncate: {
      control: 'boolean',
      description:
        'When true, the selected value label is truncated with an ellipsis rather than expanding the component horizontally',
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
} satisfies Meta<typeof PulseSelect>

const Template: StoryFn<typeof PulseSelect> = (args) => ({
  components: { PulseSelect },
  setup() {
    return { args }
  },
  template: '<PulseSelect v-bind="args" v-model="args.modelValue" />',
})

const ConstrainedTemplate: StoryFn<typeof PulseSelect> = (args) => ({
  components: { PulseSelect },
  setup() {
    return { args }
  },
  template: `
    <div style="max-width: 300px; border: 1px dashed #ccc; padding: 8px;">
      <PulseSelect v-bind="args" v-model="args.modelValue" />
    </div>
  `,
})

export const WithObjectOptions = Template.bind({})
WithObjectOptions.args = {
  inputId: 'select-objects',
  placeholder: 'Select a user',
  label: 'User Selection',
  hint: 'Choose a user from the list',
  options: [
    { label: 'John Doe', value: 1 },
    { label: 'Jane Smith', value: 2 },
    { label: 'Bob Johnson', value: 3 },
    { label: 'Alice Williams', value: 4 },
  ],
  optionLabel: 'label',
  optionValue: 'value',
  modelValue: undefined,
  required: true,
}

export const WithObjectOptionsPreselected = Template.bind({})
WithObjectOptionsPreselected.args = {
  inputId: 'select-objects-preselected',
  placeholder: 'Select a country',
  label: 'Country',
  options: [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
  ],
  optionLabel: 'label',
  optionValue: 'value',
  modelValue: 'UK',
}

export const WithNoLabel = Template.bind({})
WithNoLabel.args = {
  inputId: 'select-no-label',
  placeholder: 'Select a filter',
  options: [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Archived', value: 'archived' },
  ],
  optionLabel: 'label',
  optionValue: 'value',
}

export const WithFilter = Template.bind({})
WithFilter.args = {
  inputId: 'select-with-filter',
  placeholder: 'Select a country',
  label: 'Country',
  options: [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
  ],
  optionLabel: 'label',
  optionValue: 'value',
  filter: true,
  emptyFilterMessage: 'Nothing found',
}

export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'select-disabled',
  label: 'Country',
  placeholder: 'Select a country',
  options: [
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Canada', value: 'CA' },
    { label: 'Australia', value: 'AU' },
  ],
  optionLabel: 'label',
  optionValue: 'value',
  disabled: true,
}

export const LongTextTruncation = ConstrainedTemplate.bind({})
LongTextTruncation.storyName = 'Edge: Long Selected Value (Truncation)'
LongTextTruncation.args = {
  inputId: 'select-long-text',
  label: 'Care Worker',
  hint: 'Selected value truncates within the constrained 300px container',
  options: [
    {
      label: 'Alexandra Bartholomew-Henderson (Night Shift Senior)',
      value: 'abh',
    },
    { label: 'Benjamin Featherstone-Clarke (Day Shift Lead)', value: 'bfc' },
    { label: 'Catherine Worthington-Smythe (Deputy Manager)', value: 'cws' },
  ],
  optionLabel: 'label',
  optionValue: 'value',
  modelValue: 'abh',
  truncate: true,
  fullWidth: true,
}

export const WrappingDropdownOptions = ConstrainedTemplate.bind({})
WrappingDropdownOptions.storyName = 'Edge: Long Option Labels (Dropdown Wrapping)'
WrappingDropdownOptions.args = {
  inputId: 'select-wrapping-options',
  label: 'Condition',
  placeholder: 'Select a condition',
  hint: 'Open the dropdown — options wrap within the trigger width',
  options: [
    {
      label: 'Chronic obstructive pulmonary disease (COPD) — moderate severity',
      value: 'copd',
    },
    {
      label: 'Type 2 diabetes mellitus with peripheral neuropathy',
      value: 't2dm',
    },
    {
      label: "Moderate to severe Alzheimer's disease with behavioural symptoms",
      value: 'alz',
    },
    { label: 'Hypertension (primary, essential)', value: 'htn' },
  ],
  optionLabel: 'label',
  optionValue: 'value',
  modelValue: undefined,
  truncate: true,
  fullWidth: true,
}
