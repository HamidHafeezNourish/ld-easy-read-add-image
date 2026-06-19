/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { Form } from 'vee-validate'
import { usePulseField } from './useFormField'

function mountComposable<T>(modelValue: T) {
  const model = ref<T>(modelValue)
  let result: ReturnType<typeof usePulseField>

  const TestComponent = defineComponent({
    setup() {
      result = usePulseField({ name: 'testField', modelValue: model as ReturnType<typeof ref> })
      return {}
    },
    template: '<div />',
  })

  mount(TestComponent)
  return { result: result!, model }
}

describe('usePulseField', () => {
  it('returns isFormMode false in standalone mode', () => {
    const { result } = mountComposable('hello')
    expect(result.isFormMode).toBe(false)
  })

  it('returns the modelValue ref as value in standalone mode', () => {
    const { result, model } = mountComposable('hello')
    expect(result.value.value).toBe('hello')
    model.value = 'world'
    expect(result.value.value).toBe('world')
  })

  it('returns undefined errorMessage in standalone mode initially', () => {
    const { result } = mountComposable('')
    expect(result.errorMessage.value).toBeUndefined()
  })

  it('handleBlur is a no-op function in standalone mode', () => {
    const { result } = mountComposable('')
    expect(() => result.handleBlur()).not.toThrow()
  })

  it('returns isFormMode true when inside a vee-validate form context', () => {
    let result: ReturnType<typeof usePulseField> | undefined

    const Inner = defineComponent({
      setup() {
        result = usePulseField({ name: 'email', modelValue: ref('') })
        return {}
      },
      template: '<div />',
    })

    mount(Form, {
      slots: { default: Inner },
    })

    expect(result!.isFormMode).toBe(true)
  })
})
