export interface ProductInterface {
    label: string
    manufacturer: string
    description: string
    price: number
    images: ImageInterface[]
}

export interface ImageInterface {
    src: string
    alt: string
}
