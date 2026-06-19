import { mount } from '@vue/test-utils'
import PulseChip from './PulseChip.vue'

describe('PulseChip.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseChip, { props: { label: 'Option A', modelValue: true } })
    expect(wrapper.text()).toContain('Option A')
  })

  it('emits update:modelValue with toggled value when clicked', async () => {
    const wrapper = mount(PulseChip, { props: { label: 'Option A', modelValue: true } })
    await wrapper.find('[role="button"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit when clicked while disabled', async () => {
    const wrapper = mount(PulseChip, {
      props: { label: 'Option A', modelValue: true, disabled: true },
    })
    await wrapper.find('[role="button"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('auto-emits false when disabled becomes true while selected', async () => {
    const wrapper = mount(PulseChip, {
      props: { label: 'Option A', modelValue: true, disabled: false },
    })
    await wrapper.setProps({ disabled: true })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('applies deselected class when modelValue is false', () => {
    const wrapper = mount(PulseChip, { props: { label: 'Option A', modelValue: false } })
    expect(wrapper.find('.pulse-chip--deselected').exists()).toBe(true)
  })

  it('applies disabled class when disabled is true', () => {
    const wrapper = mount(PulseChip, {
      props: { label: 'Option A', modelValue: false, disabled: true },
    })
    expect(wrapper.find('.pulse-chip--disabled').exists()).toBe(true)
  })
})
