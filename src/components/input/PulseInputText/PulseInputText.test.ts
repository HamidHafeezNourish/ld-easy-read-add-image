import { mount } from '@vue/test-utils'
import PulseInputText from './PulseInputText.vue'

describe('PulseInputText.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Full Name' } })
    expect(wrapper.find('label').text()).toContain('Full Name')
  })

  it('associates label with input via inputId', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Full Name' } })
    expect(wrapper.find('label').attributes('for')).toBe('name')
    expect(wrapper.find('input').attributes('id')).toBe('name')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Full Name', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('does not append * when not required', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Full Name' } })
    expect(wrapper.find('label').text()).not.toContain('*')
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Name', hint: 'Enter your full name' } })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Enter your full name')
  })

  it('does not render hint when not provided', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Name' } })
    expect(wrapper.find('.pulse-input-hint').exists()).toBe(false)
  })

  it('shows character count when maxlength is set', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Name', maxlength: 50 } })
    expect(wrapper.find('.character-count').exists()).toBe(true)
    expect(wrapper.find('.character-count').text()).toContain('/ 50 characters used')
  })

  it('does not show character count when maxlength is null', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Name' } })
    expect(wrapper.find('.character-count').exists()).toBe(false)
  })

  it('disables the input when disabled prop is true', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Name', disabled: true } })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('renders icon via PulseIcon when icon prop is provided', () => {
    const wrapper = mount(PulseInputText, { props: { inputId: 'name', label: 'Name', icon: 'success' } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).exists()).toBe(true)
  })

  it('updates character count as modelValue changes', async () => {
    const wrapper = mount(PulseInputText, {
      props: { inputId: 'name', label: 'Name', maxlength: 20, modelValue: 'hello' },
    })
    expect(wrapper.find('.character-count').text()).toContain('5 / 20')
  })
})
