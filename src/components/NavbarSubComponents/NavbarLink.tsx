import React from 'react'
import Link from 'next/link'

interface NavbarLinkProps {
    href: string

    className?: string

    children: React.ReactNode

    onClick: (event: React.MouseEvent) => void
}

// NavbarSubComponents - high level abstraction over next js Link

const NavbarLink = ({ href, className, children, onClick }: NavbarLinkProps): JSX.Element => {
    return (
        <Link href={href}>
            <a href={href} className={className || ''} onClick={onClick}>
                {children}
            </a>
        </Link>
    )
}

NavbarLink.defaultProps = {
    className: '',
}

export default NavbarLink
