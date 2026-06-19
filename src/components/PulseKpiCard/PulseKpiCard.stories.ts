import PulseKpiCard from './PulseKpiCard.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/PulseKpiCard/PulseKpiCard',
  component: PulseKpiCard,
  argTypes: {
    title: { control: 'text' },
    subheader: { control: 'text' },
    value: { control: 'text' },
    units: { control: 'text' },
    deltaValue: { control: 'text' },
    deltaExplainer: { control: 'text' },
    deltaDirection: {
      control: 'select',
      options: ['up', 'down'],
    },
    deltaSentiment: {
      control: 'select',
      options: ['positive', 'negative', 'neutral'],
    },
    displaySubheader: { control: 'boolean' },
    displayKpiUnits: { control: 'boolean' },
    displayKpiDelta: { control: 'boolean' },
  },
} as Meta<typeof PulseKpiCard>

const Template: StoryFn<typeof PulseKpiCard> = (args) => ({
  components: { PulseKpiCard },
  setup() {
    return { args }
  },
  template: `
    <PulseKpiCard v-bind="args" />
  `,
})

const baseArgs = {
  title: 'KPI title',
  subheader: 'KPI description',
  value: 120,
  units: 'audits',
  deltaValue: '12%',
  deltaExplainer: 'vs prior 30 days',
  displaySubheader: true,
  displayKpiUnits: true,
  displayKpiDelta: true,
}

export const Default = Template.bind({})
Default.args = {
  ...baseArgs,
  deltaSentiment: 'neutral',
}

export const PositiveUp = Template.bind({})
PositiveUp.args = {
  ...baseArgs,
  deltaSentiment: 'positive',
  deltaDirection: 'up',
}

export const PositiveDown = Template.bind({})
PositiveDown.args = {
  ...baseArgs,
  deltaSentiment: 'positive',
  deltaDirection: 'down',
}

export const NegativeUp = Template.bind({})
NegativeUp.args = {
  ...baseArgs,
  deltaSentiment: 'negative',
  deltaDirection: 'up',
}

export const NegativeDown = Template.bind({})
NegativeDown.args = {
  ...baseArgs,
  deltaSentiment: 'negative',
  deltaDirection: 'down',
}

export const Neutral = Template.bind({})
Neutral.args = {
  ...baseArgs,
  deltaSentiment: 'neutral',
}

export const NoSubheader = Template.bind({})
NoSubheader.args = {
  ...baseArgs,
  deltaSentiment: 'positive',
  deltaDirection: 'up',
  displaySubheader: false,
}

export const NoUnits = Template.bind({})
NoUnits.args = {
  ...baseArgs,
  deltaSentiment: 'positive',
  deltaDirection: 'up',
  displayKpiUnits: false,
}

export const NoDelta = Template.bind({})
NoDelta.args = {
  ...baseArgs,
  displayKpiDelta: false,
}

export const Minimal = Template.bind({})
Minimal.args = {
  ...baseArgs,
  displaySubheader: false,
  displayKpiUnits: false,
  displayKpiDelta: false,
}
