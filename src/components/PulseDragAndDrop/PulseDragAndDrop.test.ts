import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import PulseDragAndDrop from './PulseDragAndDrop.vue'
import type { PulseDragAndDropItem } from './PulseDragAndDrop.types'

const items: PulseDragAndDropItem[] = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
]

describe('PulseDragAndDrop.vue', () => {
  it('renders a card for each item', () => {
    const wrapper = mount(PulseDragAndDrop, { props: { items } })
    expect(wrapper.findAll('.pulse-drag-and-drop-item')).toHaveLength(2)
  })

  it('renders empty slots up to MAX_ITEMS (9)', () => {
    const wrapper = mount(PulseDragAndDrop, { props: { items } })
    expect(wrapper.findAll('.pulse-drag-and-drop-add')).toHaveLength(7)
  })

  it('renders no empty slots when items length equals MAX_ITEMS', () => {
    const fullItems = Array.from({ length: 9 }, (_, i) => ({ id: String(i), title: `Item ${i}` }))
    const wrapper = mount(PulseDragAndDrop, { props: { items: fullItems } })
    expect(wrapper.findAll('.pulse-drag-and-drop-add')).toHaveLength(0)
  })

  it('emits add when an empty slot is clicked', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseDragAndDrop, { props: { items, onAdd: handler } })
    await wrapper.find('.pulse-drag-and-drop-add').trigger('click')
    expect(handler).toHaveBeenCalled()
  })

  it('renders the addLabel text on empty slots', () => {
    const wrapper = mount(PulseDragAndDrop, { props: { items, addLabel: 'Add field' } })
    expect(wrapper.find('.pulse-drag-and-drop-add-text').text()).toBe('Add field')
  })

  it('emits update:items with item removed when removeMethod returns true', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseDragAndDrop, {
      props: { items, removeMethod: () => true, 'onUpdate:items': handler },
    })
    await wrapper.findAll('button.p-button')[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(handler).toHaveBeenCalled()
    const updated = handler.mock.calls[0][0] as PulseDragAndDropItem[]
    expect(updated).toHaveLength(1)
  })
})
