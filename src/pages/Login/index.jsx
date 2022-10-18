import { Link } from 'react-router-dom'
import styles from './Login.module.css'

export function Login() {
    return (
        <>
            <main>
                <div className={styles.login__Container}>
                    <div className={styles.form__container}>
                        <form>
                            <h1>Bem Vindo</h1>
                            <div className={styles.formGroup}>
                                <label>E-mail</label>
                                <input
                                    type='text'
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Senha</label>
                                <input
                                    type='password'
                                />
                            </div>

                            <div className={styles.forgotpass}>
                                <Link to='/forgotpassword'>
                                    Esqueceu sua senha?
                                </Link>
                            </div>

                            <div className={styles.loginButton}>
                                <button type='submit'>
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className={styles.createAccount}>
                            <span>Ainda não tem uma conta? <Link to="/cadastrar">Criar Conta</Link></span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}