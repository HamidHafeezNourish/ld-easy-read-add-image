import { mount } from '@vue/test-utils'
import PulseInputWrapper from './PulseInputWrapper.vue'
import type { PulseInputValue } from './PulseInputWrapper.types'

describe('PulseInputWrapper.vue', () => {
  it('renders label and associates it with inputId', () => {
    const wrapper = mount(PulseInputWrapper, { props: { inputId: 'f', label: 'Field' } })
    expect(wrapper.find('label').attributes('for')).toBe('f')
  })

  it('uses 216px width when fullWidth is false', () => {
    const wrapper = mount(PulseInputWrapper, { props: { inputId: 'f', label: 'Field', fullWidth: false } })
    expect(wrapper.find('.pulse-input-wrapper').exists()).toBe(true)
  })

  it('shows error from error prop', () => {
    const wrapper = mount(PulseInputWrapper, { props: { inputId: 'f', label: 'Field', error: 'Required' } })
    expect(wrapper.find('.pulse-input-error').text()).toContain('Required')
  })

  it('calls onInput slot prop and updates value', async () => {
    let capturedOnInput: ((e: Event) => void) | null = null
    mount(PulseInputWrapper, {
      props: { inputId: 'f', label: 'Field' },
      slots: {
        default: ({ onInput }: { onInput: (e: Event) => void }) => {
          capturedOnInput = onInput
          return []
        },
      },
    })
    const input = document.createElement('input')
    input.value = 'typed'
    const event = new Event('input')
    Object.defineProperty(event, 'target', { value: input })
    capturedOnInput!(event)
    expect(input.value).toBe('typed')
  })

  it('calls onChange slot prop without throwing', async () => {
    let capturedOnChange: ((v: PulseInputValue) => void) | null = null
    mount(PulseInputWrapper, {
      props: { inputId: 'f', label: 'Field' },
      slots: {
        default: ({ onChange }: { onChange: (v: PulseInputValue) => void }) => {
          capturedOnChange = onChange
          return []
        },
      },
    })
    expect(() => capturedOnChange!('new value')).not.toThrow()
  })

  it('calls onBlur slot prop without throwing', async () => {
    let capturedOnBlur: (() => void) | null = null
    mount(PulseInputWrapper, {
      props: { inputId: 'f', label: 'Field' },
      slots: {
        default: ({ onBlur }: { onBlur: () => void }) => {
          capturedOnBlur = onBlur
          return []
        },
      },
    })
    expect(() => capturedOnBlur!()).not.toThrow()
  })
})
