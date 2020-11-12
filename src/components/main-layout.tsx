import React from 'react'
import Head from 'next/head'
// import Navbar from '@components/navbar'
// import Footer from '~/src/components/footer'

interface IMainLayoutProps {
    children: React.ReactNode

    title?: string

    description?: string

    keywords?: string[]

    author?: string
}

const MainLayoutDefaultProps = {
    title: 'Главная Страница',

    description: 'Главная страница',

    keywords: ['АкваЭкспресс', 'доставка воды', 'коломна', 'интернет магазин'],

    author: 'zggff',
}

const MainLayout = ({
    children,
    title,
    description,
    keywords,
    author,
}: IMainLayoutProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>{title} | АкваЭкспресс</title>
                {description && (
                    <meta
                        name="description"
                        content={`${description} | АкваЭкспресс - служба по доставке воды в Коломне`}
                    />
                )}
                {author && <meta name="author" content={author} />}
                {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {/* <div className="contentWrapper"> */}
            {/*    <div className="container"> */}
            {/* <Navbar /> */}
            <main className="content">{children}</main>
            {/*    </div> */}
            {/*    <Footer /> */}
            {/* </div> */}
        </>
    )
}

MainLayout.defaultProps = MainLayoutDefaultProps

export { MainLayout }
export type { IMainLayoutProps }
