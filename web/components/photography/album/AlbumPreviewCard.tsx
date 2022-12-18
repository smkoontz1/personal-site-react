import PreviewCard from '../../common/PreviewCard'
import Link from 'next/link'
import styles from '../../../styles/photo/album/Album.module.scss'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

interface Props {
  title: string,
  slug: string,
  coverImgUrl: string,
}

export default function AlbumPreviewCard(props: Props) {
  const {
    title,
    slug,
    coverImgUrl
  } = props

  const cardImg = <Card.Img src={coverImgUrl} alt='Card image' />
  
  const cardBody =
    <Card.Body>
      <Container>
        <Row>
          <Col>
            <Card.Text>{title.toUpperCase()}</Card.Text>
          </Col>
          <Col className={styles.footerButtonShell}>
            <Link href={`photo/album/[slug]`} as={`photo/album/${slug}`} passHref>
              <Button variant='secondary'>View Album</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Card.Body>

  return (
    <PreviewCard
      cardImage={cardImg}
      cardBody={cardBody}
    />
  )
}