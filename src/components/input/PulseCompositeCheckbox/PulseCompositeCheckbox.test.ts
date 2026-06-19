import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import PulseCompositeCheckbox from './PulseCompositeCheckbox.vue'
import type { PulseCompositeCheckboxValue } from './PulseCompositeCheckbox.types'

const items: PulseCompositeCheckboxValue = [
  { id: 1, label: 'Option A', checked: false, inputValue: '', inputId: 'opt-a' },
  { id: 2, label: 'Option B', checked: true, inputValue: 'Details', inputId: 'opt-b' },
]

describe('PulseCompositeCheckbox.vue', () => {
  it('renders a checkbox for each item', () => {
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Select options', modelValue: items },
    })
    expect(wrapper.findAll('.pulse-checkbox')).toHaveLength(2)
  })

  it('renders the header as a label', () => {
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Select options', modelValue: items },
    })
    expect(wrapper.find('label.pulse-input-label').text()).toContain('Select options')
  })

  it('renders labels for each option', () => {
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Options', modelValue: items },
    })
    const labels = wrapper.findAll('.pulse-checkbox-section label')
    expect(labels[0].text()).toContain('Option A')
    expect(labels[1].text()).toContain('Option B')
  })

  it('shows text input for checked items', () => {
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Options', modelValue: items },
    })
    expect(wrapper.findAll('.pulse-name-input')).toHaveLength(1)
  })

  it('does not show text input for unchecked items', () => {
    const uncheckedItems: PulseCompositeCheckboxValue = [
      { id: 1, label: 'Option A', checked: false, inputValue: '', inputId: 'opt-a' },
    ]
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Options', modelValue: uncheckedItems },
    })
    expect(wrapper.find('.pulse-name-input').exists()).toBe(false)
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Options', modelValue: items, hint: 'Pick all that apply' },
    })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Pick all that apply')
  })

  it('emits update:modelValue with toggled checked state when checkbox changes', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Options', modelValue: items, 'onUpdate:modelValue': handler },
    })
    // Trigger the first checkbox (Option A, currently unchecked)
    await wrapper.findAll('input[type="checkbox"]')[0].trigger('change')
    expect(handler).toHaveBeenCalled()
    const updated = handler.mock.calls[0][0]
    expect(updated[0].checked).toBe(true)
  })

  it('emits update:modelValue with updated inputValue when text input changes', async () => {
    const handler = vi.fn()
    const checkedItems: PulseCompositeCheckboxValue = [
      { id: 1, label: 'Option A', checked: true, inputValue: '', inputId: 'opt-a' },
    ]
    const wrapper = mount(PulseCompositeCheckbox, {
      props: { inputId: 'choices', header: 'Options', modelValue: checkedItems, 'onUpdate:modelValue': handler },
    })
    const input = wrapper.find('.pulse-name-input input')
    await input.setValue('New text')
    expect(handler).toHaveBeenCalled()
    const updated = handler.mock.calls[0][0]
    expect(updated[0].inputValue).toBe('New text')
  })
})
