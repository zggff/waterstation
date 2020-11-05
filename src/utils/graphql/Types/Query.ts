import { arg, extendType } from '@nexus/schema'
import Product from '@utils/MongoDBModels/product.model'
import Image from '@utils/MongoDBModels/image.model'
import { Product as ProductType } from './Product'

const Query = extendType({
    type: 'Query',
    definition(t) {
        t.field('product', {
            args: {
                id: arg({
                    type: 'String',
                    required: true,
                }),
            },
            type: ProductType,
            resolve: async (root, { id }, context, info) => {
                const product = await Product.findById(id)

                const output = {
                    label: product.label,
                    manufacturer: product.manufacturer,
                    description: product.description,
                    price: product.price,
                    images: Promise.all(
                        product.images.map(async (imageID) => {
                            const image = await Image.findById(imageID)
                            return {
                                src: image.src,
                                alt: image.alt,
                            }
                        })
                    ),
                }
                return output
            },
        })
    },
})

export { Query }
