import React from 'react'
import styles from '@styles/footer.module.scss'

const Footer = (): JSX.Element => {
    return (
        <>
            <footer className={styles.footer}>
                <p> &copy; waterstation</p>
            </footer>
        </>
    )
}

export default Footer
