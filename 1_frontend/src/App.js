import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import AdminPage from './pages/AdminPage';
import UsersPage from './pages/UsersPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<AdminPage />} />
        <Route path='/users' element={<UsersPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
