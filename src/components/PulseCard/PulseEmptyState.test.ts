import { mount } from '@vue/test-utils'
import PulseEmptyState from './PulseEmptyState.vue'

describe('PulseEmptyState.vue', () => {
  it('renders emptyTitle', () => {
    const wrapper = mount(PulseEmptyState, { props: { emptyTitle: 'Nothing here' } })
    expect(wrapper.find('.pulse-empty-title').text()).toBe('Nothing here')
  })

  it('renders emptyAction and emptyResult', () => {
    const wrapper = mount(PulseEmptyState, {
      props: { emptyAction: 'Click here', emptyResult: 'see results' },
    })
    expect(wrapper.find('.pulse-empty-subtitle').text()).toContain('Click here')
    expect(wrapper.find('.pulse-empty-result').text()).toContain('see results')
  })

  it('does not render emptyResult span when only emptyAction is provided', () => {
    const wrapper = mount(PulseEmptyState, { props: { emptyAction: 'Click here' } })
    expect(wrapper.find('.pulse-empty-result').exists()).toBe(false)
  })

  it('renders with empty defaults when no props provided', () => {
    const wrapper = mount(PulseEmptyState)
    expect(wrapper.find('.pulse-empty-title').exists()).toBe(false)
  })

  it('renders actions slot content', () => {
    const wrapper = mount(PulseEmptyState, {
      slots: { actions: '<button class="action-btn">Add item</button>' },
    })
    expect(wrapper.find('.action-btn').exists()).toBe(true)
    expect(wrapper.find('.action-btn').text()).toBe('Add item')
  })
})
