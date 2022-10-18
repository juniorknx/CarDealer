import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './cadastro.module.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export function CreateAccount() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        phone: '',
        password: ''
    })

    const { name, email, city, phone, password } = formData

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    async function handleSubmitForm(e) {
        e.preventDefault()

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            updateProfile(auth.currentUser, {
                displayName: name,
                displayCity: city,
                displayPhone: phone,
                displayEmail: email
            })

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc (db, 'users', user.uid), formDataCopy)

            navigate('/')
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <main>
                <div className={styles.subscribe__Container}>
                    <div className={styles.form__container}>
                        <form onSubmit={handleSubmitForm}>
                            <h1>Crie sua conta</h1>
                            <div className={styles.formGroup}>
                                <label>Nome</label>
                                <input
                                    type='text'
                                    id="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>E-mail</label>
                                <input
                                    type='email'
                                    id="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Cidade</label>
                                <input
                                    type='text'
                                    id="city"
                                    value={city}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Telefone</label>
                                <input
                                    type='text'
                                    id="phone"
                                    value={phone}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Senha</label>
                                <input
                                    type='password'
                                    id="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                            </div>



                            <div className={styles.forgotpass}>
                                <Link to='/forgotpassword'>
                                    Esqueceu sua senha?
                                </Link>
                            </div>

                            <div className={styles.loginButton}>
                                <button type='submit'>
                                    Criar Conta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}