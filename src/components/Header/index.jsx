import styles from './Header.module.css'
import logo from '../../assets/icons/logo.png'
import { Link } from 'react-router-dom'

export function Header() {
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

                        <Link to='/vender'>
                            Vender
                        </Link>

                        <Link className={styles.loginButton} to='/login'>
                            Login
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}