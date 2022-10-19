import styles from './Profile.module.css'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, useParams } from 'react-router-dom';

export function Profile() {
    const navigate = useNavigate()
    const params = useParams();

    const auth = getAuth();
    const user = onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            console.log('Usuário Logado ===> ', user.uid)
            console.log(auth.currentUser.uid)
        } else {
            console.log('Usuário não logado!!')
        }
    })

    const handleLogout = () => {
        auth.signOut();
        navigate('/')
    }

    return (
        <div>
            <h1>Bem Vindo</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}