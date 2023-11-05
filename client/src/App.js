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
import LevelOne from './pages/LevelOne/LevelOne';
import ForEmployer from './pages/ForEmployer/ForEmployer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  console.log("Rendered!")

  return (
    <>
        <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/survey" element={<Anketa />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/levelone" element={<LevelOne />} />
          <Route path="/foremployer" element={<ForEmployer />} />
          <Route path='/youtube' component={() => {
                      window.location.href = 'https://www.youtube.com/@EB3unskilled'
                  }}/>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;