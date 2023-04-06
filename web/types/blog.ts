import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { TypedObject } from '@sanity/types/dist/dts'

export interface PostPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  author: string,
  publishedAt: string,
  excerpt: TypedObject
}

export interface PostResponse {
  title: string
  authorName: string,
  authorImage: SanityImageSource,
  publishedAt: string,
  body: TypedObject  
}