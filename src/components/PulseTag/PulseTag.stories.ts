import PulseTag from './PulseTag.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { iconNames } from '../../iconRegistry'

export default {
  title: 'Components/PulseTag/PulseTag',
  component: PulseTag,
  argTypes: {
    colour: {
      control: 'select',
      options: ['pink-clay', 'lapis', 'lavender', 'olive', 'mulberry', 'ice', 'jade', 'cont-improv'],
    },
    value: {
      control: 'text',
    },
    iconTitle: {
      control: 'select',
      options: iconNames,
      description: 'Icon to display in the tag',
    },
  },
} as Meta<typeof PulseTag>

const Template: StoryFn<typeof PulseTag> = (args) => ({
  components: { PulseTag },
  setup() {
    return { args }
  },
  template: `
    <PulseTag v-bind="args">
    </PulseTag>
  `,
})

export const Default = Template.bind({})
Default.args = {
  colour: 'pink-clay',
  value: 'Tag Text',
}
