import Layout from './components/Layout';
import Admin from './pages/Admin/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Level1 from './components/Level1';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Anketa from './pages/Anketa/Anketa';
import Checkout from './components/Checkout';
import Profile from './pages/Profile/Profile';

function App() {
  console.log("Rendered!")

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/anketa" element={<Anketa />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<Admin />}/>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;