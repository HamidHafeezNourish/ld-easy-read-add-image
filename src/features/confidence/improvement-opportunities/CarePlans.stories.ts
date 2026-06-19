import PulseTag from '../../../components/PulseTag/PulseTag.vue'
import PulseContainerLayout from '../../../layout/PulseContainerLayout.vue'
import type { StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Features/Confidence/Improvement Opportunities/AI Care Plans',
  component: PulseContainerLayout,
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the container layout',
      defaultValue: 'Container Title',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle of the container layout',
    },
  },
}

export const Default: StoryFn<typeof PulseContainerLayout> = (args) => ({
  components: { PulseContainerLayout, PulseTag },
  setup() {
    return { args }
  },
  template: `
    <PulseContainerLayout v-bind="args">
        <template #header-right>
          <PulseTag iconTitle="sparkle" colour="cont-improv" value="AI Generated" />
        </template>
        <template #content>
          <p class="pulse-text-body-regular">This is the main content of the card. This is the main content of the card. This is the main content of the card. This is the main content of the card. This is the main content of the card. This is the main content of the card.</p>
        </template>
    </PulseContainerLayout>
  `,
})
Default.args = {
  title: 'Max Chen’s Care Plan improvement opportunities',
  subtitle:
    'These improvement opportunities include AI-generated outputs, which may contain errors. Please review all results carefully before use.',
}
