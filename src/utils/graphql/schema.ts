import { makeSchema } from '@nexus/schema'
import path from 'path'
import { Query, Mutation } from '@utils/graphql/Types'

const types = { Query, Mutation }

export const schema = makeSchema({
    types,
    outputs: {
        schema: path.join(process.cwd(), 'schema.graphql'),
        typegen: path.join(process.cwd(), 'src', 'utils', 'graphql', 'generated', 'nexus.ts'),
    },
    typegenAutoConfig: {
        sources: [
            {
                alias: 'interfaces',
                source: path.join(process.cwd(), 'src', 'utils', 'graphql', 'interfaces.ts'),
                typeMatch: (type) => new RegExp(`(${type}Interface)`),
            },
        ],
    },
})
