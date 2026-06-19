import { inject, ref } from 'vue'
import { useField, FormContextKey } from 'vee-validate'
import { PulseFieldContext, UsePulseFieldOptions } from '@/composables/useFormField.types'

export function usePulseField<T>(options: UsePulseFieldOptions<T>): PulseFieldContext<T> {
  const form = inject(FormContextKey, null)

  // Form mode: if inside a vee-validate Form AND name is provided
  if (form && options.name) {
    const field = useField<T>(options.name, undefined, {
      validateOnValueUpdate: false, // Only validate on submit
    })

    return {
      value: field.value,
      errorMessage: field.errorMessage,
      handleBlur: field.handleBlur,
      isFormMode: true,
    }
  }

  // Standalone mode: not in a form or no name provided
  const errorMessage = ref<string | undefined>()

  return {
    value: options.modelValue,
    errorMessage,
    handleBlur: () => {},
    isFormMode: false,
  }
}
