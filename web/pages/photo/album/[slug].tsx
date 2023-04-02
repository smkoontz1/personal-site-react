import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import groq from 'groq'
import { ReactElement, useState } from 'react'
import MainLayout from '../../../components/common/MainLayout'
import SanityClient from '../../../sanityClient'
import { NextPageWithLayout } from '../../_app'
import { urlFor } from '../../../utilities/sanityUtils'
import styles from '../../../styles/photo/album/Album.module.scss'
import AlbumLayout from '../../../components/photography/album/AlbumLayout'
import { PhotoAlbum, Photo } from 'react-photo-album'
import Lightbox, { Slide } from 'yet-another-react-lightbox'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

interface Props {
  album: AlbumResponse
}

interface AlbumResponse {
  title: string,
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

const Album: NextPageWithLayout<Props> = ({ album }) => {
  // TODO: destructure the props
  // For some reason it breaks the build

  const sanityImages = album?.images as (SanityImageSource & SanityImageSourceRef)[]

  const photoAlbumImages: Photo[] = sanityImages?.map(img => {
    const imgRef = img.asset._ref
    const dimensions = getDimensions(imgRef)

    return {
      src: urlFor(img).url(),
      width: dimensions[0],
      height: dimensions[1]
    }
  })

  const lightboxSlides: Slide[] = photoAlbumImages?.map(({ src, width, height, images }) => {
    return {
      src,
      width,
      height,
      srcSet: images?.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height
      }))
    }
  })

  const [photoIndex, setPhotoIndex] = useState(-1)

  return (
    <>
      <h1>{album?.title?.toUpperCase()}</h1>
      <div className={styles.galleryComponent}>
        <PhotoAlbum
          layout={'rows'}
          photos={photoAlbumImages}
          onClick={({ index }) => setPhotoIndex(index)}
        />
        <Lightbox
          slides={lightboxSlides}
          open={photoIndex >= 0}
          index={photoIndex}
          close={() => { setPhotoIndex(-1) }}
          plugins={[Slideshow, Thumbnails, Zoom]}
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