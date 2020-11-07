import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MainLayout } from '@components/main-layout'
import ProductBox from '@components/productBox'

import styles from '@styles/product.module.scss'

import { useQuery, gql } from '@apollo/client'
import { initializeApollo } from '@utils/apolloClient'
import { useRouter } from 'next/router'
import { ProductInterface } from '@utils/graphql/interfaces'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

function getDynamicQuery(type: string) {
    return gql`
        query products($offset:Int, $limit:Int){
            productsCount(type: "${type}")
            products(type: "${type}", offset: $offset, limit: $limit) {
                id
                label
                price
                images (limit: 1) {
                    src
                    alt
                }
            }
        }
    `
}

type localStorageType = {
    loaded: number
    type: string
    scrollPosition: number
    cachedState: ProductInterface[]
}

const Products = (): JSX.Element => {
    const router = useRouter()
    const { data, loading, error, fetchMore } = useQuery(
        getDynamicQuery(router.query.type.toString())
    )

    const { products }: { products: ProductInterface[] } = data
    const [element, setElement] = useState(null)
    const [preloaded, setPreloaded] = useState(false)
    const [productsPreloaded, setProductsPreloaded] = useState(products)

    const load = useCallback(
        async (limit = 10) => {
            await fetchMore({
                variables: {
                    offset: products.length,
                    limit,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev

                    return {
                        ...prev,
                        products: [...prev.products, ...fetchMoreResult.products],
                    }
                },
            })

            const loaded: localStorageType = JSON.parse(localStorage.getItem('productPagesData'))
            if (loaded) {
                return localStorage.setItem(
                    'productPagesData',
                    JSON.stringify({
                        loaded:
                            products.length < loaded.cachedState.length
                                ? loaded.cachedState.length
                                : products.length,
                        cachedState:
                            products.length < loaded.cachedState.length
                                ? loaded.cachedState
                                : products,
                        type: loaded.type,
                        scrollPosition: loaded.scrollPosition,
                    })
                )
            }

            localStorage.setItem('loaded', JSON.stringify(products.length))

            localStorage.setItem(
                'productPagesData',
                JSON.stringify({
                    loaded: products.length,
                    cachedState: products,
                    type: router.query.type,
                    scrollPosition: window.scrollY,
                })
            )
        },

        [data]
    )

    useEffect(() => {
        function handleScroll(event) {
            const loaded: localStorageType = JSON.parse(localStorage.getItem('productPagesData'))

            if (loaded) {
                localStorage.setItem(
                    'productPagesData',
                    JSON.stringify({
                        loaded: loaded.loaded,
                        cachedState: loaded.cachedState,
                        type: router.query.type,
                        scrollPosition: window.scrollY,
                    })
                )
            }
        }
        const loaded: localStorageType = JSON.parse(localStorage.getItem('productPagesData'))

        if (loaded) {
            setProductsPreloaded(loaded.cachedState)
            load(loaded.loaded).then(() => {
                window.scrollTo({ top: loaded.scrollPosition })

                setPreloaded(true)
            })
        } else {
            setPreloaded(true)
        }
        window.addEventListener('scroll', handleScroll, true)
        return window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (preloaded) {
            setProductsPreloaded(data.products)
        }
        const observer = new IntersectionObserver(
            async (entries) => {
                const first = entries[0]
                if (first.isIntersecting) {
                    load()
                }
            },
            { threshold: 1 }
        )

        const currentElement = element
        if (currentElement && preloaded) {
            observer.observe(currentElement)
        }
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement)
            }
        }
    }, [element, preloaded, data])

    return (
        <MainLayout title="contacts">
            <div>
                <ul className={styles.productsContainer}>
                    {productsPreloaded.map((product) => (
                        <li ref={setElement} key={product.id}>
                            <span>{product.id}</span>
                            <ProductBox product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: getDynamicQuery(context.query.type),
    })
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}
export default Products
