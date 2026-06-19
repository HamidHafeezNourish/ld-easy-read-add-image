import PulseDragAndDrop from './PulseDragAndDrop.vue'
import { PulseDragAndDropItem } from './PulseDragAndDrop.types'
import type { Meta, StoryFn } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import './PulseDragAndDrop.stories.css'

export default {
  title: 'Components/Layout/PulseDragAndDrop',
  component: PulseDragAndDrop,
  argTypes: {
    items: {
      control: 'object',
      description: 'Items to render in the grid (max 9).',
    },
    addLabel: {
      control: 'text',
      description: 'Label text for the add button.',
    },
    removeLabel: {
      control: 'text',
      description: 'Label text for the remove button.',
    },
  },
} satisfies Meta<typeof PulseDragAndDrop>

const Template: StoryFn<typeof PulseDragAndDrop> = (args) => ({
  components: { PulseDragAndDrop },
  setup() {
    const items = ref<PulseDragAndDropItem[]>([...(args.items ?? [])])
    const maxItems = 9
    watch(
      () => args.items,
      (nextItems) => {
        items.value = [...(nextItems ?? [])]
      },
    )
    const handleAdd = () => {
      if (items.value.length >= maxItems) {
        return
      }
      const nextIndex = items.value.length + 1
      items.value = [
        ...items.value,
        {
          id: `${nextIndex}`,
          label: `New item ${nextIndex}`,
          description: 'Description of data point',
        },
      ]
    }
    const removeMethod = (_item: PulseDragAndDropItem) => confirm('Are you sure you want to remove this item?')
    return {
      handleAdd,
      removeMethod,
      items,
      args,
    }
  },
  template: `
    <PulseDragAndDrop
      v-bind="args"
      v-model:items="items"
      @add="handleAdd"
      :removeMethod="removeMethod"
    >
      <template #item ="{ item, index }">
        <!-- Placeholder tile content used when no item slot is provided. -->
        <div class="pulse-drag-and-drop-tile">
          <div class="pulse-drag-and-drop-tile-header">
            <div class="pulse-drag-and-drop-tile-title">
              <span class="pulse-drag-and-drop-tile-index">{{ index + 1 }}.</span>
              {{ item.label ?? item.title ?? item.id }}
            </div>
          </div>
          <div v-if="item.description" class="pulse-drag-and-drop-tile-label">
            {{ item.description }}
          </div>
        </div>
      </template>
    </PulseDragAndDrop>
  `,
})

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      id: '1',
      label: 'Skin and wounds',
      description: 'Wounds requiring attention',
    },
    {
      id: '2',
      label: 'Abilities',
      description: 'Description of data point',
    },
    {
      id: '3',
      label: 'Intolerance',
      description: 'Wounds requiring attention',
    },
    {
      id: '4',
      label: 'Behaviour',
      description: 'Wounds requiring attention',
      removeDisabled: true,
      removeDisabledText: 'Remove is disabled for this item',
    },
  ] as PulseDragAndDropItem[],
}

export const Empty = Template.bind({})
Empty.args = {
  items: [] as PulseDragAndDropItem[],
}
