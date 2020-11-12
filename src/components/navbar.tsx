import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '@styles/navbar.module.scss'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavbarItem, { NavigationLinkClass } from '@components/NavbarSubComponents/NavbarItem'
import { useRouter } from 'next/router'
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
                label: 'о компании',
                path: '/about/company',
            },
            {
                label: 'производство',
                path: '/about/production',
            },
            {
                label: 'обменные пункты',
                path: '/about/exchangepoints',
            },
        ],
    },

    {
        label: 'контакты',
        path: '/contact',
    },
]

const Navbar = (): JSX.Element => {
    const router = useRouter()
    const [navbarActive, setNavbarActive] = useState(false)
    const invertNavbarActive = () => {
        setNavbarActive(!navbarActive)
    }
    const navbarContainer = useRef(null)

    const handleFocus = useCallback(
        (event: FocusEvent) => {
            if (!navbarContainer.current.contains(event.target)) {
                setNavbarActive(false)
                document.removeEventListener('focusin', handleFocus)
            }
        },
        [navbarActive]
    )

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!navbarContainer.current.contains(event.target)) {
                setNavbarActive(false)
                document.removeEventListener('mousedown', handleClick)
            }
        },
        [navbarActive]
    )

    useEffect(() => {
        const handleRouteChange = (url) => {
            setNavbarActive(false)
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            document.removeEventListener('focusin', handleFocus)
            document.removeEventListener('mousedown', handleClick)
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])

    return (
        <nav className={styles.navbar} ref={navbarContainer}>
            <div
                role="button"
                aria-label="ew"
                // type="button"
                className={styles.navbarActiveCheckbox}
                // name="Activate navbar when in mobile version"
                onKeyDown={() => {
                    document.addEventListener('focusin', handleFocus)
                    document.addEventListener('mousedown', handleClick)
                }}
                onClick={() => {
                    invertNavbarActive()
                    document.addEventListener('mousedown', handleClick)
                }}
                onFocus={() => {
                    document.addEventListener('focusin', handleFocus)
                    document.addEventListener('mousedown', handleClick)
                }}
                // onFocus={invertNavbarActive}
                tabIndex={0}
            >
                <FontAwesomeIcon name="e" className={styles.icon} icon={faBars} />
            </div>

            <ul className={[styles.navbarContent, navbarActive ? styles.active : ''].join(' ')}>
                {navLinks.map((navLink) => (
                    <li
                        className={[
                            styles.navbarMainElement,
                            navLink.isLogo ? styles.logo : '',
                        ].join(' ')}
                        key={navLink.path}
                    >
                        <NavbarItem NavItem={navLink} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
