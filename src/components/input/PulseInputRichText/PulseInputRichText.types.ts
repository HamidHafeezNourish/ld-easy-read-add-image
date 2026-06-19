import type { PulseInputWrapperProps } from '../PulseInputWrapper.types'

export type PulseInputRichTextValue = string

export type PulseInputRichTextProps = PulseInputWrapperProps & {
  editorStyle?: string
  maxlength?: number
  readonly?: boolean
  showFontSize?: boolean
  showFontFamily?: boolean
  minimalStyling?: boolean
}
