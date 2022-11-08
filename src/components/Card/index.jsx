import styles from './Cards.module.css'
import { FaMapMarkerAlt } from "react-icons/fa";

export function Card({id, image, title, price, location}) {
    return (
        <div key={id} className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={image} alt={title} />
                <header className={styles.cardTitle}>
                    <h4>{title}</h4>
                </header>
            </div>
            <div className={styles.price__box}>
                <span>R$ {price}</span>
            </div>
            <div className={styles.location__box}>
                <span className={styles.location}>{location}</span>
                <FaMapMarkerAlt />
            </div>
        </div>
    )
}