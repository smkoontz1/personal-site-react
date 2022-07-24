import { ReactElement } from 'react'
import SanityClient from '../../sanityClient'
import MainLayout from '../../components/common/MainLayout'
import { NextPageWithLayout } from '../_app'
import groq from 'groq'
import PostPreviewCard from '../../components/blog/post/PostPreviewCard'
import { TypedObject } from '@sanity/types/dist/dts'

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

  console.log(postPreviews[0])

  return (
    <div>
      <ul>
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
              <li key={_id}>
                <PostPreviewCard
                  title={title}
                  date={new Date(publishedAt)}
                  author={author}
                  excerpt={excerpt}
                  slug={slug.current}
                />
              </li>
            )
          )
        })}
      </ul>
    </div>
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