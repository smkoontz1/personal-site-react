import { ReactElement } from 'react'
import SanityClient from '../../sanityClient'
import MainLayout from '../../components/common/MainLayout'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import PostPreviewCard from '../../components/blog/post/PostPreviewCard'
import { Col, Row } from 'react-bootstrap'
import styles from '../../styles/blog/post/Post.module.scss'
import { PostPreviewResponse } from '../../types/blog'

interface Props {
  postPreviews: PostPreviewResponse[]
}

export const Blog: NextPageWithLayout<Props> = ({ postPreviews }) => {
  const postPreviewCards = postPreviews?.map(postPreview => {
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
        <PostPreviewCard
          title={title}
          date={new Date(publishedAt)}
          author={author}
          excerpt={excerpt}
          slug={slug.current}
        />
      )
    )
  })
  
  return postPreviews && (
    <Row className={styles.postPreviewRow}>
      <Col md={8}>
        {postPreviewCards}
      </Col>
    </Row>
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