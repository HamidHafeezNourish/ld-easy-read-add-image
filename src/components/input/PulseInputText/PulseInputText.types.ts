import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseInputTextValue = string

export type PulseInputTextProps = PulseInputWrapperProps & {
  maxlength?: number
  showClear?: boolean
}
