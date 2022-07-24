import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import styles from '../../../styles/blog/post/Post.module.scss'
import { TypedObject } from '@sanity/types/dist/dts'

interface Props {
  title: string,
  date: Date,
  author: string,
  excerpt: TypedObject,
  slug: string
}

export default function PostPreviewCard(props: Props) {
  const {
    title,
    date,
    author,
    excerpt,
    slug
  } = props

  return (
    <div className={`${styles.postContainer} ${styles.excerpt}`}>
      <div className={styles.postHeader}>
        <h1>{title}</h1>
        <p>{date.toDateString()} - {author}</p>
      </div>
      <div className={styles.postBody}>
        <PortableText
          value={excerpt}
        />
      </div>
      <div className='flex flex-row mt-5 justify-end'>
        <Link href='blog/post/[slug]' as={`blog/post/${slug}`}>
          <a className={styles.readMoreLink} target="_self">
            Read More
            <i className='octicon arrow-right height:24'></i>
          </a>
        </Link>
      </div>
    </div>
  )
}