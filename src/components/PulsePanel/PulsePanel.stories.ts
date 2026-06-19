import PulsePanel from './PulsePanel.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { PulseStatusTag } from '@/index'

export default {
  title: 'Components/Panel/Panel',
  component: PulsePanel,
} as Meta<typeof PulsePanel>

const Template: StoryFn<typeof PulsePanel> = (args) => ({
  components: { PulsePanel, PulseStatusTag },
  setup() {
    return { args }
  },
  template: `
    <PulsePanel v-bind="args">
      <template #icon><div style="border-radius: 50%; border: dashed 1px red; width: 64px; height: 64px;"/></template>
      <template #topHeader><div style="border: dashed 1px red; width: 100%;"/></template>
      <template #middleHeaderRight><div style="border: dashed 1px red; height: 100%; width: 100%;"/></template>
      <template #bottomHeader><PulseStatusTag status="success" value="Complete" /></template>
      Default Slot Content
    </PulsePanel>
  `,
})

const GoalsTemplate: StoryFn<typeof PulsePanel> = (args) => ({
  components: { PulsePanel, PulseStatusTag },
  setup() {
    return { args }
  },
  template: `
    <PulsePanel v-bind="args">
      <template #middleHeaderRight>
        <PulseStatusTag value="Completed" status="success" />
      </template>
    </PulsePanel>
  `,
})

const MilestonesTemplate: StoryFn<typeof PulsePanel> = (args) => ({
  components: { PulsePanel, PulseStatusTag },
  setup() {
    return { args }
  },
  template: `
    <PulsePanel v-bind="args">
      <template #topHeader>
        <PulseStatusTag value="Not Started" status="greyed" />
      </template>
    </PulsePanel>
  `,
})

const BlankTemplate: StoryFn<typeof PulsePanel> = (args) => ({
  components: { PulsePanel },
  setup() {
    return { args }
  },
  template: `
    <div style="width: 300px">
      <PulsePanel>
        A Blank panel
      </PulsePanel>
    </div>
  `,
})

const DarkBlankTemplate: StoryFn<typeof PulsePanel> = (args) => ({
  components: { PulsePanel },
  setup() {
    return { args }
  },
  template: `
    <div style="width: 300px">
      <PulsePanel dark>
        A Blank panel
      </PulsePanel>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Panel Title',
  caption: 'Panel Caption',
}

export const Goals = GoalsTemplate.bind({})
Goals.args = {
  title: 'Visit the local school to familiarise with the environment',
  caption: 'Last Updated: 25 Jun 2025',
}

export const Milestones = MilestonesTemplate.bind({})
Milestones.args = {
  title: 'Visit the local school to familiarise with the environment',
  caption: 'Start: 11 Jun 2025',
}

export const Blank = BlankTemplate.bind({})

export const DarkBlank = DarkBlankTemplate.bind({})
