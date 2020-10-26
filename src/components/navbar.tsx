import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '@styles/navbar.module.scss'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = (): JSX.Element => {
    const ref = useRef(null)
    const router = useRouter()
    const [navActive, setNavActive] = useState(false)

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (!ref.current.contains(e.target)) {
                setNavActive(false)
                document.removeEventListener('click', handleClickOutside, true)
            }
        },
        [setNavActive]
    )
    const changeNav = () => {
        setNavActive(!navActive)
        document.addEventListener('click', handleClickOutside, true)
    }
    useEffect(() => {
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    function setMultipleClassNames(...classes) {
        return classes.join(' ')
    }
    return (
        <nav className={styles.navbar} ref={ref}>
            <span className={styles.checkButton}>
                <FontAwesomeIcon icon={faBars} className={styles.checkButton} onClick={changeNav} />
            </span>
            <ul className={styles.navItems}>
                <li
                    className={setMultipleClassNames(
                        router.pathname === '/' ? styles.active : '',
                        styles.logo
                    )}
                >
                    <Link href="/">waterstation</Link>
                </li>
                <li
                    className={setMultipleClassNames(
                        router.pathname === '/about' ? styles.active : ''
                    )}
                >
                    <Link href="/about">о нас</Link>
                </li>
                <li
                    className={setMultipleClassNames(
                        router.pathname === '/goodsAndServices' ? styles.active : ''
                    )}
                >
                    <Link href="/goodsAndServices">товары и услуги</Link>
                </li>
                <li
                    className={setMultipleClassNames(
                        router.pathname === '/contact' ? styles.active : ''
                    )}
                >
                    <Link href="contact">контакты</Link>
                </li>
                <li
                    className={setMultipleClassNames(
                        router.pathname === '/articles' ? styles.active : ''
                    )}
                >
                    <Link href="/articles">статьи</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
