import { NextPage } from 'next'
import SanityClient from '../../sanityClient'
import {  } from '@sanity/types'

interface Props {
  post: any
}

const Post: NextPage<Props> = ({ post }) => {
  const { title, name } = post

  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await SanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

export async function getStaticProps(context: any) {
  const { slug = '' } = context.params
  const post = await SanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{title, "name": author->name}`,
    { slug }
  )

  return {
    props: {
      post
    }
  }
}

export default Post