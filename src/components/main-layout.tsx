import React from 'react'
import Head from 'next/head'
import Navbar from '~/src/components/navbar'
import Footer from '~/src/components/footer'

interface IMainLayoutProps {
    children: Array<JSX.Element> | JSX.Element
    title: string
}

function MainLayout({ children, title }: IMainLayoutProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{title} | waterstation</title>
            </Head>
            <div className="contentWrapper">
                <div className="container">
                    <Navbar />
                    <main className="content">{children}</main>
                </div>
                <Footer />
            </div>
        </>
    )
}

export { MainLayout }
export type { IMainLayoutProps }
