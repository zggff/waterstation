import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@utils/database'
import Product, { IProductModel } from '@utils/MongoDBModels/product.model'

export default async function Response(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<{ error: null }> {
    try {
        const {
            query: { type },
        } = req
        await connect()
        if (type === 'all') {
            const result: Array<IProductModel> = await Product.find()
            res.json({ response: result })
        } else {
            const result = await Product.find({ type: type.toString() })
            res.json({ response: result })
        }
    } catch (e) {
        res.json({ error: e, response: null })
    }
    return { error: null }
}
