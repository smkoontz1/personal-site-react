
import { Col, Container, Row } from 'react-bootstrap';
import styles from '../../styles/common/Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  
  return (
    <div className={styles.footerShell}>
        <p className='m-0'>All rights reserved &copy; Steven Koontz {year}</p>
    </div>
  )
}