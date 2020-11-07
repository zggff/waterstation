import React from 'react'
import '@styles/main.scss'
import { AppProps } from 'next/app'
import Navbar from '@components/navbar'
import Footer from '@components/footer'
import { useApollo } from '@utils/apolloClient'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const client = useApollo(pageProps.initialApolloState)

    return (
        <ApolloProvider client={client}>
            <div className="contentWrapper">
                <div className="container">
                    <Navbar />
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
        </ApolloProvider>
    )
}

export default MyApp
