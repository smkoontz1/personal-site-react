import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import groq from 'groq'
import { ReactElement } from 'react'
import MainLayout from '../../../components/common/MainLayout'
import SanityClient from '../../../sanityClient'
import { NextPageWithLayout } from '../../_app'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { urlFor } from '../../../utilities/sanityUtils'
import styles from '../../../styles/photo/album/Album.module.scss'
import AlbumLayout from '../../../components/photography/album/AlbumLayout'

interface Props {
  album: AlbumResponse
}

interface AlbumResponse {
  title: string,
  images: SanityImageSource[]
}

const Album: NextPageWithLayout<Props> = ({ album }) => {
  // TODO: destructure the props
  // For some reason it breaks the build
  
  const imageGalleryItems: ReactImageGalleryItem[] = album?.images.map(img => {
    return {
      original: urlFor(img).url(),
      thumbnail: urlFor(img).width(200).url(),
    }
  }) ?? []

  return (
    <>
      <h1>{album?.title.toUpperCase()}</h1>
      <div className={styles.galleryComponent}>
        <ImageGallery
          items={imageGalleryItems}
          lazyLoad
          thumbnailPosition='right'
          slideDuration={1000}
          slideInterval={5000}
        />
      </div>
    </>
  )
}

Album.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout useBackgroundImage={false}>
      <AlbumLayout>
        {page}
      </AlbumLayout>
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const paths = await SanityClient.fetch(
    groq`*[_type == "photoAlbum" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

const photoAlbumQuery = groq`*[_type == "photoAlbum" && slug.current == $slug][0]{
  title,
  images
}`

export async function getStaticProps(context: any) {
  const { slug = '' } = context.params
  const album = await SanityClient.fetch(photoAlbumQuery, { slug }) as AlbumResponse

  return {
    props: {
      album: album ?? {}
    }
  }
}

export default Album