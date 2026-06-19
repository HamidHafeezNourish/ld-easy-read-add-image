import { mount } from '@vue/test-utils'
import { DatePicker } from 'primevue'
import PulseDatePicker from './PulseDatePicker.vue'

describe('PulseDatePicker.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date of Birth' } })
    expect(wrapper.find('label').text()).toContain('Date of Birth')
  })

  it('associates label with input via inputId', () => {
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date of Birth' } })
    expect(wrapper.find('label').attributes('for')).toBe('dob')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date of Birth', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseDatePicker, {
      props: { inputId: 'dob', label: 'Date of Birth', hint: 'DD/MM/YYYY' },
    })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('DD/MM/YYYY')
  })

  it('disables the DatePicker when disabled is true', () => {
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date of Birth', disabled: true } })
    expect(wrapper.findComponent(DatePicker).props('disabled')).toBe(true)
  })

  it('passes minDate to DatePicker', () => {
    const min = new Date(2020, 0, 1)
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date', minDate: min } })
    expect(wrapper.findComponent(DatePicker).props('minDate')).toEqual(min)
  })

  it('passes maxDate to DatePicker', () => {
    const max = new Date(2030, 11, 31)
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date', maxDate: max } })
    expect(wrapper.findComponent(DatePicker).props('maxDate')).toEqual(max)
  })

  it('passes selectionMode to DatePicker', () => {
    const wrapper = mount(PulseDatePicker, {
      props: { inputId: 'dob', label: 'Date', selectionMode: 'range' },
    })
    expect(wrapper.findComponent(DatePicker).props('selectionMode')).toBe('range')
  })

  it('renders PulseIcon for calendar icon', () => {
    const wrapper = mount(PulseDatePicker, { props: { inputId: 'dob', label: 'Date of Birth' } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).exists()).toBe(true)
  })
})
