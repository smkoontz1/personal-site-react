import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import groq from 'groq'
import { ReactElement } from 'react'
import MainLayout from '../../../components/common/MainLayout'
import SanityClient from '../../../sanityClient'
import { NextPageWithLayout } from '../../_app'
import { urlFor } from '../../../utilities/sanityUtils'
import styles from '../../../styles/photo/collection/PhotoCollection.module.scss'
import PhotoCollectionLayout from '../../../components/photography/collection/PhotoCollectionLayout'
import { Photo } from 'react-photo-album'
import PhotoGallery from '../../../components/photography/collection/PhotoGallery'

interface Props {
  photoCollection: PhotoCollectionResponse
}

interface PhotoCollectionResponse {
  title: string,
  year: number,
  images: SanityImageSource[]
}

interface SanityImageSourceRef {
  asset: {
    _ref: string
  }
}

const SANITY_DIMENSIONS_REGEX = /-([0-9]+)x([0-9]+)-[a-z]+$/

const getDimensions = (sanityImgRef: string): [number, number] => {
  let width = 0
  let height = 0
  
  const match = sanityImgRef.match(SANITY_DIMENSIONS_REGEX)
  if (match && match.length >= 3) {
    width = Number.parseInt(match[1])
    height = Number.parseInt(match[2])
  }

  return [width, height]
} 

const Album: NextPageWithLayout<Props> = ({ photoCollection }) => {
  // TODO: destructure the props
  // For some reason it breaks the build

  const sanityImages = photoCollection?.images as (SanityImageSource & SanityImageSourceRef)[]

  const photoGalleryImages: Photo[] = sanityImages?.map(img => {
    const imgRef = img.asset._ref
    const dimensions = getDimensions(imgRef)

    return {
      src: urlFor(img).height(720).url(),
      width: dimensions[0],
      height: dimensions[1]
    }
  })

  return (
    <>
      <h1>{photoCollection?.title?.toUpperCase()} - {photoCollection?.year}</h1>
      <div className={styles.galleryComponent}>
        <PhotoGallery photos={photoGalleryImages} />
      </div>
    </>
  )
}

Album.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout useBackgroundImage={false}>
      <PhotoCollectionLayout>
        {page}
      </PhotoCollectionLayout>
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const paths = await SanityClient.fetch(
    groq`*[_type == "photoCollectionV1" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

const photoCollectionQuery = groq`*[_type == "photoCollectionV1" && slug.current == $slug][0]{
  title,
  year,
  images
}`

export async function getStaticProps(context: any) {
  const { slug = '' } = context.params
  const photoCollection = await SanityClient.fetch(photoCollectionQuery, { slug }) as PhotoCollectionResponse

  return {
    props: {
      photoCollection: photoCollection ?? {}
    }
  }
}

export default Album