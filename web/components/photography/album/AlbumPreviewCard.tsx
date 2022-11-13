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

  return (
    <div className={styles.previewCardShell}>
      <Card>
        <Card.Img src={coverImgUrl} alt='Card image' />
        <Card.Body>
          <Container fluid>
            <Row>
              <Col>
                <Card.Text>{title.toUpperCase()}</Card.Text>
              </Col>
              <Col className={styles.previewCardButtonShell}>
                <Button variant='secondary'>View Album</Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  )
}