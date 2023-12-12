import Layout from './components/Layout';
import Missing from './components/Missing';
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
import Jobs from './pages/Jobs/Jobs';
import JobInfo from './components/JobInfo';
import AddJob from './components/AddJob';
import { Admin } from './pages/Admin/Admin';
import EditJob from './pages/JobEdit/JobEdit';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import ApplyNow from './components/ApplyNow/ApplyNow';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./App.css"

const Popup = ({onClose}) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p className='p-popup'>
          Level 2 is the best way to reach the goal! We may help you. Check it out by <Link to="/leveltwo" onClick={onClose}>clicking here</Link>
        </p>
        <button className='button-popup' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function App() {
  const { pathname, state } = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!state){
      window.scrollTo(0, 0)
    }

    if (localStorage.getItem('agreementShown')) {
      setAgreed(true);
      setShowModal(false);
    }

    const intervalId = setInterval(() => {
      setShowPopup(true);
    }, 5* 60 * 1000);

    return () => clearInterval(intervalId);

  }, [pathname, state, showPopup]);


  const [showModal, setShowModal] = useState(
    !localStorage.getItem('agreementShown')
  );
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(true);
    setShowModal(false);
    localStorage.setItem('agreementShown', 'true');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>  
          {/* {showPopup && <Popup onClose={handleClosePopup} />} */}
          {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p className='disclaimer-text'>
              Disclaimer: "Visa in USA" LLC is not a law firm and does not
              provide legal advice. No information on www.visainusa.com
              constitutes legal advice nor is evidence of an attorney-client
              relationship. To get legal advice, please get in touch with an
              immigration attorney.
            </p>
            <label>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              I read and agree
            </label>
            <button disabled={!agreed} onClick={handleAgree}>
              Continue
            </button>
          </div>
        </div>
      )}
        {/* <CallForm /> */}
        <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/survey" element={<Anketa />} />
          {/* <Route path="/profile" element={<Profile />}/> */}
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
          <Route path="/jobEdit/:id" element={<EditJob/>} />
          <Route path='/addJob' element={<AddJob/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/resetPassword/:token' element={<ResetPassword/>}/>

          <Route path='/applynow' element={<ApplyNow/>}/>
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