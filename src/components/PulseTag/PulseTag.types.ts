import type { IconTitle } from '../../iconRegistry'
import type { PulseColour } from '../../types/colour'

export type PulseTagProps = {
  value?: string | number
  colour: PulseColour
  iconTitle?: IconTitle
}
