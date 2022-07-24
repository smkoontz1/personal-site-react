import { ReactElement } from 'react'
import MainLayout from '../../components/common/MainLayout'
import SanityClient from '../../sanityClient'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface Props {
  albumPreviews: AlbumPreviewResponse[]
}

interface AlbumPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  images: SanityImageSource[]
}

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(SanityClient).image(source)
}

export const Photography: NextPageWithLayout<Props> = ({ albumPreviews }) => {
  const testPreview = albumPreviews[0]
  const imageDeal = testPreview.images[0]

  return (
    <>
      <h1>{testPreview.title}</h1>
      <div>
        <img 
          src={urlFor(imageDeal).width(200).url()}
        />
      </div>
    </>
  )
}

Photography.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export async function getStaticProps() {
  const albumPreviews = await SanityClient.fetch(
    groq`*[_type == "photoAlbum"]{
      _id,
      title,
      slug,
      images
    }`
  ) as AlbumPreviewResponse[]

  return {
    props: {
      albumPreviews
    }
  }
}

export default Photography