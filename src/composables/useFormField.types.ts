import type { Ref } from 'vue'
import type { FieldContext } from 'vee-validate'

type StandaloneFieldContext<T> = {
  value: Ref<T>
  errorMessage: Ref<string | undefined>
  handleBlur: () => void
  isFormMode: false
}

type VeeFieldContext<T> = Pick<FieldContext<T>, 'value' | 'errorMessage' | 'handleBlur'> & {
  isFormMode: true
}

export type PulseFieldContext<T> = StandaloneFieldContext<T> | VeeFieldContext<T>

export interface UsePulseFieldOptions<T> {
  name?: string
  modelValue: Ref<T>
}
