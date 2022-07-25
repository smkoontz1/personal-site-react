
import styles from '../../styles/common/Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerGradient}></div>
      <div className={styles.footerBar}>
        <footer className={styles.footerContent}>
          <p>All rights reserved &copy; Steven Koontz {year}</p>
        </footer>
      </div>
    </div>
  )
}