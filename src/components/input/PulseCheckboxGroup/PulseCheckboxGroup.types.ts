import { PulseCheckboxProps } from '@/components'
import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseCheckboxGroupValue = (string | number)[]

export type PulseCheckboxGroupProps = PulseInputWrapperProps & {
  options: PulseCheckboxGroupOptions
}

export type PulseCheckboxGroupOptions = PulseCheckboxProps[]
