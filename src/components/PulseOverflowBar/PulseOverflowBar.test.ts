import { mount } from '@vue/test-utils'
import PulseOverflowBar from './PulseOverflowBar.vue'

describe('PulseOverflowBar.vue', () => {
  it('renders the text prop', () => {
    const wrapper = mount(PulseOverflowBar, { props: { text: 'Overflow label' } })
    expect(wrapper.find('.pulse-panel-title').text()).toBe('Overflow label')
  })

  it('renders without text when prop is omitted', () => {
    const wrapper = mount(PulseOverflowBar, { props: {} })
    expect(wrapper.find('.pulse-panel-title').text()).toBe('')
  })
})
