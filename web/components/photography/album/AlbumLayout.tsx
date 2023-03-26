import { ReactElement } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from '../../../styles/photo/album/Album.module.scss'

interface Props {
  children: ReactElement
}

export default function AlbumLayout(props: Props) {
  const { children } = props

  return (
    <>
      {children}
    </>
    // <Row className={styles.albumPageShell}>
      // <Col md={8} className={styles.albumPage}>
      // </Col>
    // </Row>
  )
}