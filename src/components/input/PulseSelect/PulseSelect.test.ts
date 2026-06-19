import { mount } from '@vue/test-utils'
import { Select } from 'primevue'
import PulseSelect from './PulseSelect.vue'
import type { PulseSelectOptions } from './PulseSelect.types'

const options: PulseSelectOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

describe('PulseSelect.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options } })
    expect(wrapper.find('label').text()).toContain('Fruit')
  })

  it('associates label with select via inputId', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options } })
    expect(wrapper.find('label').attributes('for')).toBe('fruit')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options, required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options, hint: 'Pick a fruit' } })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Pick a fruit')
  })

  it('passes options to the Select component', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options } })
    expect(wrapper.findComponent(Select).props('options')).toEqual(options)
  })

  it('passes optionLabel to Select', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options, optionLabel: 'label' } })
    expect(wrapper.findComponent(Select).props('optionLabel')).toBe('label')
  })

  it('passes optionValue to Select', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options, optionValue: 'value' } })
    expect(wrapper.findComponent(Select).props('optionValue')).toBe('value')
  })

  it('passes placeholder to Select', () => {
    const wrapper = mount(PulseSelect, {
      props: { inputId: 'fruit', label: 'Fruit', options, placeholder: 'Choose...' },
    })
    expect(wrapper.findComponent(Select).props('placeholder')).toBe('Choose...')
  })

  it('disables the Select when disabled prop is true', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options, disabled: true } })
    expect(wrapper.findComponent(Select).props('disabled')).toBe(true)
  })

  it('passes filter prop to Select', () => {
    const wrapper = mount(PulseSelect, { props: { inputId: 'fruit', label: 'Fruit', options, filter: true } })
    expect(wrapper.findComponent(Select).props('filter')).toBe(true)
  })
})
