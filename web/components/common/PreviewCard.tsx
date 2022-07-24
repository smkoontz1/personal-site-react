import { ReactElement } from 'react'
import styles from '../../styles/common/Common.module.scss'

interface Props {
  children: ReactElement
}

export default function PreviewCard(props: Props) {
  const { children } = props
  
  return (
    <div className={styles.previewCard}>
      {children}
    </div>
  )
}