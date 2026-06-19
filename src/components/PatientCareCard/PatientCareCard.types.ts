import type { PulseStatus } from '@/types/colour'

export type PatientCareCardProps = {
  patientName: string
  carePlanStatus: PulseStatus
  carePlanStatusLabel: string
  actionLabel: string
}
