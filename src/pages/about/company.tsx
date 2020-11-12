import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MainLayout } from '@components/main-layout'
import styles from '@styles/pages.module.scss'
import ImageStyles from '@styles/imageContainers.module.scss'

interface IImage {
    src: string
    alt: string
}

const images: IImage[] = [
    {
        src: '/static_images/sertificates/sertifikat-sootvetstviya-arkhyz-26-05-2018-1.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/sertificates/sertifikat-sootvetstviya-arkhyz-26-05-2018-2.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/sertificates/sertifikat-sootvetstviya-arkhyz-26-05-2018-3.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/sertificates/sertifikat-sootvetstviya-arkhyz-26-05-2018-4.jpg',
        alt: 'e',
    },
    {
        src:
            '/static_images/sertificates/sertifikat-sootvetstviya-utrennyaya-zvezda-07-12-2017.jpg',
        alt: 'e',
    },
    {
        src: '/static_images/sertificates/sertifikat-sootvetstviya-zolotye-rossypi-01-12-2017.jpg',
        alt: 'e',
    },
]

const Sertificate = ({
    image,
    onClick,
}: {
    image: IImage
    onClick: (event: React.MouseEvent) => void
}): JSX.Element => {
    return (
        <>
            <button type="button" onClick={onClick}>
                <img src={image.src} alt={image.alt} />
            </button>
        </>
    )
}

const Sertificates = (): JSX.Element => {
    const [fullScreen, setFullScreen] = useState(-1)
    const fullScreenRef = useRef(fullScreen)
    const fullScreenContainer = useRef(null)
    const incrementFullscreen = () => {
        if (fullScreenRef.current === images.length - 1) {
            setFullScreen(0)
        } else {
            setFullScreen(fullScreenRef.current + 1)
        }
    }

    const decrementFullscreen = () => {
        if (fullScreenRef.current === 0) {
            setFullScreen(images.length - 1)
        } else {
            setFullScreen(fullScreenRef.current - 1)
        }
    }
    const handleKeyboard = useCallback(
        (event: KeyboardEvent) => {
            if (!fullScreenContainer.current) {
                return
            }
            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                incrementFullscreen()
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                decrementFullscreen()
            }
        },
        [fullScreen]
    )
    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!fullScreenContainer.current) {
                return
            }
            if (!fullScreenContainer.current.contains(event.target)) {
                setFullScreen(-1)
                document.removeEventListener('mousedown', handleClick)
            } else {
                incrementFullscreen()
            }
        },
        [fullScreen]
    )
    useEffect(() => {
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('keydown', handleKeyboard)
        }
    }, [])
    useEffect(() => {
        fullScreenRef.current = fullScreen
    }, [fullScreen])

    return (
        <>
            <ul className={ImageStyles.horizontalContainer}>
                {images.map((image, index) => (
                    <li key={image.src}>
                        <button
                            type="button"
                            onClick={() => {
                                document.addEventListener('mousedown', handleClick)
                                document.addEventListener('keydown', handleKeyboard)

                                setFullScreen(index)
                            }}
                        >
                            <img src={image.src} alt={image.alt} />
                        </button>
                    </li>
                ))}
            </ul>
            {fullScreen >= 0 && (
                <div className={ImageStyles.fullScreen}>
                    <div ref={fullScreenContainer}>
                        <img src={images[fullScreen].src} alt={images[fullScreen].alt} />
                    </div>
                </div>
            )}
        </>
    )
}

const Company = (): JSX.Element => {
    return (
        <MainLayout title="О компании" description="Информация о компании">
            <h1>О компании</h1>
            <p>
                Компания &laquo;АкваЭкспресс&raquo; уже более 12 лет весьма успешно работает на
                российском рынке питьевой воды. Предприятие компании находится на юге Московской
                области, в г. Коломна.&nbsp;
                <strong>
                    Доставка воды осуществляется по г. Коломна, Коломенскому району, городам
                    Луховицы, Воскресенск, Егорьевск, Шатура, Москва.
                </strong>
            </p>
            <p>
                Одной из основных задач компании является забота о здоровье взрослых и детей,
                поэтому мы предоставляем на рынок только высококачественную продукцию.
            </p>
            <p>Наш девиз: &quot;Для других это просто бизнес, для нас забота о людях!&quot;</p>
            <h1>
                <strong>Компания развивает несколько направлений работы:</strong>
            </h1>
            <ul className={styles.coolList}>
                <li>Доставка воды на дом и в офис в 19-литровых баллонах;</li>
                <li>Продажа питьевой воды оптом и в розницу;</li>
                <li>Развитие сети пунктов обмена воды;</li>
                <li>Продажа оборудования и аксессуаров для нагрева и охлаждения питьевой воды.</li>
            </ul>
            <p>
                За время работы на рынке мы приобрели много надежных партнеров, с которыми работаем
                и по нынешний момент.
            </p>
            <p>Вся наша продукция сертифицирована:</p>
            <Sertificates />
        </MainLayout>
    )
}

export default Company
