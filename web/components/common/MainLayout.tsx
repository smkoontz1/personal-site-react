import { ReactElement } from 'react'
import styles from '../../styles/common/Common.module.scss'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
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
      <Container>
        {children}
      </Container>
    </>
  )
}