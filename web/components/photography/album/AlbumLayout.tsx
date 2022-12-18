import { ReactElement } from 'react'
import styles from '../../../styles/photo/album/Album.module.scss'

interface Props {
  children: ReactElement
}

export default function AlbumLayout(props: Props) {
  const { children } = props

  return (
    <div className={styles.albumPage}>
      {children}
    </div>
  )
}