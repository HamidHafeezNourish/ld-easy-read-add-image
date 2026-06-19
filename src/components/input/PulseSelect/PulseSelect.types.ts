import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseSelectValue = string | number | null

export type PulseSelectOption<T = PulseSelectValue> = {
  label: string
  value: T
}
export type PulseSelectOptions<T = PulseSelectValue> = PulseSelectOption<T>[]

export type PulseSelectProps<T = PulseSelectValue> = PulseInputWrapperProps & {
  options: PulseSelectOptions<T>
  optionLabel?: string
  optionValue?: string
  filter?: boolean
  emptyFilterMessage?: string
  truncate?: boolean
}
