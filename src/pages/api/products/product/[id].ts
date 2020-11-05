import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@utils/database'
import Product, { IProductModel } from '@utils/MongoDBModels/product.model'

export default async function Response(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<{ error: null }> {
    try {
        const {
            query: { id },
        } = req
        await connect()
        // const result: Array<IProduct> = await Product.find()
        res.json({ response: id })
    } catch (e) {
        res.json({ error: e, response: null })
    }
    return { error: null }
}
