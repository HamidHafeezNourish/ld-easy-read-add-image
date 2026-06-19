import type { PulseColour } from '../../types/colour'
import type { IconTitle } from '../../iconRegistry'

export type PatientTag = {
  value: string
  colour: PulseColour
  iconTitle?: IconTitle
}

export type StatItem = {
  count: number
  label: string
  iconUrl?: string
}

export type RecentlyUpdatedCard = {
  id: string
  title: string
  category: string
  description: string
}

export type AdminItem = {
  id: string
  title: string
  description: string
  iconUrl?: string
  icon?: IconTitle
  iconBg?: string
  stats: StatItem[]
}

export type CareDomainRow = {
  id: string
  title: string
  description: string
  iconUrl?: string
  iconBg?: string
  stats: StatItem[]
}

export type SidebarNavItem = {
  id: string
  label: string
  badge?: number
  children?: SidebarNavItem[]
}

export type CarePlanHomeProps = {
  patientName: string
  patientAge: string
  patientAvatarUrl?: string
  patientTags?: PatientTag[]
  recentlyUpdated?: RecentlyUpdatedCard[]
  adminItems?: AdminItem[]
  careDomains?: CareDomainRow[]
  sidebarQuickLinks?: SidebarNavItem[]
  sidebarDomains?: SidebarNavItem[]
}
