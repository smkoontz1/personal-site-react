import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { TypedObject } from '@sanity/types/dist/dts'
import PreviewCard from '../../common/PreviewCard'
import styles from '../../../styles/blog/post/Post.module.scss'
import { DateTime } from 'luxon'
import { Button, Card } from 'react-bootstrap'

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

  const cardBody = 
    <Card.Body>
      <div className={styles.postHeader}>
        <Card.Title as='h1'>{title}</Card.Title>
        <Card.Subtitle as="p">{formattedDate} - {author}</Card.Subtitle>
      </div>
      <Card.Text as='section' className={styles.postBody}>
        <PortableText
          value={excerpt}
        />
      </Card.Text>
      <div className={styles.footerButtonShell}>
        <Link href='blog/post/[slug]' as={`blog/post/${slug}`} passHref>
          <Button variant='secondary'>Read More</Button>
        </Link>
      </div>
    </Card.Body>
  
  return (
    <PreviewCard
      cardBody={cardBody}
    />
  )
}