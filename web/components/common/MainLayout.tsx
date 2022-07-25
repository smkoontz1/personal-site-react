import { ReactElement } from 'react'
import Footer from './Footer'
import Header from './Header'
import styles from '../../styles/common/Common.module.scss'

interface Props {
  children: ReactElement
  useBackgroundImage?: boolean
}

export default function MainLayout(props: Props) {
  const { 
    children,
    useBackgroundImage = true,
  } = props
  
  return (
    <div className={`${styles.imgFullScreen} ${useBackgroundImage ? styles.mainBg : styles.solidBg}`}>
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