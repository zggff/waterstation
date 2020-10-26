import React from 'react'
import styles from '@styles/error.module.scss'
import { MainLayout } from '@components/main-layout'

function ErrorPage(): JSX.Element {
    return (
        <MainLayout title="page not found">
            <h2 className={styles.error}>page not found</h2>
        </MainLayout>
    )
}

export default ErrorPage
