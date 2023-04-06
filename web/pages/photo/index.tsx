import { ReactElement } from 'react'
import MainLayout from '../../components/common/MainLayout'
import SanityClient from '../../sanityClient'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import PhotoCollectionPreviewCard from '../../components/photography/collection/PhotoCollectionPreviewCard'
import { urlFor } from '../../utilities/sanityUtils'
import { Col, Row } from 'react-bootstrap'
import { PhotoCollectionPreviewResponse } from '../../types/photo'

interface Props {
  photoCollectionPreviews: PhotoCollectionPreviewResponse[]
}

export const Photography: NextPageWithLayout<Props> = ({ photoCollectionPreviews }) => {
  const rowSize = 2
  const numRows = photoCollectionPreviews.length / rowSize
  const remainingPreviews = photoCollectionPreviews.length % rowSize
  let leftColumnIndex = 0

  let rowElements: JSX.Element[] = []

  for (let row = 1; row <= numRows; row++) {
    const leftPreview = photoCollectionPreviews[leftColumnIndex]
    const rightPreview = photoCollectionPreviews[leftColumnIndex + 1]
    
    const rowElement =
      <Row>
        <Col lg={6}>
          <PhotoCollectionPreviewCard
            title={leftPreview?.title}
            slug={leftPreview?.slug.current}
            year={leftPreview?.year}
            coverImgUrl={urlFor(leftPreview?.coverImage).height(720).url()}
          />
        </Col>
        <Col lg={6}>
          <PhotoCollectionPreviewCard
            title={rightPreview?.title}
            slug={rightPreview?.slug.current}
            year={rightPreview?.year}
            coverImgUrl={urlFor(rightPreview?.coverImage).height(720).url()}
          />
        </Col>
      </Row>

    rowElements = [...rowElements, rowElement]
    leftColumnIndex += 2
  }

  if (remainingPreviews > 0)
  {
    const lastPreview = photoCollectionPreviews[photoCollectionPreviews.length - 1]

    const lastRowElement =
      <Row>
        <Col lg={6}>
          <PhotoCollectionPreviewCard
            title={lastPreview?.title}
            year={lastPreview?.year}
            slug={lastPreview?.slug.current}
            coverImgUrl={urlFor(lastPreview?.coverImage).height(720).url()}
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
  const photoCollectionPreviews = await SanityClient.fetch(
    groq`*[_type == "photoCollectionV1"]{
      _id,
      title,
      slug,
      year,
      "coverImage": images[0]
    } | order(year desc, title asc)`
  ) as PhotoCollectionPreviewResponse[]

  return {
    props: {
      photoCollectionPreviews
    }
  }
}

export default Photography