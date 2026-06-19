import PulseKpiCardGroup from './PulseKpiCardGroup.vue'
import PulseKpiCard from '../PulseKpiCard/PulseKpiCard.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/PulseKpiCardGroup/PulseKpiCardGroup',
  component: PulseKpiCardGroup,
} as Meta<typeof PulseKpiCardGroup>

const Template: StoryFn<typeof PulseKpiCardGroup> = () => ({
  components: { PulseKpiCardGroup, PulseKpiCard },
  template: `
    <PulseKpiCardGroup>
      <PulseKpiCard
        title="KPI title"
        subheader="KPI description"
        :value="120"
        units="audits"
        delta-value="+ 12%"
        delta-explainer="difference explainer"
      />
      <PulseKpiCard
        title="KPI title"
        subheader="KPI description"
        :value="120"
        units="audits"
        delta-value="+ 12%"
        delta-explainer="difference explainer"
      />
      <PulseKpiCard
        title="KPI title"
        subheader="KPI description"
        :value="120"
        units="audits"
        delta-value="+ 12%"
        delta-explainer="difference explainer"
      />
    </PulseKpiCardGroup>
  `,
})

export const ThreeCards = Template.bind({})

export const TwoCards: StoryFn<typeof PulseKpiCardGroup> = () => ({
  components: { PulseKpiCardGroup, PulseKpiCard },
  template: `
    <PulseKpiCardGroup>
      <PulseKpiCard
        title="Total audits"
        subheader="This month"
        :value="120"
        units="audits"
        delta-value="+ 12%"
        delta-explainer="vs last month"
      />
      <PulseKpiCard
        title="Completed"
        subheader="This month"
        :value="87"
        units="audits"
        delta-value="+ 3%"
        delta-explainer="vs last month"
      />
    </PulseKpiCardGroup>
  `,
})

export const FourCardsWraps: StoryFn<typeof PulseKpiCardGroup> = () => ({
  components: { PulseKpiCardGroup, PulseKpiCard },
  template: `
    <PulseKpiCardGroup>
      <PulseKpiCard title="Metric A" :value="120" units="audits" />
      <PulseKpiCard title="Metric B" :value="87" units="audits" />
      <PulseKpiCard title="Metric C" :value="43" units="audits" />
      <PulseKpiCard title="Metric D" :value="15" units="audits" />
    </PulseKpiCardGroup>
  `,
})
