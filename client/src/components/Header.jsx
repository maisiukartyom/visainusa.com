import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import "../pages/LevelOne/LevelOne.css";
import "../pages/NewDesign.css";
import axios from "../api/axios";
import {toast} from "react-toastify";
import '../pages/NewDesign.css';
import CallForm from "./CallForm/CallForm";


export const Header = () => {

    const {pathname} = useLocation();
    const [isOpen, setOpen] = useState();  
    const [user, setUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [verified, setVerified] = useState(false)
    const [chatUser, setChatUser] = useState({})
    

    const logout = async () => {
        await axios.get("/auth/logout", {
          withCredentials: true
        });

        //window.Intercom('shutdown');
        setChatUser({})
        setVerified(false);
        setUser(false);
        toast.success('Logged out!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      }


    useEffect(() => {
        const verifyCookie = async (level) => {
            try{
              const user = await axios.post("auth/verify",
                  {
                      requiredLevel: level
                  },
                  {
                      withCredentials: true
                  })
              if (user.data.isAdmin){
                setIsAdmin(true)
              }
              else{
                setIsAdmin(false)
              }
              setChatUser({
                email: user.data.email, 
                isAdmin: user.data.isAdmin, 
                level: user.data.level
              })
              setUser(true)
              setVerified(true)
              // INTERCOM
              // if (!user.data.isAdmin){
              //   window.Intercom('boot', {
              //       api_base: "https://api-iam.intercom.io",
              //       app_id: 'lu9lx80w',
              //       name: user.data.name,
              //       email: user.data.email,
              //       user_id: user.data.user_id,
              //   });
              // }
            }
            catch (err){
              setVerified(true)
              setUser(false)
              //window.Intercom('shutdown');
            }
          }
          
          verifyCookie(0);
          var burgerMenu = document.getElementById('burger-menu');
          var burgerNav = document.getElementById('burger-nav');

          var documentBody = document.body;

          if (verified){
            documentBody.addEventListener('click', function (event) {
              var isClickInsideMenu = burgerMenu.contains(event.target)
              var isClickInsideNav = burgerNav.contains(event.target)
  
              if (burgerNav.className === 'header-nav active' && !isClickInsideNav && !isClickInsideMenu) {
                setOpen(false);
              }
            });
          }

    }, [verified])

    return (
        verified &&
        <>
            <header className="header-level" id="head" >
            <Link to="/"><span className="header-logo"><img src={"/images/logo.png"} alt="logo" width={70} height={94}/></span></Link>
            <nav id="burger-nav" className={`header-nav ${isOpen? "active" : ""}`}>
                <ul className="header-nav-list">
                    <Link to="/aboutus"><li className="header-nav-items aboutt">About Us</li></Link>
                    {!user && <Link to="/" state={{hash: "testimonials"}}><li className="header-nav-items">Testimonials</li></Link>}
                    <Link to="/" state={{hash: "contacts"}}><li className="header-nav-items">Contacts</li></Link>
                    <Link to="/" state={{hash: "pricing"}}><li className="header-nav-items">Pricing</li></Link>
                    <Link to="/foremployer"><li className="header-nav-items employer">For the U.S. employer</li></Link>
                    {
                        !user && 
                        <>
                        <Link
                            className=" item-buttonss-login login-l"
                            to="/login"
                            state={{previousPath: pathname}}
                        >
                        Log in
                        </Link>
                        <Link
                            className=" item-buttonss sign-l"
                            to="/signup"
                        >
                        Sign up
                        </Link>
                        </>
                    }
                    {
                        user &&
                        <>
                        
                        {/* <Link
                            className="header-nav-item item-button-l login-l"
                            to={isAdmin? "/adminChat" : "/profile"}
                        >
                            Profile
                        </Link> */}

                        {
                        isAdmin && 
                            <Link className=" item-buttonss login-l" to="/admin">Admin</Link>
                        }

                        <li className="wel-email welcome  ">Welcome {chatUser.email}</li>
                        <div
                            className=" item-buttonss sign-l"
                            onClick={logout}
                        >
                            Logout
                        </div>
                        </>
                    }
                </ul>
            </nav>
            <button id="burger-menu" className="header-menu-button"
            onClick={() => setOpen(!isOpen)}
            >< img src="/images/menu.png" alt="menu"  width={24} height={24} /></button>
        </header>
        {
          !isAdmin &&
          <CallForm />
        }
        </>
        
    )
}
