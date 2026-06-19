export type SectionStatus = 'resolved' | 'unmatched' | 'pending'

export type NavSection = {
  id: string
  name: string
  pageCount: number
  status: SectionStatus
  active?: boolean
}

export type PageRow = {
  id: string
  name: string
  progress: number
  mappedTo: string | null
}

export type TableGroup = {
  id: string
  name: string
  rows: PageRow[]
}

export type CarePlanMigrationProps = {
  residentName: string
  residentTags?: string[]
  stepNumber?: number
  totalSteps?: number
  stepTitle?: string
  stepDescription?: string
  sections?: NavSection[]
  tableGroups?: TableGroup[]
  sectionOptions?: string[]
  allMapped?: boolean
}
