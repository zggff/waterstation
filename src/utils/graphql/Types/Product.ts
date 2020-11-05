import { arg, objectType } from '@nexus/schema'
import { RootValue } from '@nexus/schema/dist/typegenTypeHelpers'
import { Image } from './Image'
// import { Query } from './Query'

const Product = objectType({
    name: 'Product',
    definition(t) {
        t.string('label')
        t.string('manufacturer')
        t.string('description')
        t.int('price')
        t.list.field('images', {
            type: Image,
            args: {
                limit: arg({
                    type: 'Int',
                    required: false,
                    default: 5,
                }),
            },
            resolve: async (root, { limit }, context, info) => {
                const images = await root.images
                return images.slice(0, limit)
            },
        })
    },
})

export { Product }
