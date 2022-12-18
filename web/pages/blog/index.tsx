import { ReactElement } from 'react'
import SanityClient from '../../sanityClient'
import MainLayout from '../../components/common/MainLayout'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import PostPreviewCard from '../../components/blog/post/PostPreviewCard'
import { TypedObject } from '@sanity/types/dist/dts'
import { Col, Row } from 'react-bootstrap'
import styles from '../../styles/blog/post/Post.module.scss'

interface Props {
  postPreviews: PostPreviewResponse[]
}

interface PostPreviewResponse {
  _id: string
  title: string
  slug: { current: string }
  author: string,
  publishedAt: string,
  excerpt: TypedObject
}

export const Blog: NextPageWithLayout<Props> = ({ postPreviews }) => {
  return (
    <>
      {postPreviews && postPreviews.map((postPreview) => {
        const {
          _id,
          title,
          slug,
          author,
          publishedAt,
          excerpt
        } = postPreview
        
        return (
          slug && (
            <Row className={styles.postPreviewRow}>
              <Col md={8}>
                <PostPreviewCard
                  title={title}
                  date={new Date(publishedAt)}
                  author={author}
                  excerpt={excerpt}
                  slug={slug.current}
                />
              </Col>
            </Row>
          )
        )
      })}
    </>
  )
}

Blog.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export async function getStaticProps() {
  const postPreviews = await SanityClient.fetch(
    groq`*[_type == "post" && publishedAt < now()]{
      _id,
      title,
      slug,
      "author": author->name,
      publishedAt,
      excerpt
    } | order(publishedAt desc)`
  ) as PostPreviewResponse[]

  return {
    props: {
      postPreviews
    }
  }
}

export default Blog