import { mount } from '@vue/test-utils'
import { SelectButton } from 'primevue'
import PulseNumberSelectButton from './PulseNumberSelectButton.vue'

describe('PulseNumberSelectButton.vue', () => {
  it('renders the label', () => {
    const wrapper = mount(PulseNumberSelectButton, { props: { inputId: 'score', label: 'Score' } })
    expect(wrapper.find('label').text()).toContain('Score')
  })

  it('generates 5 options for scale=5 (default)', () => {
    const wrapper = mount(PulseNumberSelectButton, { props: { inputId: 'score', label: 'Score' } })
    const options = wrapper.findComponent(SelectButton).props('options') as { label: string; value: number }[]
    expect(options).toHaveLength(5)
    expect(options[0]).toEqual({ label: '1', value: 1 })
    expect(options[4]).toEqual({ label: '5', value: 5 })
  })

  it('generates 10 options for scale=10', () => {
    const wrapper = mount(PulseNumberSelectButton, { props: { inputId: 'score', label: 'Score', scale: 10 } })
    const options = wrapper.findComponent(SelectButton).props('options') as { label: string; value: number }[]
    expect(options).toHaveLength(10)
    expect(options[9]).toEqual({ label: '10', value: 10 })
  })

  it('passes disabled prop to SelectButton', () => {
    const wrapper = mount(PulseNumberSelectButton, { props: { inputId: 'score', label: 'Score', disabled: true } })
    expect(wrapper.findComponent(SelectButton).props('disabled')).toBe(true)
  })

  it('renders hint text when provided', () => {
    const wrapper = mount(PulseNumberSelectButton, {
      props: { inputId: 'score', label: 'Score', hint: 'Rate 1-5' },
    })
    expect(wrapper.find('.pulse-input-hint').text()).toContain('Rate 1-5')
  })

  it('appends * to label when required', () => {
    const wrapper = mount(PulseNumberSelectButton, { props: { inputId: 'score', label: 'Score', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })
})
