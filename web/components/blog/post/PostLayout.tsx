import { ReactElement } from 'react'
import styles from '../../../styles/blog/post/Post.module.scss'

interface Props {
  children: ReactElement
}

export default function PostLayout(props: Props) {
  const { children } = props

  return (
    <div className={`${styles.postContainer} ${styles.page}`}>
      {children}
    </div>
  )
}