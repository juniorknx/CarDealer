import styles from './Cards.module.css'
import { FaMapMarkerAlt } from "react-icons/fa";

export function Card() {
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2022/202210/20221018/toyota-corolla-2.0-xei-16v-flex-4p-automatico-wmimagem14493657038.jpg?s=fill&w=1920&h=1440&q=75" alt="Argo" />
                <header className={styles.cardTitle}>
                    <h4>Fiat Argo</h4>
                </header>
            </div>
            <div className={styles.price__box}>
                <span>R$ 45.500,00</span>
            </div>
            <div className={styles.location__box}>
                <span className={styles.location}>Porto Alegre - RS</span>
                <FaMapMarkerAlt />
            </div>
        </div>
    )
}