import styles from './Header.module.css'
import logo from '../../assets/icons/logo.png'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';

export function Header() {
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogged(true)
            }
        })
    }, [logged])

    return (
        <header>
            <div className={styles.header__container}>
                <div>
                    <figure>
                        <Link to='/'>
                            <img src={logo} alt='' />
                        </Link>
                    </figure>
                </div>

                <div>
                    <nav>
                        <Link to='/'>
                            Início
                        </Link>

                        <Link to='/veiculos'>
                            Veículos
                        </Link>

                        <Link to='/profile/vender'>
                            Vender
                        </Link>

                        <Link className={styles.loginButton} to={logged === true ? '/profile' : '/login'}>
                            {logged === true ? 'Meu Perfil' : 'Login'}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}