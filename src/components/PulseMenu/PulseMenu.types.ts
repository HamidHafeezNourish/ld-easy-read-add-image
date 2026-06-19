import { IconTitle } from '../../iconRegistry'

export type PulseMenuProps = {
  items?: PulseMenuItems
  icon?: IconTitle
  ariaLabel?: string
}

export type PulseMenuItem<T = unknown> = {
  label: string
  icon?: IconTitle
  command?: (row: T) => void
  visible?: (row: T) => boolean
}

export type PulseMenuItems<T = unknown> = PulseMenuItem<T>[]
