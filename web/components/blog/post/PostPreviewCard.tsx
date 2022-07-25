import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { TypedObject } from '@sanity/types/dist/dts'
import PreviewCard from '../../common/PreviewCard'
import { FaArrowRight } from 'react-icons/fa'
import styles from '../../../styles/blog/post/Post.module.scss'
import { DateTime } from 'luxon'

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

  const formattedDate = DateTime.fromJSDate(date).toFormat('dd LLL yyyy')

  return (
    <PreviewCard>
      <>
        <div className={styles.postHeader}>
          <h1>{title}</h1>
          <p>{formattedDate} - {author}</p>
        </div>
        <div className={styles.postBody}>
          <PortableText
            value={excerpt}
          />
        </div>
        <div className='flex flex-row mt-5 justify-end'>
          <Link href='blog/post/[slug]' as={`blog/post/${slug}`}>
            <a className={styles.readMoreLink} target="_self">
              Read More <FaArrowRight className={styles.arrow} />
            </a>
          </Link>
        </div>
      </>
    </PreviewCard>
  )
}