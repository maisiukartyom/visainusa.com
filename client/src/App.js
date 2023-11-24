import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Anketa from './pages/Anketa/Anketa';
import Profile from './pages/Profile/Profile';
import LevelOne from './pages/LevelOne/LevelOne';
import ForEmployer from './pages/ForEmployer/ForEmployer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LevelTwo from './pages/LevelTwo/LevelTwo';
import AbotUs from './pages/AboutUs/AboutUs';
import LevelThree from './pages/LevelThree/LevelThree';
import Payment from './components/Payment';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminChat from './pages/AdminChat/AdminChat';
import AboutEB3 from './pages/AboutEB3/AboutEb3';
import CallForm from './components/CallForm/CallForm';
import Jobs from './pages/Jobs/Jobs';
import JobInfo from './components/JobInfo';
import AddJob from './components/AddJob';

function App() {
  // console.log("Rendered!")

  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!state){
      window.scrollTo(0, 0)
    }
  }, [pathname, state])

  return (
    <>
        <CallForm />
        <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/survey" element={<Anketa />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/adminChat" element={<AdminChat />}/>
          <Route path="/adminDashboard" element={<Dashboard />}/>
          <Route path="/levelone" element={<LevelOne />} />
          <Route path="/leveltwo" element={<LevelTwo />} />
          <Route path="/levelthree" element={<LevelThree />} />
          <Route path="/foremployer" element={<ForEmployer />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/aboutus" element={<AbotUs />} />
          <Route path="/abouteb3" element={<AboutEB3 />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobinfo/:id" element={<JobInfo/>} />
          <Route path='/addJob' element={<AddJob/>}/>
          <Route path='/youtube' component={() => {
                      window.location.href = 'https://www.youtube.com/@EB3unskilled'
                  }}/>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;