import styles from '../../styles/common/Header.module.scss'
import Navigation from './Navigation'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Navigation />
    </div>
  )
}