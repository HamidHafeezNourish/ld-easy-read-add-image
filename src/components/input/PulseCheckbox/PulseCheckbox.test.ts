import { mount } from '@vue/test-utils'
import { Checkbox } from 'primevue'
import PulseCheckbox from './PulseCheckbox.vue'

describe('PulseCheckbox.vue', () => {
  it('passes inputId to Checkbox', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree' } })
    expect(wrapper.findComponent(Checkbox).props('inputId')).toBe('agree')
  })

  it('defaults modelValue to false', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree' } })
    expect(wrapper.findComponent(Checkbox).props('modelValue')).toBe(false)
  })

  it('passes modelValue true to Checkbox', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree', modelValue: true } })
    expect(wrapper.findComponent(Checkbox).props('modelValue')).toBe(true)
  })

  it('passes disabled prop to Checkbox', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree', disabled: true } })
    expect(wrapper.findComponent(Checkbox).props('disabled')).toBe(true)
  })

  it('passes invalid prop to Checkbox', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree', invalid: true } })
    expect(wrapper.findComponent(Checkbox).props('invalid')).toBe(true)
  })

  it('renders label when label prop is provided', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree', label: 'I agree' } })
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('I agree')
  })

  it('does not render label when label prop is omitted', () => {
    const wrapper = mount(PulseCheckbox, { props: { inputId: 'agree' } })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('emits update:modelValue when checkbox changes', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseCheckbox, {
      props: { inputId: 'agree', modelValue: false, 'onUpdate:modelValue': handler },
    })
    wrapper.findComponent(Checkbox).vm.$emit('update:modelValue', true)
    expect(handler).toHaveBeenCalledWith(true)
  })
})
