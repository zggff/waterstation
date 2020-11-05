import React from 'react'
import { MainLayout } from '@components/main-layout'
import { useRouter } from 'next/router'

const Product = (): JSX.Element => {
    const router = useRouter()
    console.log(router)
    return (
        <MainLayout title="contacts">
            <h1>{router.query.id}</h1>
            <button
                type="button"
                onClick={() => {
                    router.back()
                }}
            >
                go back
            </button>
        </MainLayout>
    )
}

export default Product
