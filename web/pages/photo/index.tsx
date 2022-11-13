import { ReactElement } from 'react'
import MainLayout from '../../components/common/MainLayout'
import SanityClient from '../../sanityClient'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import AlbumPreviewCard from '../../components/photography/album/AlbumPreviewCard'
import { urlFor } from '../../utilities/sanityUtils'

interface Props {
  albumPreviews: AlbumPreviewResponse[]
}

interface AlbumPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  coverImage: SanityImageSource
}

export const Photography: NextPageWithLayout<Props> = ({ albumPreviews }) => {
  let fakeAlbumPreviews: JSX.Element[] = []
  
  for (let i = 1; i <= 6; i++) {
    const albumPreview =
    <li key={i}>
      <AlbumPreviewCard
        title={`Image ${i}`}
        slug={`album-${i}`}
        coverImgUrl='https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg'
      />
    </li>

    fakeAlbumPreviews.push(albumPreview)
  }
  
  return (
    <ul className='p-0'>
      {fakeAlbumPreviews}
      {/* {albumPreviews && albumPreviews.map((albumPreview) => {
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
      })} */}
    </ul>
  )
  
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
  // const albumPreviews = await SanityClient.fetch(
  //   groq`*[_type == "photoAlbum"]{
  //     _id,
  //     title,
  //     slug,
  //     "coverImage": images[0]
  //   } | order(title asc)`
  // ) as AlbumPreviewResponse[]

  const albumPreviews: AlbumPreviewResponse[] = []

  return {
    props: {
      albumPreviews
    }
  }
}

export default Photography