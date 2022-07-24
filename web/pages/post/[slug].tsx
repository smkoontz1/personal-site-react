import { NextPage } from 'next'
import SanityClient from '../../sanityClient'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import styles from '../../styles/Post.module.scss'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import PostLayout from '../../components/blog/post/PostLayout'
import MainLayout from '../../components/common/MainLayout'

interface Props {
  post: any
}

const builder = imageUrlBuilder(SanityClient)

function urlFor (source: any) {
  return builder.image(source)
}

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <img
          alt={value.alt || ' '}
          loading='lazy'
          src={urlFor(value).width(320).height(240).fit('max').auto('format').url()}
        />
      )
    }
  }
}

const Post: NextPageWithLayout<Props> = ({ post }) => {
  const {
    title,
    name,
    authorImage,
    body = []
  } = post

  return (
    <article>
      <div className={styles.postHeader}>
        <h1>{title}</h1>
        <p>By {name}</p>
      </div>
      <div className={styles.postBody}>
        <PortableText 
          value={body}
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

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "authorImage": author->image,
  body
}`

export async function getStaticPaths() {
  const paths = await SanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

export async function getStaticProps(context: any) {
  const { slug = '' } = context.params
  const post = await SanityClient.fetch(query, { slug })

  return {
    props: {
      post
    }
  }
}

export default Post