import { mount } from '@vue/test-utils'
import { Tag } from 'primevue'
import PulseTag from './PulseTag.vue'
import type { PulseColour } from '@/types/colour'

describe('PulseTag.vue', () => {
  const severityCases: Array<{ colour: PulseColour; severity: string | undefined }> = [
    { colour: 'pink-clay', severity: 'primary' },
    { colour: 'lapis', severity: 'secondary' },
    { colour: 'lavender', severity: 'success' },
    { colour: 'olive', severity: 'info' },
    { colour: 'mulberry', severity: 'warn' },
    { colour: 'ice', severity: 'danger' },
    { colour: 'jade', severity: 'contrast' },
  ]

  it.each(severityCases)('colour "$colour" passes severity "$severity" to Tag', ({ colour, severity }) => {
    const wrapper = mount(PulseTag, { props: { colour } })
    expect(wrapper.findComponent(Tag).props('severity')).toBe(severity)
  })

  it('cont-improv colour applies override style instead of severity', () => {
    const wrapper = mount(PulseTag, { props: { colour: 'cont-improv' } })
    expect(wrapper.findComponent(Tag).props('severity')).toBeUndefined()
    expect(wrapper.findComponent(Tag).attributes('style')).toContain('var(--pulse-color-cont-improv-5)')
  })

  it('renders iconTitle as PulseIcon when provided', () => {
    const wrapper = mount(PulseTag, { props: { colour: 'jade', iconTitle: 'success' } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).exists()).toBe(true)
  })

  it('does not render PulseIcon when iconTitle is omitted', () => {
    const wrapper = mount(PulseTag, { props: { colour: 'jade' } })
    expect(wrapper.findComponent({ name: 'PulseIcon' }).exists()).toBe(false)
  })

  it('passes value to Tag', () => {
    const wrapper = mount(PulseTag, { props: { colour: 'lapis', value: 'My Tag' } })
    expect(wrapper.findComponent(Tag).props('value')).toBe('My Tag')
  })
})
