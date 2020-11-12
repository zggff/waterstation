import React from 'react'
import { MainLayout } from '@components/main-layout'
import styles from '@styles/pages.module.scss'

const Contact = (): JSX.Element => {
    // console.log(styles)

    return (
        <MainLayout title="Контакты" description="Контактная информация">
            <h1>Контакты</h1>
            <p>
                <strong>ООО &laquo;АкваЭкспресс&raquo;</strong>
                <br />
                140400, Московская область, г. Коломна, ул. Октябрьской революции, д. 429Б.
            </p>
            <hr />
            <strong>Телефоны:</strong>
            <ul className={styles.coolList}>
                <li>+7 (496) 618-84-54</li>
                <li>+7 (965) 244-03-19 +7</li>
                <li>+7 (496) 610-11-11 бухгалтерия</li>
            </ul>
            <p>Прием заказов с 9:00 до 17:00.</p>
            <hr />
            <p>
                <strong>Адреса обменных пунктов по г. Коломна:</strong>
            </p>
            <ul className={styles.coolList}>
                <li>Союз-Сервис №3 &ndash; ул. Зеленая д. 31 (напротив Пединститута)</li>
                <li>Союз-Сервис №6 &ndash; ул. Октябрьской революции д. 163а (Городищи)</li>
                <li>ЗАО &laquo;Продтовары&raquo; №11 &ndash; Кирова д. 17</li>
                <li>ЗАО &laquo;Продтовары&raquo; №14 &ndash; Ленина д. 70</li>
                <li>ЗАО &laquo;Продтовары&raquo; №121 &ndash; ул. Октябрьской Революции д. 414</li>
                <li>ЗАО &laquo;Продтовары&raquo; №32 &ndash; ул. Пионерская д. 50 (Болотный)</li>
                <li>Магазин &laquo;СМАК&raquo; - Песковское шоссе д. 42 (Радужный)</li>
                <li>Магазин &laquo;СМАК&raquo;-Малинское шоссе д.24а (Городищи)&nbsp;</li>
            </ul>
        </MainLayout>
    )
}

export default Contact
