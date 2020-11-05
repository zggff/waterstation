import mongoose, { Schema, Document } from 'mongoose'

export interface IImage extends Document {
    src: string
    alt: string
}

const ImageSchema: Schema = new Schema({
    src: { type: String, required: true, unique: true },
    alt: { type: String, required: true },
})

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema)
