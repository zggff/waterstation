import React from 'react'
import '@styles/main.scss'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '~/src/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
