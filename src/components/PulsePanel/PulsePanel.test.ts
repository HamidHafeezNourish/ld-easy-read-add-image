import { mount } from '@vue/test-utils'
import PulsePanel from './PulsePanel.vue'

describe('PulsePanel.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(PulsePanel, { props: { title: 'My Panel' } })
    expect(wrapper.find('.pulse-panel-title').text()).toBe('My Panel')
  })

  it('renders the caption when provided', () => {
    const wrapper = mount(PulsePanel, { props: { title: 'Panel', caption: 'Sub text' } })
    expect(wrapper.find('.pulse-panel-caption').text()).toBe('Sub text')
  })

  it('does not render caption when omitted', () => {
    const wrapper = mount(PulsePanel, { props: { title: 'Panel' } })
    expect(wrapper.find('.pulse-panel-caption').exists()).toBe(false)
  })

  it('applies dark-override class when dark prop is true', () => {
    const wrapper = mount(PulsePanel, { props: { title: 'Panel', dark: true } })
    expect(wrapper.find('.dark-override').exists()).toBe(true)
  })

  it('does not apply dark-override class by default', () => {
    const wrapper = mount(PulsePanel, { props: { title: 'Panel' } })
    expect(wrapper.find('.dark-override').exists()).toBe(false)
  })

  it('renders default content slot', () => {
    const wrapper = mount(PulsePanel, {
      props: { title: 'Panel' },
      slots: { default: '<p class="body">Content</p>' },
    })
    expect(wrapper.find('.body').exists()).toBe(true)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(PulsePanel, {
      props: { title: 'Panel' },
      slots: { footer: '<div class="footer">Footer</div>' },
    })
    expect(wrapper.find('.footer').exists()).toBe(true)
  })

  it('renders bottomHeader slot when provided', () => {
    const wrapper = mount(PulsePanel, {
      props: { title: 'Panel' },
      slots: { bottomHeader: '<span class="bottom-hdr">Bottom</span>' },
    })
    expect(wrapper.find('.bottom-hdr').exists()).toBe(true)
  })

  it('renders middleHeaderRight slot when provided', () => {
    const wrapper = mount(PulsePanel, {
      props: { title: 'Panel' },
      slots: { middleHeaderRight: '<button class="action">Action</button>' },
    })
    expect(wrapper.find('.action').exists()).toBe(true)
  })
})
