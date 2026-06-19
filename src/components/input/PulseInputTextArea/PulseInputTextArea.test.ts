import { mount } from '@vue/test-utils'
import PulseInputTextArea from './PulseInputTextArea.vue'

describe('PulseInputTextArea.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio' } })
    expect(wrapper.find('label').text()).toContain('Bio')
  })

  it('associates label with textarea via inputId', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio' } })
    expect(wrapper.find('label').attributes('for')).toBe('bio')
    expect(wrapper.find('textarea').attributes('id')).toBe('bio')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio', hint: 'Write a short bio' } })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Write a short bio')
  })

  it('shows character count when maxlength is set', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio', maxlength: 200 } })
    expect(wrapper.find('.character-count').text()).toContain('/ 200 characters used')
  })

  it('does not show character count when maxlength is null', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio' } })
    expect(wrapper.find('.character-count').exists()).toBe(false)
  })

  it('disables the textarea when disabled is true', () => {
    const wrapper = mount(PulseInputTextArea, { props: { inputId: 'bio', label: 'Bio', disabled: true } })
    expect(wrapper.find('textarea').element.disabled).toBe(true)
  })

  it('reflects modelValue length in character count', () => {
    const wrapper = mount(PulseInputTextArea, {
      props: { inputId: 'bio', label: 'Bio', maxlength: 100, modelValue: 'hello world' },
    })
    expect(wrapper.find('.character-count').text()).toContain('11 / 100')
  })
})
