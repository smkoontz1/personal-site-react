import SanityClient from '../../../sanityClient'
import groq from 'groq'
import { PortableText } from '@portabletext/react'
import styles from '../../../styles/blog/post/Post.module.scss'
import { NextPageWithLayout } from '../../_app'
import { ReactElement } from 'react'
import PostLayout from '../../../components/blog/post/PostLayout'
import MainLayout from '../../../components/common/MainLayout'
import { DateTime } from 'luxon'
import { PostResponse } from '../../../types/blog'
import { IconContext } from 'react-icons'
import { BsArrowLeft } from 'react-icons/bs'
import Link from 'next/link'

interface Props {
  post: PostResponse
}

const Post: NextPageWithLayout<Props> = ({ post }) => {
  // TODO: destructure the props
  // For some reason it breaks the build
  const formattedDate = DateTime.fromJSDate(new Date(post?.publishedAt)).toFormat('dd LLL yyyy')

  return (
    <article>
      <div className={styles.postHeader}>
        <div className={styles.postHeaderBackShell}>
          <div className={`mb-1 me-3 ${styles.backButton}`}>
            <IconContext.Provider value={{ size: '30' }}>
              <Link href={'/blog'} passHref>
                <BsArrowLeft />
              </Link>
            </IconContext.Provider>
          </div>
          <h1>{post?.title}</h1>
        </div>
        <p>{formattedDate} - {post?.authorName}</p>
      </div>
      <div className={styles.postBody}>
        <PortableText 
          value={post?.body}
        />
      </div>
    </article>
  )
}

Post.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <PostLayout>
        {page}
      </PostLayout>
    </MainLayout>
  )
}

export async function getStaticPaths() {
  const paths = await SanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "authorName": author->name,
  "authorImage": author->image,
  publishedAt,
  body
}`

export async function getStaticProps(context: any) {
  const { slug = '' } = context.params
  const post = await SanityClient.fetch(postQuery, { slug }) as PostResponse

  return {
    props: {
      post: post ?? {}
    }
  }
}

export default Post