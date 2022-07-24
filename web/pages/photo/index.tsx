import { ReactElement } from 'react'
import MainLayout from '../../components/common/MainLayout'
import SanityClient from '../../sanityClient'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import AlbumPreviewCard from '../../components/photography/album/AlbumPreviewCard'

interface Props {
  albumPreviews: AlbumPreviewResponse[]
}

interface AlbumPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  coverImage: SanityImageSource
}

function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(SanityClient).image(source)
}

export const Photography: NextPageWithLayout<Props> = ({ albumPreviews }) => {
  return (
    <ul>
      {albumPreviews && albumPreviews.map((albumPreview) => {
        const {
          _id,
          title,
          slug,
          coverImage
        } = albumPreview

        return (
          slug && (
            <li key={_id}>
              <AlbumPreviewCard
                title={title}
                slug={slug.current}
                coverImgUrl={urlFor(coverImage).url()}
              />
            </li>
          )
        )
      })}
    </ul>
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
      "coverImage": images[0]
    } | order(title asc)`
  ) as AlbumPreviewResponse[]

  return {
    props: {
      albumPreviews
    }
  }
}

export default Photography