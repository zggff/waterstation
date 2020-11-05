import mongoose, { Schema, Document, Types } from 'mongoose'
import Image, { IImage } from '@utils/MongoDBModels/image.model'

export interface IProduct extends Document {
    type: 'water' | 'cooler' | 'other' | string
    label: string
    manufacturer: string
    price: number
    images: Array<Types.ObjectId>
    description?: string
}

const ProductSchema: Schema = new Schema({
    type: { type: String, required: true },
    label: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: Types.ObjectId, required: false }],
    description: { type: String, required: false },
})

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
