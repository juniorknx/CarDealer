import styles from './EditAccount.module.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { getDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function EditProfile() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        phone: ''
    })

    const { name, email, city, phone } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const navigate = useNavigate()

    const auth = getAuth();
    const user = onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
        } else {
            console.log('Usuário não logado!!')
        }
    })

    useEffect(() => {
        const fetchUserProfile = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            try {
                docSnap.exists()
                setProfile(docSnap.data())
            } catch (error) {
                toast.error('Nenhum item encontrado.')
            }
            setLoading(false)
        }
        fetchUserProfile()
    }, [])

    const handleUpdateData = async () => {
        try {
            const userUpdate = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userUpdate, {
                ...formData,
                name,
                email,
                city,
                phone,
                timestamp: serverTimestamp()
            })
            toast.success('Dados atualizados com sucesso!')
            navigate('/profile')
        } catch (error) {
            console.log(error)
            toast.error('Falha ao atualizar dados!')
        }
    }

    console.log(profile)
    return (
        <>
            <main>
                <div className={styles.profile}>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className={styles.mainProfile}>
                            <div className={styles.headerProfile}>
                                <h1>Editar Minha Conta</h1>
                            </div>

                            <div className={styles.userInfo}>
                                <div className={styles.userWrapper}>
                                    <label>Nome</label>
                                    <input type='text'
                                        id="name"
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className={styles.userWrapper}>
                                    <label>E-mail</label>
                                    <input type='text'
                                        id="email"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className={styles.userWrapper}>
                                    <label>Cidade</label>
                                    <input type='text'
                                        id="city"
                                        value={city}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className={styles.userWrapper}>
                                    <label>Telefone</label>
                                    <input type='text'
                                        id="phone"
                                        value={phone}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div className={styles.editData}>
                                <button onClick={handleUpdateData}>
                                    Atualizar
                                </button>

                                <button onClick={() => navigate('/profile')}>
                                    Voltar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}