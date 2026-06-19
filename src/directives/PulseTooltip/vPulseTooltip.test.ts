import { mount } from '@vue/test-utils'
import vPulseTooltip from './vPulseTooltip'
import { describe, it, expect } from 'vitest'

describe('vPulseTooltip directive', () => {
  it('should be defined', () => {
    expect(vPulseTooltip).toBeDefined()
  })

  it('applies the tooltip to the element', async () => {
    const Component = {
      template: '<div v-pulse-tooltip="\'Hello World\'">Hover me</div>',
    }

    const wrapper = mount(Component, {
      global: {
        directives: {
          'pulse-tooltip': vPulseTooltip,
        },
      },
    })

    const element = wrapper.find('div')
    expect(element.attributes('data-pd-tooltip')).toBe('true')
  })
})
