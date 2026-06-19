import { mount } from '@vue/test-utils'
import PulseCard from './PulseCard.vue'
import PulseEmptyState from './PulseEmptyState.vue'

describe('PulseCard.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(PulseCard, { props: { title: 'My Card' } })
    expect(wrapper.find('.pulse-card-title').text()).toBe('My Card')
  })

  it('renders content slot', () => {
    const wrapper = mount(PulseCard, {
      props: { title: 'Card' },
      slots: { content: '<p class="body">Hello</p>' },
    })
    expect(wrapper.find('.body').exists()).toBe(true)
    expect(wrapper.find('.body').text()).toBe('Hello')
  })

  it('renders header-tag and header-button slots when provided', () => {
    const wrapper = mount(PulseCard, {
      props: { title: 'Card' },
      slots: {
        'header-tag': '<span class="tag">Tag</span>',
        'header-button': '<button class="btn">Action</button>',
      },
    })
    expect(wrapper.find('.pulse-card-header-actions').exists()).toBe(true)
    expect(wrapper.find('.tag').exists()).toBe(true)
    expect(wrapper.find('.btn').exists()).toBe(true)
  })

  it('does not render header-actions when neither header-tag nor header-button are provided', () => {
    const wrapper = mount(PulseCard, { props: { title: 'Card' } })
    expect(wrapper.find('.pulse-card-header-actions').exists()).toBe(false)
  })

  it('renders PulseEmptyState when empty is true', () => {
    const wrapper = mount(PulseCard, {
      props: { title: 'Card', empty: true, emptyTitle: 'No data', emptyAction: 'Add one', emptyResult: 'No results' },
    })
    expect(wrapper.findComponent(PulseEmptyState).exists()).toBe(true)
  })

  it('does not render PulseEmptyState when empty is false', () => {
    const wrapper = mount(PulseCard, {
      props: { title: 'Card', empty: false },
      slots: { content: '<p>Content</p>' },
    })
    expect(wrapper.findComponent(PulseEmptyState).exists()).toBe(false)
  })

  it('passes emptyTitle, emptyAction, emptyResult to PulseEmptyState', () => {
    const wrapper = mount(PulseCard, {
      props: {
        title: 'Card',
        empty: true,
        emptyTitle: 'Nothing here',
        emptyAction: 'Create item',
        emptyResult: 'No results found',
      },
    })
    const emptyState = wrapper.findComponent(PulseEmptyState)
    expect(emptyState.props('emptyTitle')).toBe('Nothing here')
    expect(emptyState.props('emptyAction')).toBe('Create item')
    expect(emptyState.props('emptyResult')).toBe('No results found')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(PulseCard, {
      props: { title: 'Card' },
      slots: { footer: '<div class="footer">Footer</div>' },
    })
    expect(wrapper.find('.footer').exists()).toBe(true)
  })
})
