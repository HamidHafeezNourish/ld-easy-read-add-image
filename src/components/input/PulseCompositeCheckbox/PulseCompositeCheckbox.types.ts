import { PulseInputSize } from '../PulseInputWrapper.types'

export type PulseCompositeCheckboxValue = CompositeCheckboxItem[]

export type PulseCompositeCheckboxProps = {
  inputId: string
  header: string
  hint?: string
  checkboxHint?: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  size?: PulseInputSize
}

export type CompositeCheckboxItem = {
  id: number
  label: string
  checked: boolean
  inputValue: string
  inputId: string
}
