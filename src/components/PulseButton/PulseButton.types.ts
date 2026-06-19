import type { IconTitle } from '../../iconRegistry'

export type PulseButtonType = 'primary' | 'secondary'
export type PulseButtonHtmlType = 'submit' | 'button' | 'reset'

export type PulseButtonProps = {
  label: string
  type?: PulseButtonType
  htmlType?: PulseButtonHtmlType
  icon?: IconTitle
  disabled?: boolean
  loading?: boolean
  small?: boolean
  fullWidth?: boolean
}
