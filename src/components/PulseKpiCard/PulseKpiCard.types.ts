export type PulseKpiDeltaDirection = 'up' | 'down'
export type PulseKpiDeltaSentiment = 'positive' | 'negative' | 'neutral'

export type PulseKpiCardProps = {
  title: string
  subheader?: string
  value: string | number
  units?: string
  deltaValue?: string
  deltaExplainer?: string
  deltaDirection?: PulseKpiDeltaDirection
  deltaSentiment?: PulseKpiDeltaSentiment
  displaySubheader?: boolean
  displayKpiUnits?: boolean
  displayKpiDelta?: boolean
}
