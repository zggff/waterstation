import React from 'react'
import styles from '@styles/product.module.scss'
import Link from 'next/link'

import { ProductInterface } from '@utils/graphql/interfaces'

export interface ProductBoxProps {
    product: ProductInterface
}

const ProductBox = ({ product }: ProductBoxProps): JSX.Element => {
    return (
        <div className={styles.productBox}>
            <div className={styles.content}>
                <Link href="/products/product/[id]" as={`/products/product/${product.id}`}>
                    <a href={`/products/product/${product.id}`} className={styles.link}>
                        {product.label}
                    </a>
                </Link>
                <span>{product.manufacturer}</span>
                <span className={styles.price}>{product.price}&#x20bd;</span>
            </div>
            <div className={styles.image}>
                <img alt={product.images[0].alt} src={product.images[0].src} />
            </div>
        </div>
    )
}

export default ProductBox
