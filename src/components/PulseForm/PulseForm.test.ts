import { mount, flushPromises } from '@vue/test-utils'
import { vi } from 'vitest'
import { z } from 'zod'
import PulseForm from './PulseForm.vue'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
})

describe('PulseForm.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(PulseForm, {
      props: { schema },
      slots: { default: '<input name="name" class="test-input" />' },
    })
    expect(wrapper.find('.test-input').exists()).toBe(true)
  })

  it('does not show error summary when there are no errors', () => {
    const wrapper = mount(PulseForm, {
      props: { schema },
      slots: { default: '' },
    })
    expect(wrapper.find('#pulse-form-errors').exists()).toBe(false)
  })

  it('emits submit with values when form is valid', async () => {
    const handler = vi.fn()
    const wrapper = mount(PulseForm, {
      props: { schema, initialValues: { name: 'Alice' }, onSubmit: handler },
      slots: { default: '<button type="submit">Submit</button>' },
    })
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ name: 'Alice' }), expect.any(Object))
  })

  it('shows error summary with field errors when form is invalid', async () => {
    const wrapper = mount(PulseForm, {
      props: { schema, initialValues: { name: '' } },
      slots: { default: '<button type="submit">Submit</button>' },
    })
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('#pulse-form-errors').exists()).toBe(true)
    expect(wrapper.find('.pulse-form-errors-list').text()).toContain('Name is required')
  })

  it('shows default errorMessageTitle when not provided', async () => {
    const wrapper = mount(PulseForm, {
      props: { schema, initialValues: { name: '' } },
      slots: { default: '<button type="submit">Submit</button>' },
    })
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.pulse-form-errors-title').text()).toBe('There is a problem')
  })

  it('shows default errorMessageSubtitle when not provided', async () => {
    const wrapper = mount(PulseForm, {
      props: { schema, initialValues: { name: '' } },
      slots: { default: '<button type="submit">Submit</button>' },
    })
    await wrapper.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.pulse-form-errors-subtitle').text()).toBe('Please fix the following errors:')
  })

  it('uses custom errorMessageTitle when provided', () => {
    const wrapper = mount(PulseForm, {
      props: { schema, errorMessageTitle: 'Oops!' },
    })
    expect(wrapper.props('errorMessageTitle')).toBe('Oops!')
  })

  it('uses custom errorMessageSubtitle when provided', () => {
    const wrapper = mount(PulseForm, {
      props: { schema, errorMessageSubtitle: 'Fix these:' },
    })
    expect(wrapper.props('errorMessageSubtitle')).toBe('Fix these:')
  })
})
