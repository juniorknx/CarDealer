import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { CreateAccount } from './pages/Cadastrar';
import { HomePage } from './pages/Home';
import {Login} from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CreateAccount />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
