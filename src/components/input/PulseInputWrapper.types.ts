import type { IconTitle } from '@/iconRegistry'
import { PulseCheckboxValue } from './PulseCheckbox'
import { PulseCheckboxGroupValue } from './PulseCheckboxGroup'
import { PulseCompositeCheckboxValue } from './PulseCompositeCheckbox'
import { PulseInputTextValue } from './PulseInputText'
import { PulseDatePickerValue } from './PulseDatePicker'
import { PulseInputTextAreaValue } from './PulseInputTextArea'
import { PulseInputRichTextValue } from './PulseInputRichText'
import { PulseNumberSelectButtonValue } from './PulseNumberSelectButton'
import { PulseSelectValue } from './PulseSelect'
import { PulseTreeSelectValue } from './PulseTreeSelect'

export type PulseInputValue =
  | PulseCheckboxValue
  | PulseCheckboxGroupValue
  | PulseCompositeCheckboxValue
  | PulseInputTextValue
  | PulseDatePickerValue
  | PulseInputTextAreaValue
  | PulseInputRichTextValue
  | PulseNumberSelectButtonValue
  | PulseSelectValue
  | PulseTreeSelectValue

export type PulseInputSize = 'small' | 'medium'

export type PulseInputWrapperDefaultProps = {
  fullWidth?: boolean
  size?: PulseInputSize
}

export type PulseInputWrapperProps = {
  inputId: string
  label?: string
  labelIcon?: IconTitle
  placeholder?: string
  hint?: string
  icon?: IconTitle
  required?: boolean
  disabled?: boolean
  error?: string
} & PulseInputWrapperDefaultProps
