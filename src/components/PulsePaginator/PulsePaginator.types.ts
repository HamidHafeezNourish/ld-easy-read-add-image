export type PulsePaginatorMode = 'local' | 'remote'

export type PulsePaginatorProps = {
  currentPage: number
  rows: number
  mode?: PulsePaginatorMode
  // Only required for 'local' mode
  items?: Array<unknown>
  // Only required for 'remote' mode
  total?: number
  rowsPerPageOptions?: number[]
  alwaysShow?: boolean
}
