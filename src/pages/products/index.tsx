import React from 'react'

import { MainLayout } from '@components/main-layout'

import styles from '@styles/product.module.scss'
import Link from 'next/link'

interface IProductsButton {
    label: string
    type: string
    image: string
}

const ProductTypeButton = ({ label, type, image }: IProductsButton): JSX.Element => {
    return (
        <div className={styles.productBox}>
            <div className={styles.content}>
                <Link href="/products/[type]" as={`/products/${type}`}>
                    <a href={`/products/product/${type}`} className={styles.link}>
                        {label}
                    </a>
                </Link>
            </div>
            <div className={styles.image}>
                {image && <img alt="water" src={`/static_images${image}`} />}
            </div>
        </div>
    )
}

const products: Array<IProductsButton> = [
    {
        label: 'питьевая вода',
        type: 'water',
        image: '/products/water2.jpg',
    },
    {
        label: 'кулеры',
        type: 'cooler',
        image: '/products/cooler1.jpg',
    },
    {
        label: 'все',
        type: 'all',
        image: '/products/water1.jpg',
    },
]

const Index = (): JSX.Element => {
    return (
        <MainLayout title="contacts">
            <h1>Товары и услуги</h1>
            <div>
                <ul className={styles.productsContainer}>
                    {products.map((product) => (
                        <li key={product.label}>
                            <ProductTypeButton
                                label={product.label}
                                type={product.type}
                                image={product.image}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}

export default Index
