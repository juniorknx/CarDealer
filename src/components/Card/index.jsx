import styles from './Cards.module.css'
import { FaMapMarkerAlt, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export function Card({ id, image, title, price, location, onDelete, onEdit }) {
    return (
        <div key={id} className={styles.card} onClick={() => console.log('Heyyyyy')}>
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
            {onEdit && <FaPencilAlt className={styles.editIcon} onClick={() => onEdit(id)} />}
            {onDelete && <FaTrashAlt className={styles.deleteIcon} onClick={() => onDelete(id)} />}
        </div>
    )
}