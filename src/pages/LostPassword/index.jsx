import styles from '../LostPassword/LostPassword.module.css'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

export function LostPassword() {

    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            alert('E-mail enviado com sucesso!!')
        } catch (error) {
            console.log('Deu algum problema')
        }
    }


    return (
        <>
            <main>
                <div className={styles.subscribe__Container}>
                    <div className={styles.form__container}>
                        <form onSubmit={handleResetPassword}>
                            <h1>Recuperar Senha</h1>
                            <div className={styles.formGroup}>
                                <label>E-mail</label>
                                <input
                                    type='email'
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.loginButton}>
                                <button type='submit'>
                                    Redefinir Senha
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}