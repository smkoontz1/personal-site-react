import { ReactElement } from 'react'
import Footer from './Footer'
import Header from './Header'
import styles from '../../styles/common/Common.module.scss'

interface Props {
  children: ReactElement
}

export default function MainLayout(props: Props) {
  const { children } = props
  
  return (
    <div className={`${styles.imgFullScreen} ${styles.mainBg}`}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}