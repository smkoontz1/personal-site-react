import { ReactElement } from 'react'
import styles from '../../styles/common/Common.module.scss'
import { Container } from 'react-bootstrap'
import Navigation from './Navigation'

interface Props {
  children: ReactElement
  useBackgroundImage?: boolean
}

export default function MainLayout(props: Props) {
  const { 
    children,
    useBackgroundImage = false,
  } = props
  
  return (
    <>
      <Navigation />
      <main className={styles.mainContent}>
        <Container>
          {children}
        </Container>
      </main>
    </>
  )
}