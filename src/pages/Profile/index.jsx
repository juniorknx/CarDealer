import styles from './Profile.module.css'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { getDoc, doc, collection, where, orderBy, getDocs, query, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Card } from '../../components/Card';

export function Profile() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const [cars, setCars] = useState(null)
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
                toast.error('Erro ao encontrar dados de usuário.')
            }
            setLoading(false)
        }
        fetchUserProfile()
    }, [])

    //Fetch the cars announced 
    useEffect(() => {
        const listingCars = async () => {
            const listingsRef = collection(db, 'vehicles')
            const q = query(listingsRef,
                where('userRef', '==', auth.currentUser.uid),
                orderBy('timestamp', 'desc')
            )
            const querySnap = await getDocs(q)
            const vehicles = []

            querySnap.forEach((doc) => {
                return vehicles.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setCars(vehicles)
            setLoading(false)
            console.log(cars)
        }
        listingCars()
    }, [])

    const handleLogout = () => {
        auth.signOut();
        navigate('/login')
        window.location.reload();
    }

   const onDelete = async (id) => {
        if(window.confirm('Excluir anúncio?')){
            await deleteDoc(doc(db, 'vehicles', id))
            window.location.reload()
        }
    }

    const onEdit = (carId) => {
        navigate(`/profile/editar-anuncio/${carId}`)
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
                                <button onClick={() => navigate('/profile/editar-conta')}>
                                    Editar Dados
                                </button>

                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.advertsContainer}>
                    <div>
                        <h1>Meus Anúncios</h1>
                    </div>

                    <div className={styles.vehiclesAnnounced}>
                        {loading ? (
                            <Spinner />
                        ) : cars? (
                            cars.map((adverts) => {
                                return (
                                    <Card
                                        key={adverts.id}
                                        image={adverts.data.imgUrls[0]}
                                        alt={adverts.data.title}
                                        title={adverts.data.title}
                                        price={adverts.data.price}
                                        location={adverts.data.city}
                                        onEdit={() => onEdit(adverts.id)}
                                        onDelete={() => onDelete(adverts.id)}
                                    />
                                )
                            })
                        ) : (<div>Nenhum anúncio encontrado.</div>)}
                    </div>
                </div>
            </main>
        </>
    )
}