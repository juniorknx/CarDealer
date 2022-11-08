import styles from './Index.module.css'
import MoreCar from '../../assets/images/cardealer.png'
import { useState } from 'react'
import { CarCard } from '../../components/CarCard';
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../../firebaseConfig'
import { useEffect } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Card } from '../../components/Card';
import { Spinner } from '../../components/Spinner'
import { toast } from 'react-toastify';

export function HomePage() {
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [vehicles, setVehicles] = useState(null)

    function handleSubmit(e) {
        e.preventDefault();
        console.log(search)
    }

    useEffect(() => {
        const getVehicles = async () => {
            try {
                const q = query(collection(db, "vehicles"),
                    orderBy('timestamp', 'desc',)
                );

                const querySnap = await getDocs(q);
                let cars = []
                querySnap.forEach((doc) => {
                    return cars.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setLoading(false)
                setVehicles(cars)
                console.log(vehicles)
            } catch (error) {
                toast.error('Falha ao obter Listas.')
            }
        }

        getVehicles()
    }, [])

    if (loading === true) {
        return <Spinner />
    }

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
                    {loading ? (
                        <Spinner />
                    ) : vehicles ? (
                        vehicles.map((cars) => {
                            return (
                                <Card
                                    key={cars.id}
                                    image={cars.data.imgUrls[0]}
                                    alt={cars.data.title}
                                    title={cars.data.title}
                                    price={cars.data.price}
                                    location={cars.data.city}
                                />
                            )
                        })
                    ) : <div>Nenhum veículo encontrado.</div>}
                </div>
            </div>
        </main>
    )
}