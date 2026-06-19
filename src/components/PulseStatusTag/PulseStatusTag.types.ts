import { PulseStatus } from '@/types/colour'
import { IconTitle } from '@/iconRegistry'

export type PulseStatusTagProps = {
  value: string
  status: PulseStatus
  icon?: IconTitle
}
