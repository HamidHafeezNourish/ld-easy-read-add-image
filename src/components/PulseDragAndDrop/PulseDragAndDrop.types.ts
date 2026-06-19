export type PulseDragAndDropProps = {
  addLabel?: string
  removeLabel?: string
  removeMethod?: (item: PulseDragAndDropItem) => boolean | Promise<boolean>
}

export type PulseDragAndDropItem = {
  id: string
  removeDisabled?: boolean
  removeDisabledText?: string
  [key: string]: unknown
}
