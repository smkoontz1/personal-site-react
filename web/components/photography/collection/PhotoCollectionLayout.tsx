import { ReactElement } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from '../../../styles/photo/collection/PhotoCollection.module.scss'

interface Props {
  children: ReactElement
}

export default function PhotoCollectionLayout(props: Props) {
  const { children } = props

  return (
    <Row className={styles.photoCollectionPageShell}>
      <Col>
        <div className={styles.photoCollectionPage}>
          {children}
        </div>
      </Col>
    </Row>
  )
}