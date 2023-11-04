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

// const ROLES = {
//   'User': 2001,
//   'Admin': 5150
// }

// const LEVELS = {
//   'Level 0': 0,
//   'Level 1': 1,
//   'Level 2': 2,
//   'Level 3': 3,
//   'Level 4': 4,
//   'Level 5': 5
// }

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

        {/* we want to protect these routes
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} allowedLevel={[LEVELS['Level 1']]} />}>
          <Route path="/level1" element={<Level1 />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} allowedLevel={LEVELS['Level 0']}/>}>
          <Route path="/checkout" element={<Checkout />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;