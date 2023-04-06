import Link from 'next/link'
import styles from '../../styles/common/Navbar.module.scss'
import { useRouter } from 'next/router'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'

interface NavItem {
  displayText: string
  route: string
}

const navItems: NavItem[] = [
  {
    displayText: 'Photography',
    route: '/photo'
  },
  {
    displayText: 'Blog',
    route: '/blog'
  }
]

const currentHomeRoute = '/photo'

export default function Navigation() {
  const router = useRouter()
  
  const navItemLinks = navItems.map(item => {
    const isActive = router.pathname.startsWith(item.route)
    
    return (
      <Link key={item.displayText} href={item.route} passHref>
        <Nav.Link active={isActive}>
          {item.displayText.toUpperCase()}
        </Nav.Link>
      </Link>
    )
  })

  return (
    <Navbar
      className={styles.navbarShell}
      variant='light'
      fixed='top'
      collapseOnSelect
      expand='md'>
      <Container fluid>
        <Link href={currentHomeRoute} passHref>
          <Navbar.Brand className={styles.navbarBrand}>
            <Row>
              <Col>SENSE <span className={styles.navbarBrandInner}>OF</span> STEVE</Col>
            </Row>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar' />
        <Navbar.Collapse id='responsive-navbar'>
          <Nav className='me-auto'>
            {navItemLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}



