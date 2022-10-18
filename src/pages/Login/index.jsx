import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'

export function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <>
            <main>
                <div className={styles.login__Container}>
                    <div className={styles.form__container}>
                        <form onSubmit={handleSubmitForm}>
                            <h1>Bem Vindo</h1>
                            <div className={styles.formGroup}>
                                <label>E-mail</label>
                                <input
                                    type='email'
                                    id="email"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Senha</label>
                                <input
                                    type='password'
                                    id="password"
                                    value={password}
                                    onChange={onChange}
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
                            <span>Ainda não tem uma conta? <Link to="/criar-conta">Criar Conta</Link></span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}