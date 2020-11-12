import { arg, extendType } from '@nexus/schema'
import Product, { IProduct } from '@utils/MongoDBModels/product.model'
import Image from '@utils/MongoDBModels/image.model'
import { connect } from '@utils/database'
import { Product as ProductType } from './Product'
import { ProductInterface } from '../interfaces'

const Query = extendType({
    type: 'Query',
    definition(t) {
        t.field('product', {
            nullable: true,
            args: {
                id: arg({
                    type: 'String',
                    required: true,
                }),
            },
            type: ProductType,
            resolve: async (_, { id }) => {
                await connect()
                const product = await Product.findById(id)

                const output: ProductInterface = {
                    label: product.label,
                    manufacturer: product.manufacturer,
                    description: product.description,
                    price: product.price,
                    type: product.type,
                    id: product._id,
                    images: await Promise.all(
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

        t.field('productsCount', {
            type: 'Int',
            args: {
                type: arg({
                    type: 'String',
                    required: false,
                    default: '',
                }),
            },
            resolve: async (_, { type }) => {
                await connect()
                const products: IProduct[] = await Product.find({
                    type: RegExp(type === 'all' ? '' : type),
                })
                return products.length
            },
        })

        t.list.field('products', {
            type: ProductType,
            args: {
                offset: arg({
                    type: 'Int',
                    required: false,
                    default: 0,
                }),

                limit: arg({
                    type: 'Int',
                    required: false,
                    default: 6,
                }),
                type: arg({
                    type: 'String',
                    required: false,
                    default: '',
                }),
            },
            // variables: {},
            resolve: async (root, { offset, limit, type }) => {
                await connect()

                const products: IProduct[] = await Product.find({
                    type: RegExp(type === 'all' ? '' : type),
                })
                const slicedProducts = products.slice(offset, offset + limit)
                // const slicedProducts = products
                const output: ProductInterface[] = await Promise.all(
                    slicedProducts.map(async (product) => ({
                        label: product.label,
                        manufacturer: product.manufacturer,
                        description: product.description,
                        price: product.price,
                        type: product.type,
                        id: product._id,
                        images: await Promise.all(
                            product.images.map(async (imageID) => {
                                const image = await Image.findById(imageID)
                                return {
                                    src: image.src,
                                    alt: image.alt,
                                }
                            })
                        ),
                    }))
                )
                return output
            },
        })
    },
})

export { Query }
