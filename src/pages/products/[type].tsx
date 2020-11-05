import React, { useEffect, useState } from 'react'
import { IProduct } from '@utils/MongoDBModels/product.model'

import { MainLayout } from '@components/main-layout'
import { IResponse } from '@pages/api/products'
import ProductBox from '@components/productBox'

import styles from '@styles/product.module.scss'
import { useRouter } from 'next/router'

interface Props {
    initialProducts: Array<IProduct>
    initialError: Error
}

const Products = ({ initialProducts, initialError }: Props): JSX.Element => {
    const [products, setProducts] = useState(initialProducts)
    const router = useRouter()
    useEffect(() => {
        async function load() {
            // const baseUrl = process.env.BASE_URL
            const response = await fetch(`/api/products/${router.query.type}`)
            const json: IResponse = await response.json()
            // console.log(json)
            setProducts(json.response)
        }
        if (!initialProducts.length) {
            load().then()
        }
    }, [])
    return (
        <MainLayout title="contacts">
            <h1>Товары и услуги</h1>
            <div>
                <ul className={styles.productsContainer}>
                    {products.map((product) => (
                        <li key={product._id}>
                            <ProductBox product={product} />
                        </li>
                    ))}
                </ul>
                {/* {JSON.stringify(products)} */}
            </div>
        </MainLayout>
    )
}

Products.getInitialProps = async ({ query, req }) => {
    if (!req) {
        return {
            initialProducts: [],
        }
    }
    const baseUrl = process.env.BASE_URL
    const response = await fetch(`${baseUrl}/api/products/${query.type}`)
    const products: IResponse = await response.json()
    return {
        initialProducts: products.response,
    }
}

export default Products
