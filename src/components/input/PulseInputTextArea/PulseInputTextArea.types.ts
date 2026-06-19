import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseInputTextAreaValue = string

export type PulseInputTextAreaProps = PulseInputWrapperProps & {
  rows?: number
  cols?: number
  maxlength?: number
}
