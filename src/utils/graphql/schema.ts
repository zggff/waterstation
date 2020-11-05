import { makeSchema, queryType } from '@nexus/schema'
// import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import path from 'path'
// import { Query, Mutation } from '@utils/graphql/Types'

const Query = queryType({
    definition(t) {
        t.string('name', () => 'Zggff')
    },
})

const types = { Query }

export const schema = makeSchema({
    types,
})
// const schema = makeSchema({
//     types,
//     outputs: {
//         schema: path.join(process.cwd(), 'schema.graphql'),
//         typegen: path.join(process.cwd(), 'src', 'utils', 'graphql', 'generated', 'nexus.ts'),
//     },
//     typegenAutoConfig: {
//         sources: [
//             {
//                 alias: 'interfaces',
//                 source: path.join(process.cwd(), 'src', 'utils', 'graphql', 'interfaces.ts'),
//                 typeMatch: (type) => new RegExp(`(${type}Interface)`),
//             },
//         ],
//     },
// })

// export { schema }
