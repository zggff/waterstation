export interface ProductInterface {
    label: string
    manufacturer: string
    description: string
    price: number
    images: ImageInterface[]
    id: string
    type: string
}

export interface ImageInterface {
    src: string
    alt: string
}
