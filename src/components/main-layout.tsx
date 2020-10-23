import React from 'react'

interface IMainLayoutProps {
    children: Array<JSX.Element>
}

function MainLayout({ children }: IMainLayoutProps): JSX.Element {
    return (
        <>
            <nav>navigation bar</nav>
            <main>{children}</main>
        </>
    )
}

export { MainLayout }
export type { IMainLayoutProps }
