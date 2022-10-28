import styles from './Profile.module.css'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

export function Profile() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()

    const auth = getAuth();
    const user = onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            console.log(auth.currentUser)
        } else {
            console.log('Usuário não logado!!')
        }
    })

    console.log(auth.uid)

    useEffect(() => {
        const fetchUserProfile = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            try {
                docSnap.exists()
                setProfile(docSnap.data())
            } catch (error) {
                console.log('Deu merda, nada encontrado.')
            }
            setLoading(false)
        }
        fetchUserProfile()
    }, [])

    const handleLogout = () => {
        auth.signOut();
        navigate('/login')
        window.location.reload();
    }

    return (
        <>
            <main>
                <div className={styles.profile}>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className={styles.mainProfile}>
                            <div className={styles.headerProfile}>
                                <h1>Minha Conta</h1>
                            </div>

                            <div className={styles.userInfo}>
                            <div className={styles.userWrapper}>
                                    <label>Nome</label>
                                    <input type='text'
                                        value={profile.name}
                                        disabled
                                    />
                               </div>

                               <div className={styles.userWrapper}>
                                    <label>E-mail</label>
                                    <input type='text'
                                        value={profile.email}
                                        disabled
                                    />
                               </div>

                               <div className={styles.userWrapper}>
                                    <label>Cidade</label>
                                    <input type='text'
                                        value={profile.city}
                                        disabled
                                    />
                               </div>

                               <div className={styles.userWrapper}>
                                    <label>Telefone</label>
                                    <input type='text'
                                        value={profile.phone}
                                        disabled
                                    />
                               </div>
                            </div>

                            <div className={styles.editData}>
                                <button onClick={() => navigate('/editar-conta')}>
                                    Editar Dados
                                </button>

                                <button onClick={handleLogout}>
                                    Sair
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}