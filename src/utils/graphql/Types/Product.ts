import { arg, objectType } from '@nexus/schema'
import { Image } from './Image'
// import { Query } from './Query'

const Product = objectType({
    name: 'Product',
    definition(t) {
        t.id('id')
        t.string('type')
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
            resolve: async (root, { limit }) => {
                const { images } = root
                return images.slice(0, limit)
            },
        })
    },
})

export { Product }
