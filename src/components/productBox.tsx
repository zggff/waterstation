import React from 'react'
import { IProductModel } from '@utils/MongoDBModels/product.model'
import styles from '@styles/product.module.scss'
import Link from 'next/link'

export interface ProductBoxProps {
    product: IProductModel
}

const ProductBox = ({ product }: ProductBoxProps): JSX.Element => {
    return (
        <div className={styles.productBox}>
            <div className={styles.content}>
                <Link href="/products/product/[id]" as={`/products/product/${product._id}`}>
                    <a href={`/products/product/${product._id}`} className={styles.link}>
                        {product.label}
                    </a>
                </Link>
                {/* <span>{product.manufacturer}</span> */}
                <span className={styles.price}>{product.price}&#x20bd;</span>
                {/* {product.description && <p>{product.description}</p>} */}
            </div>
            <div className={styles.image}>
                {product.image && <img alt="water" src={`/static_images${product.image}`} />}
            </div>
        </div>
    )
}

export default ProductBox
