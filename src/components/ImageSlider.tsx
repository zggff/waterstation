import React from 'react'
import { ImageInterface } from '@utils/graphql/interfaces'

export interface Props {
    images: ImageInterface[]
}

export const ImageSlider = ({ images }: Props): JSX.Element => {
    const image = images[0]
    return (
        <div className="slide-container">
            <img src={image.src} alt={image.alt} />
        </div>
    )
}
