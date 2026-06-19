import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import PulseTabs from './PulseTabs.vue'

const items = [
  { label: 'Overview', key: 'overview' },
  { label: 'Details', key: 'details' },
  { label: 'History', key: 'history' },
]

describe('PulseTabs.vue', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())
  it('renders a tab for each item', () => {
    const wrapper = mount(PulseTabs, { props: { items, modelValue: 'overview' } })
    const tabs = wrapper.findAll('.pulse-tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0].text()).toBe('Overview')
    expect(tabs[1].text()).toBe('Details')
    expect(tabs[2].text()).toBe('History')
  })

  it('emits update:modelValue with the tab key when a tab is clicked', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseTabs, {
      props: { items, modelValue: 'overview', 'onUpdate:modelValue': handler },
    })
    await wrapper.findAll('[role="tab"]')[1].trigger('click')
    expect(handler).toHaveBeenCalledWith('details')
  })

  it('updates selectedTab when modelValue prop changes', async () => {
    const wrapper = mount(PulseTabs, { props: { items, modelValue: 'overview' } })
    // VTU infers setProps argument as `never` for components using runtime defineProps
    // (a known VTU limitation). @ts-ignore is used instead of @ts-expect-error because
    // the error only appears during tsc, not during eslint's type-checking pass.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await wrapper.setProps({ modelValue: 'history' })
    // The Tabs value binding should reflect the new selection
    const tabs = wrapper.findComponent({ name: 'Tabs' })
    expect(tabs.props('value')).toBe('history')
  })

  it('initialises selectedTab from modelValue', () => {
    const wrapper = mount(PulseTabs, { props: { items, modelValue: 'details' } })
    const tabs = wrapper.findComponent({ name: 'Tabs' })
    expect(tabs.props('value')).toBe('details')
  })
})
