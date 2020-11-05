import React from 'react'
import '@styles/main.scss'
import { AppProps } from 'next/app'
import Navbar from '@components/navbar'
import Footer from '@components/footer'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <div className="contentWrapper">
                <div className="container">
                    <Navbar />
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MyApp
