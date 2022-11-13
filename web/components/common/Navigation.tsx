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
        <Navbar.Brand className={styles.navbarBrand}>
          <Row>
            <Col>SENSE <span className={styles.navbarBrandInner}>OF</span> STEVE</Col>
          </Row>
        </Navbar.Brand>
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



