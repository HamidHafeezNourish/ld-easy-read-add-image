import { mount } from '@vue/test-utils'
import { Tag } from 'primevue'
import PulseStatusTag from './PulseStatusTag.vue'
import type { PulseStatus } from '@/types/colour'

describe('PulseStatusTag.vue', () => {
  const cases: Array<{ status: PulseStatus; severity: string; icon: string }> = [
    { status: 'general', severity: 'primary', icon: 'information' },
    { status: 'greyed', severity: 'secondary', icon: 'information' },
    { status: 'success', severity: 'success', icon: 'success' },
    { status: 'attention', severity: 'info', icon: 'alert' },
    { status: 'error', severity: 'warn', icon: 'alert' },
    { status: 'urgency', severity: 'danger', icon: 'alert' },
  ]

  it.each(cases)('status "$status" passes severity "$severity" to Tag', ({ status, severity }) => {
    const wrapper = mount(PulseStatusTag, { props: { value: 'Label', status } })
    expect(wrapper.findComponent(Tag).props('severity')).toBe(severity)
  })

  it.each(cases)('status "$status" renders PulseIcon with icon "$icon"', ({ status, icon }) => {
    const wrapper = mount(PulseStatusTag, { props: { value: 'Label', status } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).props('icon')).toBe(icon)
  })

  it('renders the value text', () => {
    const wrapper = mount(PulseStatusTag, { props: { value: 'My Status', status: 'success' } })
    expect(wrapper.findComponent(Tag).props('value')).toBe('My Status')
  })

  it('uses custom icon prop when provided instead of default', () => {
    const wrapper = mount(PulseStatusTag, { props: { value: 'Label', status: 'general', icon: 'edit' as const } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).props('icon')).toBe('edit')
  })

  it('falls back to default severity and icon for unknown status', () => {
    const wrapper = mount(PulseStatusTag, {
      props: { value: 'Label', status: 'unknown' as unknown as PulseStatus },
    })
    expect(wrapper.findComponent(Tag).props('severity')).toBe('primary')
    expect(wrapper.findComponent({ name: 'PulseIcon' }).props('icon')).toBe('information')
  })
})
