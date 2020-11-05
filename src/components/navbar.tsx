import React, { useState } from 'react'
import styles from '@styles/navbar.module.scss'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavbarItem, { NavigationLinkClass } from '@components/NavbarSubComponents/NavbarItem'
// NavigationLink - abstraction over NavbarSubComponents, that supports dropdown menu support

const navLinks: Array<NavigationLinkClass> = [
    {
        label: 'АкваЭкспресс',
        path: '/',
        isLogo: true,
    },
    {
        label: 'товары',
        path: '/products',
    },
    {
        label: 'о нас',
        path: '/about',
        dropdown: [
            {
                label: 'история',
                path: '/about/history',
            },
            {
                label: 'fwaefewa',
                path: '/about/fawef',
            },
            {
                label: 'fewafe',
                path: '/about/fe',
            },
        ],
    },

    {
        label: 'contact',
        path: '/contact',
    },
]

const Navbar = (): JSX.Element => {
    const [navbarActive, setNavbarActive] = useState(true)
    const invertNavbarActive = () => {
        setNavbarActive(!navbarActive)
    }
    return (
        <nav className={styles.navbar}>
            <div
                role="button"
                className={styles.navbarActiveCheckbox}
                onKeyDown={invertNavbarActive}
                onClick={invertNavbarActive}
                // onFocus={invertNavbarActive}
                tabIndex={0}
            >
                <FontAwesomeIcon className={styles.icon} icon={faBars} />
            </div>

            <ul className={[styles.navbarContent, navbarActive ? styles.active : ''].join(' ')}>
                {navLinks.map((navLink) => (
                    <li className={styles.navbarMainElement} key={navLink.path}>
                        <NavbarItem NavItem={navLink} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
