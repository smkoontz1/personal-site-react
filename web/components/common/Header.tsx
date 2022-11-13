import Navbar from './Navigation'
import styles from '../../styles/common/Header.module.scss'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Navbar />
      <div className={styles.headerGradient}></div>
    </div>
  )
}