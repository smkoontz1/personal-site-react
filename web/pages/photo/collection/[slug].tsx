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
import { PhotoCollectionResponse, SanityImageSourceRef } from '../../../types/photo'
import { IconContext } from 'react-icons'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'

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

interface Props {
  photoCollection: PhotoCollectionResponse
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
      <div className={styles.photoCollectionHeaderShell}>
        <div className={`mb-1 me-3 ${styles.backButton}`}>
          <IconContext.Provider value={{ size: '30' }}>
            <Link href={'/photo'} passHref>
              <BsArrowLeft />
            </Link>
          </IconContext.Provider>
        </div>
        <h2>{photoCollection?.title?.toUpperCase()} <span className={'h4'}>({photoCollection?.year})</span></h2>
      </div>
      <div className={styles.galleryComponent}>
        <PhotoGallery photos={photoGalleryImages} />
      </div>
    </>
  )
}

Album.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
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