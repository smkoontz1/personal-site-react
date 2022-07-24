import Link from 'next/link'
import styles from '../../styles/common/Navbar.module.scss'
import { useRouter } from 'next/router'

interface NavItem {
  displayText: string
  route: string
}

const navItems: NavItem[] = [
  {
    displayText: 'Photography',
    route: '/photography'
  },
  {
    displayText: 'Blog',
    route: '/blog'
  }
]

export default function Navbar() {
  const router = useRouter()
  
  const navItemLinks = navItems.map(item => {
    console.log(router)
    const isActive = router.pathname.startsWith(item.route)
    
    return (
      <Link href={item.route}>
        <a className={`${styles.navItem}${isActive ? ` ${styles.active}` : ''}`} target="_self">
          {item.displayText.toUpperCase()}
        </a>
      </Link>
    )
  })

  return (
    <nav className={styles.navBar}>
      <Link href='/' >
        <a className={styles.navLogo} target="_self">
          SENSE <span className={`${styles.navLogo} ${styles.inner}`}>OF</span> STEVE
        </a>
      </Link>

      {navItemLinks}
    </nav>
  )
}



