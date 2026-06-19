import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import PulseTreeSelect from './PulseTreeSelect.vue'
import type { PulseTreeNode } from './PulseTreeSelect.types'

const options: PulseTreeNode[] = [
  { key: 'parent-1', label: 'Parent 1', children: [{ key: 'child-1', label: 'Child 1' }] },
  { key: 'parent-2', label: 'Parent 2' },
]

describe('PulseTreeSelect.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [] },
    })
    expect(wrapper.find('label').text()).toContain('Select item')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [], required: true },
    })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [], hint: 'Choose a node' },
    })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Choose a node')
  })

  it('passes options to TreeSelect', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [] },
    })
    expect(wrapper.findComponent({ name: 'TreeSelect' }).props('options')).toEqual(options)
  })

  it('converts selectedValues array to key map for TreeSelect modelValue', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: ['child-1'] },
    })
    expect(wrapper.findComponent({ name: 'TreeSelect' }).props('modelValue')).toEqual({ 'child-1': true })
  })

  it('expands parent keys in expandedKeys', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [] },
    })
    expect(wrapper.findComponent({ name: 'TreeSelect' }).props('expandedKeys')).toEqual({ 'parent-1': true })
  })

  it('emits update:selectedValues when TreeSelect value changes', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [], 'onUpdate:selectedValues': handler },
    })
    await wrapper.findComponent({ name: 'TreeSelect' }).vm.$emit('update:modelValue', { 'child-1': true })
    expect(handler).toHaveBeenCalledWith(['child-1'])
  })

  it('disables TreeSelect when disabled is true', () => {
    const wrapper = mount(PulseTreeSelect, {
      props: { inputId: 'tree', label: 'Select item', options, selectedValues: [], disabled: true },
    })
    expect(wrapper.findComponent({ name: 'TreeSelect' }).props('disabled')).toBe(true)
  })
})
