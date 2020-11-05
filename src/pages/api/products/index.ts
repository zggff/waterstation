import { NextApiRequest, NextApiResponse } from 'next'
import connect from '@utils/database'
import Product, { IProductModel } from '@utils/MongoDBModels/product.model'

export interface IResponse {
    response: Array<IProductModel>
    error: Error
}

export default async function Response(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<{ error: null }> {
    try {
        await connect()
        const result: Array<IProductModel> = await Product.find()
        res.json({ response: result })
    } catch (e) {
        res.json({ error: e, response: null })
    }
    return { error: null }
}
