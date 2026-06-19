import PulseContainerLayout from './PulseContainerLayout.vue'
import type { StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Layout/PulseContainerLayout',
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

const Template: StoryFn<typeof PulseContainerLayout> = (args) => ({
  components: { PulseContainerLayout },
  setup() {
    return { args }
  },
  template: `
    <PulseContainerLayout v-bind="args">
        <template #header-right>
          Right header
        </template>
        <template #content>
          <p class="pulse-text-body-regular">This is the main content of the card. This is the main content of the card. This is the main content of the card. This is the main content of the card. This is the main content of the card. This is the main content of the card.</p>
        </template>
    </PulseContainerLayout>
  `,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Container Title',
}
