import { ApolloServer } from 'apollo-server-micro'
import { schema } from '@utils/graphql/schema'

const server = new ApolloServer({ schema, context: { name: 'hello' } })
const handler = server.createHandler({ path: '/api/graphql' })

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handler
