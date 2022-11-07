import styles from './Index.module.css'
import MoreCar from '../../assets/images/cardealer.png'
import { useState } from 'react'
import SearchIcon from '../../assets/icons/search-normal.png';
import { CarCard } from '../../components/CarCard';
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import { useEffect } from 'react';

export function HomePage() {

    const [search, setSearch] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        console.log(search)
    }

    useEffect(() => {
        const getVehicles = async () => {
            const q = query(collection(db, "vehicles"),
                orderBy('timestamp', 'desc',),
                limit(3)
            );
            const querySnap = await getDocs(q);
            querySnap.forEach((doc) => {
                console.log(doc.id, " ====> ", doc.data())
            })
        }

        getVehicles()
    }, [])

    return (
        <main>
            <div className={styles.hero__section}>
                <div className={styles.call__itens}>
                    <div className={styles.call_cta}>
                        <h1>Do anúncio á venda,<br>
                        </br>
                            <span>A gente faz tudo!</span>
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Pesquisar por ano ou modelo'
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className={styles.search__container}>
                                <button type='submit'>
                                    Pesquisar
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className={styles.bg__container}>
                        <img src={MoreCar} alt='Car' />
                    </div>
                </div>
            </div>
            <CarCard />

            <div className={styles.carsContainer}>
                <div className={styles.cars_wrapper}>
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
                        </div>
                    </div>

                    {/* CARD 1 */}

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
                        </div>
                    </div>

                    {/* CARD 2 */}

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
                        </div>
                    </div>

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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}