import React from 'react'
import { MainLayout } from '@components/main-layout'
import styles from '@styles/pages.module.scss'

const Index = (): JSX.Element => {
    return (
        <MainLayout title="Главная Страница">
            <h1>АкваЭкспресс - служба доставки воды</h1>
            <p>
                Компания &laquo;АкваЭкспресс&raquo; уже более 10 лет успешно работает на Российском
                рынке. Предприятие компании находится на юге Московской области, в г. Коломна.
                Направления работы компании:
            </p>
            <ul className={styles.coolList}>
                <li>Доставка воды на дом и в офис в 19-литровых бутылях;</li>
                <li>Розничная и оптовая продажа воды;</li>
                <li>Организация сети пунктов обмена воды;</li>
                <li>Продажа оборудования и аксессуаров для нагрева и охлаждения питьевой воды.</li>
            </ul>
            <p>
                Для Вашего удобства мы организовали сеть пунктов обмена воды в Коломне, в которых в
                любое удобное время Вы сможете поменять пустые бутыли на бутили с водой. Сеть
                пунктов обмена постоянно расширяется. Доставка воды осуществляется по г. Коломна,
                Коломенскому району, городам Луховицы, Воскресенск, Егорьевск, Шатура.
            </p>
            <h2>Преимущества нашей компании как поставщика питьевой воды:</h2>
            <ul className={styles.coolList}>
                <li>
                    Качество воды - Питьевая вода &laquo;Утренняя звезда&raquo; - природная питьевая
                    вода I категории, прошедшая многоступенчатую натуральную очистку, насыщенная
                    ионами серебра;
                </li>
                <li>
                    Вкусовые характеристики - на VI Международном форуме &laquo;Мир чистой
                    воды&raquo; награждена Серебряной медалью, нам отдают предпочтение те клиенты,
                    которые пили воду &laquo;Nestle&raquo;, &laquo;Королевская вода&raquo;,
                    &laquo;Славутич&raquo;, &laquo;Берегиня&raquo; и др. воды;
                </li>
                <li>
                    Точные сроки поставок - наше основное преимущество перед конкурентами, мы
                    бережем время наших клиентов;
                </li>
                <li>Конкурентоспособные цены.</li>
            </ul>
            <p>
                Одним словом, основная задача компании - забота о здоровье взрослых и детей, поэтому
                мы предоставляем на рынок только высококачественную продукцию.
            </p>
        </MainLayout>
    )
}

export default Index
