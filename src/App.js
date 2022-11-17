import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { CreateAccount } from './pages/Cadastrar';
import { HomePage } from './pages/Home';
import { Login } from './pages/Login';
import { LostPassword } from './pages/LostPassword';
import { Profile } from './pages/Profile';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import { EditProfile } from './pages/EditAccount';
import { Vender } from './pages/Vender';
import { EditAnuncio } from './pages/EditarAnuncio';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CreateAccount />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path='/profile/editar-conta' element={<EditProfile />} />
            <Route path='/profile/editar-anuncio/:carId' element={<EditAnuncio />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/vender" element={<Vender />} />
          </Route>
          <Route path="/alterar-senha" element={<LostPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
