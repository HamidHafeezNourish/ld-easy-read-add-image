import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import PulsePaginator from './PulsePaginator.vue'

describe('PulsePaginator.vue', () => {
  it('slices items for the current page in local mode', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let slotItems: unknown[] = []
    mount(PulsePaginator, {
      props: { mode: 'local', currentPage: 0, rows: 3, items },
      slots: {
        default: ({ items: i }: { items: unknown[] }) => {
          slotItems = i
          return []
        },
      },
    })
    expect(slotItems).toEqual([1, 2, 3])
  })

  it('returns second page of items in local mode', () => {
    const items = [1, 2, 3, 4, 5, 6]
    let slotItems: unknown[] = []
    mount(PulsePaginator, {
      props: { mode: 'local', currentPage: 1, rows: 3, items },
      slots: {
        default: ({ items: i }: { items: unknown[] }) => {
          slotItems = i
          return []
        },
      },
    })
    expect(slotItems).toEqual([4, 5, 6])
  })

  it('uses total prop for totalRecords in remote mode', () => {
    const wrapper = mount(PulsePaginator, {
      props: { mode: 'remote', currentPage: 0, rows: 10, total: 42 },
    })
    expect(wrapper.findComponent({ name: 'Paginator' }).props('totalRecords')).toBe(42)
  })

  it('emits update:currentPage when page changes', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulsePaginator, {
      props: {
        mode: 'local',
        currentPage: 0,
        rows: 3,
        items: Array.from({ length: 9 }, (_, i) => i),
        'onUpdate:currentPage': handler,
      },
    })
    await wrapper.findComponent({ name: 'Paginator' }).vm.$emit('page', { first: 3, rows: 3, page: 1 })
    expect(handler).toHaveBeenCalledWith(1)
  })

  it('emits update:rows when page changes', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulsePaginator, {
      props: {
        mode: 'local',
        currentPage: 0,
        rows: 3,
        items: Array.from({ length: 9 }, (_, i) => i),
        'onUpdate:rows': handler,
      },
    })
    await wrapper.findComponent({ name: 'Paginator' }).vm.$emit('page', { first: 3, rows: 5, page: 1 })
    expect(handler).toHaveBeenCalledWith(5)
  })

  it('emits update:rows when rowsPerPageOptions prop changes', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulsePaginator, {
      props: { mode: 'local', currentPage: 0, rows: 10, items: [1, 2, 3], 'onUpdate:rows': handler },
    })

    // VTU infers setProps argument as `never` for components using runtime defineProps
    // (a known VTU limitation). @ts-ignore is used instead of @ts-expect-error because
    // the error only appears during tsc, not during eslint's type-checking pass.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await wrapper.setProps({ rowsPerPageOptions: [10, 20, 50] })
    expect(handler).toHaveBeenCalledWith([10, 20, 50])
  })

  it('returns 0 totalRecords in remote mode when total is not provided', () => {
    const wrapper = mount(PulsePaginator, {
      props: { mode: 'remote', currentPage: 0, rows: 10 },
    })
    expect(wrapper.findComponent({ name: 'Paginator' }).props('totalRecords')).toBe(0)
  })

  it('returns empty pagedItems in local mode when items is not provided', () => {
    let slotItems: unknown[] = ['non-empty']
    mount(PulsePaginator, {
      props: { mode: 'local', currentPage: 0, rows: 10 },
      slots: {
        default: ({ items: i }: { items: unknown[] }) => {
          slotItems = i
          return []
        },
      },
    })
    expect(slotItems).toEqual([])
  })

  it('resets to last valid page when total items decrease', async () => {
    const handler = vi.fn()
    const items = Array.from({ length: 9 }, (_, i) => i)
    const wrapper = mount(PulsePaginator, {
      props: { mode: 'local', currentPage: 2, rows: 3, items, 'onUpdate:currentPage': handler },
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await wrapper.setProps({ items: [1, 2, 3] })
    expect(handler).toHaveBeenCalledWith(0)
  })
})
