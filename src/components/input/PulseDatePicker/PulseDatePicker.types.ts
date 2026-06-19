import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseDatePickerRangeValue = Date[] | (Date | null)[]
export type PulseDatePickerValue = Date | null | PulseDatePickerRangeValue

export type PulseDatePickerSelectionMode = 'single' | 'multiple' | 'range'
export type PulseDatePickerTimeMode = 'date' | 'datetime' | 'time'

export type PulseDatePickerProps = PulseInputWrapperProps & {
  minDate?: Date
  maxDate?: Date
  selectionMode?: PulseDatePickerSelectionMode
  numberOfMonths?: number
  dateFormat?: string
  timeMode?: PulseDatePickerTimeMode
}
