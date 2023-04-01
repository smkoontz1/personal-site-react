import { ReactElement } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from '../../../styles/blog/post/Post.module.scss'

interface Props {
  children: ReactElement
}

export default function PostLayout(props: Props) {
  const { children } = props

  return (
    <Row>
      <Col>
        <div className={styles.postPage}>
          {children}
        </div>
      </Col>
    </Row>
  )
}