import PulseCard from './PulseCard.vue'
import PulseButton from '../PulseButton/PulseButton.vue'
import PulseTag from '../PulseTag/PulseTag.vue'
import PulseMenu from '../PulseMenu/PulseMenu.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'

export default {
  title: 'Components/Panel/Card',
  component: PulseCard,
  argTypes: {
    title: {
      control: 'text',
    },
  },
} as Meta<typeof PulseCard>

const Template: StoryFn<typeof PulseCard> = (args) => ({
  components: { PulseCard, PulseButton },
  setup() {
    return { args }
  },
  template: `
    <PulseCard v-bind="args">
      <template #header-button v-if="!args.empty" >
        <PulseButton label="Confirm" />
      </template>
      <template #subtitle>
        Card Subtitle
      </template>
      <template #content>
        <p>This is the main content of the card.</p>
      </template>
      <template v-if="!args.empty" #footer>
        <PulseButton label="Footer Button" />
      </template>
      <template #empty-state-actions>
            <PulseButton label="Create items" />
      </template>
    </PulseCard>
  `,
})

export const Default = Template.bind({})
Default.args = { title: 'Card Title' }

export const Empty = Template.bind({})
Empty.args = {
  title: 'An empty card',
  empty: true,
  emptyTitle: 'No Data',
  emptyAction: 'Create items',
  emptyResult: 'see data here',
}

export const WithTagAndMenu: StoryFn<typeof PulseCard> = (args) => ({
  components: { PulseCard, PulseTag, PulseMenu },
  setup() {
    const menuItems = [
      {
        label: 'Edit',
        icon: 'edit' as const,
        command: () => {
          console.log('Edit')
        },
      },
      {
        label: 'Duplicate',
        icon: 'duplicate' as const,
        command: () => {
          console.log('Duplicate')
        },
      },
      {
        label: 'Delete',
        icon: 'delete' as const,
        command: () => {
          console.log('Delete')
        },
      },
    ]
    return { args, menuItems }
  },
  template: `
    <PulseCard v-bind="args">
      <template #header-tag>
        <PulseTag value="Complete" colour="lavender" iconTitle="success" />
      </template>
      <template #header-button>
        <span @click.stop>
          <PulseMenu :items="menuItems" />
        </span>
      </template>
      <template #content>
        <p>This is the main content of the card.</p>
      </template>
    </PulseCard>
  `,
})
WithTagAndMenu.args = { title: 'Learning to cook healthy meals' }

export const WithTag: StoryFn<typeof PulseCard> = (args) => ({
  components: { PulseCard, PulseTag },
  setup() {
    return { args }
  },
  template: `
    <PulseCard v-bind="args">
      <template #header-tag>
        <PulseTag value="In Progress" colour="lapis" />
      </template>
      <template #content>
        <p>Card with only a tag in the header.</p>
      </template>
    </PulseCard>
  `,
})
WithTag.args = { title: 'Card with Tag Only' }

export const WithMenu: StoryFn<typeof PulseCard> = (args) => ({
  components: { PulseCard, PulseMenu },
  setup() {
    const menuItems = [
      {
        label: 'Edit',
        icon: 'edit' as const,
        command: () => {
          console.log('Edit')
        },
      },
      {
        label: 'Delete',
        icon: 'delete' as const,
        command: () => {
          console.log('Delete')
        },
      },
    ]
    return { args, menuItems }
  },
  template: `
    <PulseCard v-bind="args">
      <template #header-button>
        <span @click.stop>
          <PulseMenu :items="menuItems" />
        </span>
      </template>
      <template #content>
        <p>Card with only a menu in the header.</p>
      </template>
    </PulseCard>
  `,
})
WithMenu.args = { title: 'Card with Menu Only' }
