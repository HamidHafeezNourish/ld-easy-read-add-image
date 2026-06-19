import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseNumberSelectButtonValue = number | null

export type PulseNumberSelectButtonScaleType = 5 | 10

export type PulseNumberSelectButtonProps = PulseInputWrapperProps & {
  scale?: PulseNumberSelectButtonScaleType
}
