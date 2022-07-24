import { ReactElement } from 'react'
import SanityClient from '../sanityClient'
import MainLayout from '../components/common/MainLayout'
import { NextPageWithLayout } from './_app'
import groq from 'groq'
import Link from 'next/link'

interface Props {
  posts: any
}

export const Blog: NextPageWithLayout<Props> = ({ posts }) => {

  return (
    <div>
      <h1>Welcome to blog!</h1>
      {posts && posts.map(
          ({ _id,
            title = '',
            slug = { current: '' },
            publishedAt = ''
          }: {
            _id: string,
            title: string,
            slug: { current: string },
            publishedAt: string
          }) =>
            slug && (
              <li key={_id}>
                <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                  <a>{title}</a>
                </Link>{' '}
                ({new Date(publishedAt).toDateString()})
              </li>
            )
        )}
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
  const posts = await SanityClient.fetch(
    groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`
  )

  return {
    props: {
      posts
    }
  }
}

export default Blog