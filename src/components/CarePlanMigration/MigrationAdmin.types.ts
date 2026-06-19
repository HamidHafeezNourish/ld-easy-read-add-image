export type MigrationServiceStatus = 'not-set' | 'scheduled' | 'in-progress'

export type MigrationService = {
  id: string
  name: string
  startDate: string | null
  status: MigrationServiceStatus
  active: boolean
}

export type MigrationStatusCounts = {
  notSet: number
  scheduled: number
  inProgress: number
}

export type MigrationAdminProps = {
  services: MigrationService[]
  totalRecords?: number
  currentPage?: number
  rows?: number
  rowsPerPageOptions?: number[]
  loading?: boolean
  toggleFirst?: boolean
  hideToggle?: boolean
}
