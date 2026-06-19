import PulsePaginator from './PulsePaginator.vue'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref } from 'vue'

export default {
  title: 'Components/Pagination/PulsePaginator',
  component: PulsePaginator,
  argTypes: {
    rows: {
      control: 'number',
      description: 'Number of rows to display per page',
    },
  },
} as Meta<typeof PulsePaginator>

const LocalTemplate: StoryFn<typeof PulsePaginator> = (args) => ({
  components: { PulsePaginator },
  setup() {
    const currentPage = ref(1)
    const rows = ref(10)
    return {
      currentPage,
      rows,
      args: {
        ...args,
        mode: 'local',
      },
    }
  },
  template: `
    <PulsePaginator v-bind="args" v-model:current-page="currentPage" :rows="10">
      <template #default="{ items, page, rows, total }">
        Items: {{ items }}
      </template>
    </PulsePaginator>
  `,
})

export const Local = LocalTemplate.bind({})
Local.args = {
  items: [...Array(100).keys()],
}
