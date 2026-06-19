import { mount, flushPromises } from '@vue/test-utils'
import { vi } from 'vitest'
import PulseDrawer from './PulseDrawer.vue'

describe('PulseDrawer.vue', () => {
  it('renders the Drawer component with default props', () => {
    const wrapper = mount(PulseDrawer, {
      props: {
        visible: false,
      },
    })

    expect(wrapper.findComponent({ name: 'Drawer' }).exists()).toBe(true)
    expect(wrapper.props('visible')).toBe(false)
  })

  it('emits "update:visible" when visibility changes', async () => {
    const wrapper = mount(PulseDrawer, {
      props: {
        visible: false,
      },
    })

    await wrapper.findComponent({ name: 'Drawer' }).vm.$emit('update:visible', true)
    expect(wrapper.emitted('update:visible')).toBeTruthy()
    expect(wrapper.emitted('update:visible')![0]).toEqual([true])
  })

  it('passes the correct position prop to the Drawer', () => {
    const wrapper = mount(PulseDrawer, {
      props: {
        visible: true,
        position: 'left',
      },
    })

    expect(wrapper.findComponent({ name: 'Drawer' }).props('position')).toBe('left')
  })

  it('calls beforeClose and emits update:visible false when it returns true', async () => {
    const beforeClose = vi.fn().mockResolvedValue(true)
    const handler = vi.fn()
    const wrapper = mount(PulseDrawer, {
      props: { visible: true, beforeClose, 'onUpdate:visible': handler },
    })
    await wrapper.findComponent({ name: 'Drawer' }).vm.$emit('update:visible', false)
    await flushPromises()
    expect(beforeClose).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(false)
  })

  it('calls beforeClose and does not emit when it returns false', async () => {
    const beforeClose = vi.fn().mockResolvedValue(false)
    const handler = vi.fn()
    const wrapper = mount(PulseDrawer, {
      props: { visible: true, beforeClose, 'onUpdate:visible': handler },
    })
    await wrapper.findComponent({ name: 'Drawer' }).vm.$emit('update:visible', false)
    await flushPromises()
    expect(beforeClose).toHaveBeenCalled()
    expect(handler).not.toHaveBeenCalled()
  })

  it('renders slot content inside PulseComponent', async () => {
    mount(PulseDrawer, {
      attachTo: document.body,
      props: { visible: true },
      slots: { default: '<div class="test-slot">Slot Content</div>' },
    })

    await flushPromises()

    expect(document.querySelector('.test-slot')).not.toBeNull()
    expect(document.querySelector('.test-slot')?.textContent).toBe('Slot Content')
  })
})
