import { arg, extendType } from '@nexus/schema'
import Image from '@utils/MongoDBModels/image.model'
import Product from '@utils/MongoDBModels/product.model'

const Mutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addImage', {
            type: 'String',
            args: {
                src: arg({
                    type: 'String',
                    required: true,
                }),
                alt: arg({
                    type: 'String',
                    required: true,
                }),
            },
            resolve: async (root, { src, alt }) => {
                const image = new Image({
                    src,
                    alt,
                })
                await image.save()
                return 'image'
            },
        })
        t.field('addProduct', {
            type: 'String',
            args: {
                type: arg({
                    type: 'String',
                    required: true,
                }),
                label: arg({
                    type: 'String',
                    required: true,
                }),
                manufacturer: arg({
                    type: 'String',
                    required: true,
                }),
                description: arg({
                    type: 'String',
                    required: true,
                }),
                price: arg({
                    type: 'Int',
                    required: true,
                }),
                images: arg({
                    type: 'String',
                    list: true,
                    required: true,
                }),
            },
            resolve: async (_, { type, label, manufacturer, price, images, description }) => {
                const product = new Product({
                    type,
                    label,
                    manufacturer,
                    price,
                    images,
                    description,
                })
                await product.save()
                return 'ew'
            },
        })
    },
})

export { Mutation }
