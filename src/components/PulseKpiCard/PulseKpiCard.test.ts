import { mount } from '@vue/test-utils'
import PulseKpiCard from './PulseKpiCard.vue'

describe('PulseKpiCard.vue', () => {
  it('renders the component with default props', () => {
    const wrapper = mount(PulseKpiCard, {
      props: {
        title: 'Title',
        value: 'Value',
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.pulse-kpi-card').exists()).toBe(true)
  })

  it('displays the title and value correctly', () => {
    const wrapper = mount(PulseKpiCard, {
      props: {
        title: 'Test KPI',
        subheader: 'KPI description',
        value: '123',
      },
    })
    expect(wrapper.find('.pulse-kpi-card-title').text()).toBe('Test KPI')
    expect(wrapper.find('.pulse-kpi-card-subheader').text()).toBe('KPI description')
    expect(wrapper.find('.pulse-kpi-card-value').text()).toBe('123')
  })

  it('displays the units and delta correctly', () => {
    const wrapper = mount(PulseKpiCard, {
      props: {
        title: 'Test KPI Delta',
        value: '120',
        units: 'audits',
        deltaValue: '12%',
        deltaExplainer: 'vs prior 30 days',
        displaySubheader: true,
        displayKpiUnits: true,
        displayKpiDelta: true,
      },
    })
    expect(wrapper.find('.pulse-kpi-card-title').text()).toBe('Test KPI Delta')
    expect(wrapper.find('.pulse-kpi-card-value').text()).toBe('120')
    expect(wrapper.find('.pulse-kpi-card-units').text()).toBe('audits')
    expect(wrapper.find('.pulse-kpi-card-delta-value').text()).toBe('12%')
    expect(wrapper.find('.pulse-kpi-card-explainer').text()).toBe('vs prior 30 days')
  })

  it('displays the units and delta correctly', () => {
    const wrapper = mount(PulseKpiCard, {
      props: {
        title: 'Test KPI Delta',
        value: '120',
        units: 'audits',
        deltaValue: '12%',
        deltaExplainer: 'vs prior 30 days',
        displayKpiUnits: true,
        displayKpiDelta: true,
      },
    })
    const statusTag = wrapper.findComponent({ name: 'PulseStatusTag' })
    expect(wrapper.find('.pulse-kpi-card-title').text()).toBe('Test KPI Delta')
    expect(statusTag.exists()).toBe(true)
    expect(statusTag.props('status')).toBe('general')
  })

  it('displays the units and delta correctly with positive sentiment', () => {
    const wrapper = mount(PulseKpiCard, {
      props: {
        title: 'Test KPI Delta',
        value: '120',
        units: 'audits',
        deltaValue: '12%',
        deltaSentiment: 'positive',
        deltaExplainer: 'vs prior 30 days',
        displayKpiUnits: true,
        displayKpiDelta: true,
      },
    })
    const statusTag = wrapper.findComponent({ name: 'PulseStatusTag' })
    expect(wrapper.find('.pulse-kpi-card-title').text()).toBe('Test KPI Delta')
    expect(statusTag.exists()).toBe(true)
    expect(statusTag.props('status')).toBe('success')
  })

  it('displays the units and delta correctly with negative sentiment', () => {
    const wrapper = mount(PulseKpiCard, {
      props: {
        title: 'Test KPI Delta',
        value: '120',
        units: 'audits',
        deltaValue: '12%',
        deltaSentiment: 'negative',
        deltaExplainer: 'vs prior 30 days',
        displayKpiUnits: true,
        displayKpiDelta: true,
      },
    })
    const statusTag = wrapper.findComponent({ name: 'PulseStatusTag' })
    expect(wrapper.find('.pulse-kpi-card-title').text()).toBe('Test KPI Delta')
    expect(statusTag.exists()).toBe(true)
    expect(statusTag.props('status')).toBe('urgency')
  })
})
