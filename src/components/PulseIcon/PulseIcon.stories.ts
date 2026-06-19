import PulseIcon from './PulseIcon.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { iconNames } from '../../iconRegistry'

export default {
  title: 'Components/PulseIcon',
  component: PulseIcon,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: iconNames,
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'regular', 'large', 'xlarge', 'xxlarge', 'xxxlarge'],
    },
    colour: {
      control: { type: 'select' },
      options: ['pink-clay', 'lapis', 'lavender', 'olive', 'mulberry', 'ice', 'jade'],
    },
  },
} satisfies Meta<typeof PulseIcon>

const Template: StoryFn<typeof PulseIcon> = (args) => ({
  components: { PulseIcon },
  setup() {
    return { args }
  },
  template: `<PulseIcon v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {
  icon: 'target',
  size: 'regular',
}
