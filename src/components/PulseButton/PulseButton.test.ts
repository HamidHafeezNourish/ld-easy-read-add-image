import { mount } from '@vue/test-utils'
import Button from 'primevue/button'
import PulseButton from './PulseButton.vue'

describe('PulseButton.vue', () => {
  it('renders label text', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save' } })
    expect(wrapper.find('button').text()).toContain('Save')
  })

  it('applies secondary severity class when type is secondary', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save', type: 'secondary' } })
    expect(wrapper.find('button').classes()).toContain('p-button-secondary')
  })

  it('applies primary severity class by default', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save' } })
    expect(wrapper.find('button').classes()).toContain('p-button-primary')
  })

  it('passes disabled state to Button', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save', disabled: true } })
    expect(wrapper.find('button').element.disabled).toBe(true)
  })

  it('passes loading state to Button', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save', loading: true } })
    expect(wrapper.find('button').classes()).toContain('p-button-loading')
  })

  it('passes htmlType as type to Button', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save', htmlType: 'submit' } })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('emits click when clicked', async () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save' } })
    await wrapper.findComponent(Button).trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders PulseIcon when icon prop is provided', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save', icon: 'success' } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).exists()).toBe(true)
  })

  it('does not render PulseIcon when icon prop is omitted', () => {
    const wrapper = mount(PulseButton, { props: { label: 'Save' } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).exists()).toBe(false)
  })
})
