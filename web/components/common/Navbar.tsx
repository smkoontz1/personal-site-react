import Link from 'next/link'
import styles from '../../styles/common/Navbar.module.scss'

interface NavItem {
  displayText: string
  route: string
}

export default function Navbar() {

  const navItems: NavItem[] = [
    {
      displayText: 'Blog',
      route: '/blog'
    },
    {
      displayText: 'Photos',
      route: './photos'
    }
  ]

  const navItemLinks = navItems.map(item => {
    return (
      <Link href={item.route}>
        <a className={styles.navItem} target="_self">
          {item.displayText}
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



