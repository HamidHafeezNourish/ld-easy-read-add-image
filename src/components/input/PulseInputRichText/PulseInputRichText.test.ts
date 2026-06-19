import { mount } from '@vue/test-utils'
import { vi, beforeEach, afterEach } from 'vitest'
import PulseInputRichText from './PulseInputRichText.vue'

describe('PulseInputRichText.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the label', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes' } })
    expect(wrapper.find('label').text()).toContain('Notes')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes', hint: 'Enter notes here' } })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Enter notes here')
  })

  it('shows character count when maxlength is set', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes', maxlength: 500 } })
    expect(wrapper.find('.pulse-character-count').text()).toContain('/ 500 characters used')
  })

  it('does not show character count when maxlength is null', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes' } })
    expect(wrapper.find('.pulse-character-count').exists()).toBe(false)
  })

  it('applies pulse-is-disabled class when disabled', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes', disabled: true } })
    expect(wrapper.find('.pulse-is-disabled').exists()).toBe(true)
  })

  it('shows character limit error when modelValue plain text exceeds maxlength', () => {
    const wrapper = mount(PulseInputRichText, {
      props: { inputId: 'notes', label: 'Notes', maxlength: 3, modelValue: '<p>hello world</p>' },
    })
    expect(wrapper.find('.pulse-character-limit-error').exists()).toBe(true)
  })

  it('shows font size toolbar when showFontSize is true', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes', showFontSize: true } })
    expect(wrapper.find('.ql-size').exists()).toBe(true)
  })

  it('shows font family toolbar when showFontFamily is true', () => {
    const wrapper = mount(PulseInputRichText, { props: { inputId: 'notes', label: 'Notes', showFontFamily: true } })
    expect(wrapper.find('.ql-font').exists()).toBe(true)
  })

  it('executes onMounted setTimeout callback when timers are advanced', async () => {
    const wrapper = mount(PulseInputRichText, {
      attachTo: document.body,
      props: { inputId: 'notes-timer', label: 'Notes' },
    })
    await vi.advanceTimersByTimeAsync(100)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it('executes onUnmounted cleanup without throwing', async () => {
    const wrapper = mount(PulseInputRichText, {
      attachTo: document.body,
      props: { inputId: 'notes-unmount', label: 'Notes' },
    })
    await vi.advanceTimersByTimeAsync(100)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
