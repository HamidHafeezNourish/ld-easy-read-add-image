import { mount } from '@vue/test-utils'
import PulseIcon from './PulseIcon.vue'

describe('PulseIcon.vue', () => {
  it('renders a span with aria-hidden', () => {
    const wrapper = mount(PulseIcon, { props: { icon: 'success' } })
    expect(wrapper.find('span').attributes('aria-hidden')).toBe('true')
  })

  it('applies default size class (regular)', () => {
    const wrapper = mount(PulseIcon, { props: { icon: 'success' } })
    expect(wrapper.find('span').classes()).toContain('pulse-icon-regular')
  })

  it('applies the correct size class when size is provided', async () => {
    const sizes = ['xxsmall', 'xsmall', 'small', 'large', 'xlarge', 'xxlarge', 'xxxlarge'] as const
    for (const size of sizes) {
      const wrapper = mount(PulseIcon, { props: { icon: 'success', size } })
      expect(wrapper.find('span').classes()).toContain(`pulse-icon-${size}`)
    }
  })

  it('renders SVG content via v-html for a known icon', () => {
    const wrapper = mount(PulseIcon, { props: { icon: 'success' } })
    expect(wrapper.find('span').html()).toContain('svg')
  })

  it('renders empty when icon is not in the registry', () => {
    const wrapper = mount(PulseIcon, { props: { icon: 'nonexistent' as never } })
    expect(wrapper.find('span').html()).not.toContain('svg')
  })

  it('accepts a colour prop without throwing', () => {
    const wrapper = mount(PulseIcon, { props: { icon: 'success', colour: 'success' as const } })
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('accepts an overrideColour prop without throwing', () => {
    const wrapper = mount(PulseIcon, { props: { icon: 'success', overrideColour: '#ff0000' } })
    expect(wrapper.find('span').exists()).toBe(true)
  })
})
