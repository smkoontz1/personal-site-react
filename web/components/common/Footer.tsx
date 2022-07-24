
import styles from '../../styles/common/Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerGradient}></div>
      <div className={styles.footerBar}>
        <footer className={styles.footerContent}>
          <p>TODO: Footer Text</p>
        </footer>
      </div>
    </div>
  )
}