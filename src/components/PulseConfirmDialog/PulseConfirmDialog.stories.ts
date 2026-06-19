import PulseConfirmDialog from './PulseConfirmDialog.vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import PulseStatusTag from '../PulseStatusTag/PulseStatusTag.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { Checkbox } from 'primevue'

export default {
  title: 'Components/PulseConfirmDialog',
  component: PulseConfirmDialog,
  argTypes: {
    headerText: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    acceptText: {
      control: 'text',
    },
    cancelText: {
      control: 'text',
    },
  },
} as Meta<typeof PulseConfirmDialog>

const Template: StoryFn<typeof PulseConfirmDialog> = (args) => ({
  components: { PulseConfirmDialog, PulseButton, Checkbox, PulseStatusTag },
  setup() {
    return { args }
  },
  template: `
    <PulseConfirmDialog v-bind="args">
      <template #trigger="{ showDialog }">
        <PulseButton icon="information" label="Open Confirm Dialog" @click="showDialog"></PulseButton>
      </template>

      <template #dialog-footer-left> 
        <label>
          <Checkbox inputId="dontShowAgainCheckbox"/>
          <span> Don't show this again</span>
        </label>
      </template>

      <template #dialog-header-right>
        <PulseStatusTag status="error" value="Warning"/>
      </template>
    </PulseConfirmDialog>
  `,
})

export const Default = Template.bind({})
Default.args = {
  headerText: 'Badge Field Removal',
  messageText: `Removing badge fields will hide their details from the Critical Information section.
    \nBadges will still appear, but details will only be available in related interactions.`,
  acceptText: 'Confirm',
  cancelText: 'Cancel',
}
