import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@styles/navbar.module.scss'
import NavbarLink from '@components/NavbarSubComponents/NavbarLink'

export class NavigationLinkClass {
    label: string

    path: string

    dropdown?: Array<NavigationLinkClass>

    isLogo?: boolean
}

interface NavigationLinkProps {
    NavItem: NavigationLinkClass
}

const NavbarItem = ({ NavItem }: NavigationLinkProps): JSX.Element => {
    const [dropdownActive, setDropdownActive] = useState(false)
    const [clicked, setClicked] = useState(false)
    const dropdownContainer = useRef(null)
    const router = useRouter()

    const handleFocus = useCallback(
        (event: FocusEvent) => {
            if (!dropdownContainer.current.contains(event.target)) {
                setDropdownActive(false)
                document.removeEventListener('focusin', handleFocus)
            }
        },
        [dropdownActive]
    )

    const handleClick = useCallback(
        (event: FocusEvent) => {
            if (!dropdownContainer.current.contains(event.target)) {
                setDropdownActive(false)
                document.removeEventListener('mousedown', handleClick)
            }
        },
        [dropdownActive]
    )

    useEffect(() => {
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('focusin', handleFocus)
        }
    }, [])

    const updateClicked = () => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 200)
    }
    if (!NavItem.dropdown) {
        return (
            <NavbarLink
                href={NavItem.path}
                className={[
                    styles.navButton,
                    NavItem.isLogo ? styles.logo : '',
                    clicked ? styles.clicked : '',
                    clicked ? styles.hover : '',
                    router.pathname === NavItem.path ? styles.active : '',
                ].join(' ')}
                onClick={updateClicked}
            >
                {NavItem.label}
            </NavbarLink>
        )
    }
    return (
        <div ref={dropdownContainer}>
            <button
                name={`dropdown button for ${NavItem.label}`}
                className={[
                    styles.navButton,
                    NavItem.isLogo ? styles.logo : '',
                    clicked ? styles.clicked : '',
                    clicked ? styles.hover : '',
                    dropdownActive ? styles.hover : '',
                    router.pathname === NavItem.path ? styles.active : '',
                ].join(' ')}
                type="button"
                onClick={() => {
                    setDropdownActive(!dropdownActive)
                    document.addEventListener('mousedown', handleClick)

                    updateClicked()
                }}
                onFocus={() => {
                    document.addEventListener('mousedown', handleClick)
                    document.addEventListener('focusin', handleFocus)
                }}
            >
                {NavItem.label}
            </button>
            <ul className={[styles.dropdown, dropdownActive ? styles.active : ''].join(' ')}>
                {NavItem.dropdown.map((navItem) => (
                    <li key={navItem.path} className="li">
                        <NavbarItem NavItem={navItem} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NavbarItem
