export type PulseGalleryProps = {
  images: PulseGalleryImages
  title?: string
  rowsPerPage?: number
}

export type PulseGalleryImage = {
  itemImageSrc: string
  thumbnailImageSrc: string
  alt: string
  title: string
  metadata?: string
  caption?: string
}

export type PulseGalleryImages = PulseGalleryImage[]
