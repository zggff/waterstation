import React from 'react'
import { MainLayout } from '@components/main-layout'
import { useQuery, gql, from } from '@apollo/client'
import { initializeApollo } from '@utils/apolloClient'

const Query = gql`
    query {
        products(limit: 10, type: "cooler") {
            type
            label
            images {
                src
            }
        }
    }
`

const Zggff = (): JSX.Element => {
    const { data, error, loading } = useQuery(Query)
    if (loading) {
        return (
            <MainLayout title="contacts">
                <h2>loading</h2>
            </MainLayout>
        )
    }
    return (
        <MainLayout title="contacts">
            <h2>{JSON.stringify(data)}</h2>
        </MainLayout>
    )
}

export default Zggff

export async function getStaticProps() {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: Query,
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}
