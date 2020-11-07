import { InMemoryCache, ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createIsomorphicLink() {
    if (typeof window === 'undefined') {
        const { SchemaLink } = require('@apollo/client/link/schema')
        const { schema } = require('@utils/graphql/schema')
        return new SchemaLink({ schema })
    }
    const { HttpLink } = require('@apollo/client/link/http')
    return new HttpLink({ uri: '/api/graphql' })
}

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: createIsomorphicLink(),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null): ApolloClient<NormalizedCacheObject> {
    const _apolloClient = apolloClient ?? createApolloClient()
    // return _apolloClient
    if (initialState) {
        _apolloClient.cache.restore(initialState)
    }

    if (typeof window === 'undefined') {
        return _apolloClient
    }

    apolloClient = apolloClient && _apolloClient

    return _apolloClient
}

export function useApollo(initialState = null): ApolloClient<NormalizedCacheObject> {
    const store = useMemo(() => initializeApollo(initialState), [initialState])
    // const store = initializeApollo(initialState)
    return store
}
