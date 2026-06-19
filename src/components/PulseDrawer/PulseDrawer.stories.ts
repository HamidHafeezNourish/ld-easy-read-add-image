import PulseDrawer from './PulseDrawer.vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import PulseTag from '../PulseTag/PulseTag.vue'

type PulseDrawerArgs = {
  visible: boolean
  position: 'left' | 'right' | 'top' | 'bottom'
  title: string
}

export default {
  title: 'Components/Overlay/PulseDrawer',
  component: PulseDrawer,
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
} satisfies Meta<typeof PulseDrawer>

const Template: StoryFn<typeof PulseDrawer> = (args: Partial<PulseDrawerArgs>) => ({
  components: { PulseDrawer, PulseButton, PulseTag },
  setup() {
    const visible = ref(true)
    return { args, visible }
  },
  template: `
    <PulseDrawer v-bind="args" v-model:visible="visible">
      This is inside the drawer.
      <template #sub-title>
        <PulseTag value="Importance" colour="lavender" size="small" />
      </template>
    </PulseDrawer>
    <PulseButton label="Open Drawer" @click="visible = true"></PulseButton>
  `,
})

export const Default = Template.bind({})
Default.args = {
  position: 'right',
  title: 'Drawer Title',
  breadcrumb: 'Previous page',
  breadcrumbCallback: () => {},
}
