import { IconTitle } from '../../iconRegistry'
import { PulseColour, PulseStatusColour } from '../../types'

export type PulseIconSize = 'xxsmall' | 'xsmall' | 'small' | 'regular' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'

export type PulseIconProps = {
  icon: IconTitle
  size?: PulseIconSize
  colour?: PulseColour | PulseStatusColour
  overrideColour?: string
}
