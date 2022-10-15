import styles from './Index.module.css'
import MoreCar from '../../assets/images/cardealer.png'
import { useState } from 'react'
import SearchIcon from '../../assets/icons/search-normal.png';
import { CarCard } from '../../components/CarCard';

export function HomePage() {

    const [search, setSearch] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
       console.log(search)
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
        </main>
    )
}