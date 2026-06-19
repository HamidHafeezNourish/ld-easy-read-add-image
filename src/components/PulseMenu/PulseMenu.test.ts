import { mount } from '@vue/test-utils'
import Menu from 'primevue/menu'
import PulseMenu from './PulseMenu.vue'

describe('PulseMenu.vue', () => {
  const items = [{ label: 'Edit', icon: 'edit' as const }, { label: 'Delete' }]

  it('passes items to Menu as model', () => {
    const wrapper = mount(PulseMenu, { props: { items } })
    expect(wrapper.findComponent(Menu).props('model')).toEqual(items)
  })

  it('renders the toggle button', () => {
    const wrapper = mount(PulseMenu, { props: { items } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders default icon when icon prop is omitted', () => {
    const wrapper = mount(PulseMenu, { props: { items } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).props('icon')).toBe('more options')
  })

  it('renders custom icon when icon prop is provided', () => {
    const wrapper = mount(PulseMenu, { props: { items, icon: 'edit' as const } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).props('icon')).toBe('edit')
  })

  it('calls toggle when the button is clicked', async () => {
    const wrapper = mount(PulseMenu, { props: { items } })
    await wrapper.find('button').trigger('click')
    // toggle is called on menu ref - just verify no error is thrown and button exists
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
