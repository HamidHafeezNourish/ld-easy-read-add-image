import { mount } from '@vue/test-utils'
import PulseContainerLayout from './PulseContainerLayout.vue'

describe('PulseContainerLayout.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(PulseContainerLayout, { props: { title: 'My Page' } })
    expect(wrapper.find('h2').text()).toBe('My Page')
  })

  it('renders the subtitle when provided', () => {
    const wrapper = mount(PulseContainerLayout, { props: { title: 'My Page', subtitle: 'Sub text' } })
    expect(wrapper.find('.pulse-container-subtitle').text()).toBe('Sub text')
  })

  it('does not render subtitle when omitted', () => {
    const wrapper = mount(PulseContainerLayout, { props: { title: 'My Page' } })
    expect(wrapper.find('.pulse-container-subtitle').exists()).toBe(false)
  })

  it('renders content slot', () => {
    const wrapper = mount(PulseContainerLayout, {
      props: { title: 'My Page' },
      slots: { content: '<p class="body">Body content</p>' },
    })
    expect(wrapper.find('.body').exists()).toBe(true)
  })

  it('renders header-right slot', () => {
    const wrapper = mount(PulseContainerLayout, {
      props: { title: 'My Page' },
      slots: { 'header-right': '<button class="action">Action</button>' },
    })
    expect(wrapper.find('.action').exists()).toBe(true)
  })
})
