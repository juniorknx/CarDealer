import styles from './Vender.module.css'
import { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { v4 as uuiv4 } from 'uuid'
import { db } from '../../firebaseConfig';




export function Vender() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        city: '',
        year: '',
        cambio: '',
        carroceria: '',
        combustivel: '',
        color: '',
        description: '',
        images: {

        }
    })

    const {
        title,
        price,
        city,
        year,
        cambio,
        carroceria,
        combustivel,
        color,
        description,
        images
    } = formData

    const auth = getAuth()
    const navigate = useNavigate();
    const isMounted = useRef(true);

    //Pega as informacoes do usuario
    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid, userName: user.displayName })
                } else {
                    navigate('/login')
                }
                console.log('USUÁRIO INFOS ====>', user.email)
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])


    const onChange = (e) => {
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: Array.from(e.target.files)
            }))
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value
            }))
        }
    }

    async function handleSubmitForm(e) {
        e.preventDefault()

        //verifica o limite de imagens enviadas
        if (images.length > 6) {
            setLoading(false)
            toast.error('Limite máximo de 6 imagens :(')
            return
        }

        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuiv4()}`
                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log('Upload is ' + progress + '% done')
                        setLoading(true)
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused')
                                break
                            case 'running':
                                console.log('Upload is running')
                                break
                            default:
                                break
                        }
                    },
                    (error) => {
                        reject(error)
                        setLoading(false)
                        toast.error('Erro ao adicionar imagem!')
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL)
                        })
                    }
                );
            })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error('Image not uploaded')
            return
        })

        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp()
        }

        delete formDataCopy.images

        console.log(formDataCopy)

        const docRef = await addDoc(collection(db, 'vehicles'), formDataCopy)
        setLoading(false)
        toast.success('Veiculo Adicionado')
        navigate('/')
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <main>
                <div className={styles.subscribe__Container}>
                    <div className={styles.form__container}>
                        <form onSubmit={handleSubmitForm}>
                            <h1>Anúnciar meu veículo</h1>
                            <div className={styles.formGroup}>
                                <label>Titulo</label>
                                <input
                                    type='text'
                                    id="title"
                                    value={title}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Preço</label>
                                <input
                                    type='text'
                                    id="price"
                                    value={price}
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
                                <label>Ano</label>
                                <input
                                    type='text'
                                    id="year"
                                    value={year}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Câmbio</label>
                                <input
                                    type='text'
                                    id="cambio"
                                    value={cambio}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Carroceria</label>
                                <input
                                    type='text'
                                    id="carroceria"
                                    value={carroceria}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Combustível</label>
                                <input
                                    type='text'
                                    id="combustivel"
                                    value={combustivel}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Cor</label>
                                <input
                                    type='text'
                                    id="color"
                                    value={color}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Descrição</label>
                                <textarea
                                    type='textarea'
                                    id="description"
                                    value={description}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Imagens (Max 6).</label>
                                <input
                                    className={styles.formInputFile}
                                    type='file'
                                    id="images"
                                    max='6'
                                    accept='.jpg,.png,.jpeg'
                                    multiple
                                    onChange={onChange}
                                    required
                                />
                            </div>


                            <div className={styles.loginButton}>
                                <button type='submit'>
                                    Publicar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}