import React, {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import "../pages/LevelOne/LevelOne.css";
import axios from "../api/axios";
import {toast} from "react-toastify";


export const Header = () => {

    const {pathname} = useLocation();
    const [isOpen, setOpen] = useState();  
    const [user, setUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [verified, setVerified] = useState(false)

    const logout = async () => {
        await axios.get("/auth/logout", {
          withCredentials: true
        });
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
              setUser(true)
              setVerified(true)
            }
            catch (err){
              setVerified(true)
              setUser(false)
            }
          }
      
          verifyCookie(0)
    }, [verified])

    return (
        verified &&
        <header className="header-level">
            <Link to="/"><span className="header-logo"><img src="images/logo.png" alt="logo" width={70} height={94}/></span></Link>
            <nav className={`header-nav ${isOpen? "active" : ""}`}>
                <ul className="header-nav-list">
                    <Link to="/aboutus"><li className="header-nav-item">About Us</li></Link>
                    <Link to="/" state={{hash: "testimonials"}}><li className="header-nav-item">Testimonials</li></Link>
                    <Link to="/" state={{hash: "contacts"}}><li className="header-nav-item">Contacts</li></Link>
                    <Link to="/" state={{hash: "pricing"}}><li className="header-nav-item">Pricing</li></Link>
                    <Link to="/foremployer"><li className="header-nav-item employer">For the U.S. employer</li></Link>
                    {
                        !user && 
                        <>
                        <Link
                            className="header-nav-item item-button-l login-l"
                            to="/login"
                            state={{previousPath: pathname}}
                        >
                        Log in
                        </Link>
                        <Link
                            className="header-nav-item item-button-l sign-l"
                            to="/signup"
                        >
                        Sign up
                        </Link>
                        </>
                    }
                    {
                        user &&
                        <>
                        
                        <Link
                            className="header-nav-item item-button-l login-l"
                            to={isAdmin? "/admin" : "/profile"}
                        >
                            Profile
                        </Link>

                        <div
                            className="header-nav-item item-button-l sign-l"
                            onClick={logout}
                        >
                            Logout
                        </div>
                        </>
                    }
                </ul>
            </nav>
            <button className="header-menu-button"
            onClick={() => setOpen(!isOpen)}
            >< img src="images/menu.png" alt="menu"  width={24} height={24} /></button>
        </header>
    )
}
