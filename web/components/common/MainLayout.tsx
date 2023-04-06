import { ReactElement } from 'react'
import styles from '../../styles/common/Common.module.scss'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Navigation from './Navigation'

interface Props {
  children: ReactElement
}

export default function MainLayout(props: Props) {
  const { 
    children,
  } = props
  
  return (
    <>
      <Navigation />
      <main className={styles.mainContent}>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  )
}