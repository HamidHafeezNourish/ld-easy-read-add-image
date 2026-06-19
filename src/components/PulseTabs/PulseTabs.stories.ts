import PulseTabs from './PulseTabs.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

type PulseTabsArgs = {
  items: Array<{
    label: string
    key: string
  }>
  modelValue: string
}

export default {
  title: 'Components/Panel/Tabs',
  component: PulseTabs,
  argTypes: {
    items: [],
  },
} satisfies Meta<typeof PulseTabs>

const Template: StoryFn<typeof PulseTabs> = (args: Partial<PulseTabsArgs>) => ({
  components: { PulseTabs },
  setup() {
    return { args }
  },
  template: `
    <PulseTabs v-bind="args" v-model="args.modelValue" >
    </PulseTabs>

    <p>Selected Tab is: {{ args.modelValue }}</p>
  `,
})

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      label: 'Tab 1',
      key: 'tab1',
    },
    {
      label: 'Tab 2',
      key: 'tab2',
    },
    {
      label: 'Tab 3',
      key: 'tab3',
    },
  ],
  modelValue: 'tab1',
}
