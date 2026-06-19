export type PulseDrawerPosition = 'left' | 'right' | 'top' | 'bottom'

export type PulseDrawerProps = {
  visible?: boolean
  position?: PulseDrawerPosition
  title?: string
  showCloseIcon?: boolean
  breadcrumb?: string
  breadcrumbCallback?: () => void
  captionOne?: string
  captionTwo?: string
  captionThree?: string
  beforeClose?: () => boolean | Promise<boolean>
}
