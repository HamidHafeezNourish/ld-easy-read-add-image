import type { Meta, StoryFn } from '@storybook/vue3-vite'
import PulseTreeSelect from './PulseTreeSelect.vue'
import type { PulseTreeSelectOptions } from './PulseTreeSelect.types'
import { ref } from 'vue'

const meta: Meta<typeof PulseTreeSelect> = {
  title: 'Components/Input/PulseTreeSelect',
  component: PulseTreeSelect,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description:
        'The list of parent objects to display in the tree. Each object must have a "title" and a "children" property.',
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'checkbox'],
      description: 'Selection mode for the tree select: single, multiple or checkbox',
    },
    filter: {
      control: 'boolean',
      description: 'Whether the TreeSelect filter input is shown',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tree select is disabled',
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
}

export default meta

const n = 5
const sampleData: PulseTreeSelectOptions = []
for (let i = 0; i < n; i++) {
  const goalKey = String(i)
  sampleData.push({
    key: goalKey,
    label: `Goal ${i + 1}`,
    selectable: false,
    children: [
      {
        key: `${goalKey}-0`,
        label: `Milestone 1 for Goal ${i + 1}`,
        selectable: true,
      },
      {
        key: `${goalKey}-1`,
        label: `Milestone 2 for Goal ${i + 1}`,
        selectable: true,
      },
    ],
  })
}

const Template: StoryFn<typeof PulseTreeSelect> = (args) => ({
  components: { PulseTreeSelect },
  setup() {
    const value = ref(args.selectedValues || [])
    return { args, value }
  },
  template: `<PulseTreeSelect v-bind="args" v-model:selectedValues="value"/>`,
})

export const Default = Template.bind({})
Default.args = {
  inputId: 'tree-select-default',
  options: sampleData,
  label: 'Select milestone',
}

export const Empty = Template.bind({})
Empty.args = {
  inputId: 'tree-select-empty',
  options: [],
}
Empty.parameters = {
  docs: {
    description: {
      story: 'Renders the component when no parent objects are provided.',
    },
  },
}

export const Filterable = Template.bind({})
Filterable.args = {
  inputId: 'tree-select-filterable',
  options: sampleData,
  label: 'Filter milestones',
  filter: true,
  selectionMode: 'single',
}
Filterable.parameters = {
  docs: {
    description: {
      story: 'Shows the TreeSelect with filtering enabled.',
    },
  },
}

export const WithPreselected = Template.bind({})
WithPreselected.args = {
  inputId: 'tree-select-preselected',
  label: 'Preselected milestone',
  options: sampleData,
  selectedValues: [sampleData[1].children![0].key],
}
WithPreselected.parameters = {
  docs: {
    description: {
      story: 'Renders the component with a pre-selected child node.',
    },
  },
}

export const Disabled = Template.bind({})
Disabled.args = {
  inputId: 'tree-select-disabled',
  label: 'Preselected milestone',
  options: sampleData,
  selectedValues: [sampleData[1].children![0].key],
  disabled: true,
}
Disabled.parameters = {
  docs: {
    description: {
      story: 'Renders the component with a pre-selected child node.',
    },
  },
}
