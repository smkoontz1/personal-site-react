import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface PhotoCollectionPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  year: number,
  coverImage: SanityImageSource
}

export interface PhotoCollectionResponse {
  title: string,
  year: number,
  images: SanityImageSource[]
}

export interface SanityImageSourceRef {
  asset: {
    _ref: string
  }
}