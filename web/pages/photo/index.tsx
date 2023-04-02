import { ReactElement } from 'react'
import MainLayout from '../../components/common/MainLayout'
import SanityClient from '../../sanityClient'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import AlbumPreviewCard from '../../components/photography/album/AlbumPreviewCard'
import { urlFor } from '../../utilities/sanityUtils'
import { Col, Row } from 'react-bootstrap'

interface AlbumPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  coverImage: SanityImageSource
}

interface Props {
  albumPreviews: AlbumPreviewResponse[]
}

export const Photography: NextPageWithLayout<Props> = ({ albumPreviews }) => {
  const rowSize = 2
  const numRows = albumPreviews.length / rowSize
  const remainingPreviews = albumPreviews.length % rowSize
  let leftColumnIndex = 0

  let rowElements: JSX.Element[] = []

  for (let row = 1; row <= numRows; row++) {
    const leftPreview = albumPreviews[leftColumnIndex]
    const rightPreview = albumPreviews[leftColumnIndex + 1]
    
    const rowElement =
      <Row>
        <Col lg>
          <AlbumPreviewCard
            title={leftPreview.title}
            slug={leftPreview.slug.current}
            coverImgUrl={urlFor(leftPreview.coverImage).url()}
          />
        </Col>
        <Col lg>
          <AlbumPreviewCard
            title={rightPreview.title}
            slug={rightPreview.slug.current}
            coverImgUrl={urlFor(rightPreview.coverImage).url()}
          />
        </Col>
      </Row>

    rowElements = [...rowElements, rowElement]
    leftColumnIndex += 2
  }

  if (remainingPreviews > 0)
  {
    const lastPreview = albumPreviews[albumPreviews.length - 1]

    const lastRowElement =
      <Row>
        <Col lg>
          <AlbumPreviewCard
            title={lastPreview.title}
            slug={lastPreview.slug.current}
            coverImgUrl={urlFor(lastPreview.coverImage).url()}
          />
        </Col>
      </Row>

    rowElements = [...rowElements, lastRowElement]
  }
  
  return (
    <>
      {rowElements}
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