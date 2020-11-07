import React from 'react'

import { MainLayout } from '@components/main-layout'
import ProductBox from '@components/productBox'

import styles from '@styles/product.module.scss'

import { useQuery, gql } from '@apollo/client'
import { initializeApollo } from '@utils/apolloClient'
import { useRouter } from 'next/router'
import { ProductInterface } from '@utils/graphql/interfaces'
import { ImageSlider } from '@components/ImageSlider'

function getDynamicQuery(id) {
    return gql`
        query {
            product(id: "${id}") {
                id
                label
                price
                description
                images (limit: 10) {
                    src
                    alt
                }
            }
        }
    `
}

const Products = (): JSX.Element => {
    const router = useRouter()
    const { data, error, loading } = useQuery(getDynamicQuery(router.query.id))
    const { product }: { product: ProductInterface } = data
    // console.log(data)

    if (loading) {
        return (
            <MainLayout title="contacts">
                <span>loading</span>
            </MainLayout>
        )
    }

    return (
        <MainLayout title="contacts">
            <div className={styles.productPage}>
                <h2 className={styles.label}>{product.label}</h2>
                <p className={styles.description}>{product.description}</p>
                <h3 className={styles.price}>{product.price}&#x20bd;</h3>
                <div />

                <div className={styles.imageSlider}>
                    <ImageSlider images={product.images} />
                </div>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: getDynamicQuery(context.query.id),
    })
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}

export default Products
