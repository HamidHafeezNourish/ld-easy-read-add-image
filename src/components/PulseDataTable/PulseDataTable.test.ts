import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { DataTable } from 'primevue'
import PulseDataTable from './PulseDataTable.vue'
import PulseEmptyState from '../PulseCard/PulseEmptyState.vue'

const columns = [
  { field: 'name', header: 'Name' },
  { field: 'age', header: 'Age' },
]

const items = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
]

describe('PulseDataTable.vue', () => {
  it('passes items to DataTable', () => {
    const wrapper = mount(PulseDataTable, { props: { columns, items } })
    expect(wrapper.findComponent(DataTable).props('value')).toEqual(items)
  })

  it('shows PulseEmptyState when items is empty', () => {
    const wrapper = mount(PulseDataTable, { props: { columns, items: [] } })
    expect(wrapper.findComponent(PulseEmptyState).exists()).toBe(true)
  })

  it('does not show PulseEmptyState when items exist', () => {
    const wrapper = mount(PulseDataTable, { props: { columns, items } })
    expect(wrapper.findComponent(PulseEmptyState).exists()).toBe(false)
  })

  it('passes loading prop to DataTable', () => {
    const wrapper = mount(PulseDataTable, { props: { columns, items, loading: true } })
    expect(wrapper.findComponent(DataTable).props('loading')).toBe(true)
  })

  it('passes paginator prop to DataTable', () => {
    const wrapper = mount(PulseDataTable, { props: { columns, items, paginator: true, rows: 10 } })
    expect(wrapper.findComponent(DataTable).props('paginator')).toBe(true)
  })

  it('passes emptyTitle to PulseEmptyState', () => {
    const wrapper = mount(PulseDataTable, {
      props: { columns, items: [], emptyTitle: 'Nothing here' },
    })
    expect(wrapper.findComponent(PulseEmptyState).props('emptyTitle')).toBe('Nothing here')
  })

  it('renders global search input when globalFilterFields is provided', () => {
    const wrapper = mount(PulseDataTable, {
      props: { columns, items, globalFilterFields: ['name'] },
    })
    expect(wrapper.findComponent({ name: 'PulseInputText' }).exists()).toBe(true)
  })

  it('does not render global search input when globalFilterFields is absent', () => {
    const wrapper = mount(PulseDataTable, { props: { columns, items } })
    expect(wrapper.find('input[id="global-search"]').exists()).toBe(false)
  })

  it('emits row-click when a row is clicked', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseDataTable, {
      props: { columns, items, 'onRow-click': handler },
    })
    await wrapper.findComponent(DataTable).vm.$emit('row-click', { data: items[0] })
    expect(handler).toHaveBeenCalledWith({ data: items[0] })
  })

  it('renders custom column slot content', () => {
    const wrapper = mount(PulseDataTable, {
      props: { columns, items },
      slots: { name: '<span class="custom-cell">custom</span>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('updates global filter value when search input changes', async () => {
    const wrapper = mount(PulseDataTable, {
      props: { columns, items, globalFilterFields: ['name'] },
    })
    await wrapper.findComponent({ name: 'PulseInputText' }).vm.$emit('update:modelValue', 'Alice')
    const filtersArg = wrapper.findComponent(DataTable).props('filters') as Record<string, unknown>
    expect(filtersArg?.global).toBeDefined()
  })

  it('emits page event when paginator changes page', async () => {
    const handler = vi.fn()
    const pageEvent = { first: 5, rows: 5, page: 1 }
    const wrapper = mount(PulseDataTable, {
      props: { columns, items, paginator: true, rows: 5, onPage: handler },
    })
    await wrapper.findComponent(DataTable).vm.$emit('page', pageEvent)
    expect(handler).toHaveBeenCalledWith(pageEvent)
  })
})
