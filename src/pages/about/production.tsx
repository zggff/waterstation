import React from 'react'
import { MainLayout } from '@components/main-layout'
import styles from '@styles/pages.module.scss'
import ImageStyles from '@styles/imageContainers.module.scss'

interface IImage {
    src: string
    alt: string
}

const images: IImage[] = [
    {
        src: '/static_images/production_stages/PICT0182.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0185.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0187.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0189.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0191.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0192.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0198.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/production_stages/PICT0200.jpg',
        alt: 'e',
    },
]

const ExchangePoints = (): JSX.Element => {
    return (
        <MainLayout title="О компании" description="Информация о компании">
            <h1>Производство воды</h1>
            <ul className={ImageStyles.bigHorizontalContainer}>
                {images.map((image) => (
                    <li key={image.src}>
                        <img src={image.src} alt={image.alt} />
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}

export default ExchangePoints
