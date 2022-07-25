import SanityClient from '../sanityClient'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(SanityClient).image(source)
}