import { mount } from '@vue/test-utils'
import ProgressBar from 'primevue/progressbar'
import PulseProgressBar from './PulseProgressBar.vue'

describe('PulseProgressBar.vue', () => {
  it('passes the value prop through', () => {
    const wrapper = mount(PulseProgressBar, { props: { value: 50 } })
    expect(wrapper.findComponent(ProgressBar).props('value')).toBe(50)
  })

  it('clamps values above 100 to 100', () => {
    const wrapper = mount(PulseProgressBar, { props: { value: 150 } })
    expect(wrapper.findComponent(ProgressBar).props('value')).toBe(100)
  })

  it('clamps values below 0 to 0', () => {
    const wrapper = mount(PulseProgressBar, { props: { value: -10 } })
    expect(wrapper.findComponent(ProgressBar).props('value')).toBe(0)
  })

  it('passes empty pt overrides when not completed', () => {
    const wrapper = mount(PulseProgressBar, { props: { value: 50, completed: false } })
    expect(wrapper.findComponent(ProgressBar).props('pt')).toEqual({})
  })

  it('applies completed style override when completed is true', () => {
    const wrapper = mount(PulseProgressBar, { props: { value: 100, completed: true } })
    expect(wrapper.findComponent(ProgressBar).props('pt')).toEqual({
      value: { style: { background: 'var(--pulse-color-primary-90)' } },
    })
  })
})
