import React, { useCallback, useEffect, useState } from 'react'

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

type LocalStorageItem = {
    loaded: number
    type: string
    scrollPosition: number
    cachedState: ProductInterface[]
}

interface LocalStorageType {
    [key: string]: LocalStorageItem
}

const getLocalStorage = (type: string): LocalStorageItem => {
    const productPagesData: LocalStorageType = JSON.parse(localStorage.getItem('productPagesData'))
    if (!productPagesData) {
        return null
    }
    const productPageData = productPagesData[type]
    return productPageData
}

const updateLocalStorage = (
    type: string,
    fields: Array<{ field: string; value: string | number | ProductInterface[] }>
) => {
    const productPagesData: LocalStorageType = JSON.parse(localStorage.getItem('productPagesData'))

    fields.forEach((field) => {
        productPagesData[type][field.field] = field.value
    })
    localStorage.setItem('productPagesData', JSON.stringify(productPagesData))
}

const createLocalStorage = (type: string) => {
    const productPagesData: LocalStorageType = JSON.parse(localStorage.getItem('productPagesData'))
    if (!productPagesData) {
        const newLocalStorage: LocalStorageType = {}
        newLocalStorage[type] = {
            type,
            loaded: 0,
            scrollPosition: 0,
            cachedState: [],
        }
        return localStorage.setItem('productPagesData', JSON.stringify(newLocalStorage))
    }
    if (productPagesData[type]) {
        return localStorage.setItem('productPagesData', JSON.stringify(productPagesData))
    }

    productPagesData[type] = {
        type,
        loaded: 0,
        scrollPosition: 0,
        cachedState: [],
    }
    return localStorage.setItem('productPagesData', JSON.stringify(productPagesData))
}

const Products = (): JSX.Element => {
    const router = useRouter()
    const { data, fetchMore } = useQuery(getDynamicQuery(router.query.type.toString()))

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
            const type = router.query.type.toString()
            const currentLocalStorage = getLocalStorage(type)
            if (currentLocalStorage) {
                return updateLocalStorage(type, [
                    {
                        field: 'loaded',
                        value:
                            products.length < currentLocalStorage.cachedState.length
                                ? currentLocalStorage.cachedState.length
                                : products.length,
                    },
                    {
                        field: 'cachedState',
                        value:
                            products.length < currentLocalStorage.cachedState.length
                                ? currentLocalStorage.cachedState
                                : products,
                    },
                ])
            }
            return updateLocalStorage(type, [
                {
                    field: 'loaded',
                    value: products.length,
                },
                {
                    field: 'cachedState',
                    value: products,
                },
            ])
        },
        [data]
    )

    useEffect(() => {
        const type = router.query.type.toString()
        const currentLocalStorage: LocalStorageItem = getLocalStorage(type)
        createLocalStorage(type)
        function handleScroll() {
            const currentLocalStorage1: LocalStorageItem = getLocalStorage(type)

            if (currentLocalStorage1) {
                updateLocalStorage(type, [
                    {
                        field: 'scrollPosition',
                        value: window.scrollY,
                    },
                ])
            }
        }

        if (currentLocalStorage) {
            setProductsPreloaded(currentLocalStorage.cachedState)
            load(currentLocalStorage.loaded).then(() => {
                window.scrollTo({ top: currentLocalStorage.scrollPosition })

                setPreloaded(true)
            })
        } else {
            setPreloaded(true)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
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
                            <ProductBox product={product} />
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: getDynamicQuery(context.query.type.toString()),
    })
    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}
export default Products
