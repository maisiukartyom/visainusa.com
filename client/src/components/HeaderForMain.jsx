import React, {useState} from "react";
import {Link} from 'react-router-dom';
import "../pages/LevelOne/LevelOne.css";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import {toast} from 'react-toastify'
import { useEffect } from "react";


export const HeaderForMain = (props) => {

    const [isOpen, setOpen] = useState();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [verified, setVerified] = useState(false)
    const { pathname } = useLocation();

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
        props.logout()
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
            setEmail(user.data.email)
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
            <Link to="/"><span className="header-logo"><img src="images/logo-white.png" alt="logo" width={70} height={94}/></span></Link>
            <nav className={`header-nav ${isOpen? "active" : ""}`}>
                <ul className="header-nav-list">
                <Link to="/aboutus"><li className="header-nav-items">About Us</li></Link>
                    <a href="/#testimonials"><li className="header-nav-items">Testimonials</li></a>
                    <a href="/#contacts"><li className="header-nav-items">Contacts</li></a>
                    <a href="/#pricing"><li className="header-nav-items">Pricing</li></a>
                    <Link to="/foremployer"><li className="header-nav-items employer">For the U.S. employer</li></Link>
                    {/* Only show if not authorized */}
               {
                    !user && 
                    <>
                    <Link
                        className="header-nav-items item-buttons login-l"
                        to="/login"
                        state={{previousPath: pathname}}
                    >
                    Log in
                    </Link>
                    <Link
                        className = "header-nav-items item-buttons sign-l"
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
                        to={isAdmin? "/admin" : "/profile"}
                    >
                        Profile
                    </Link> */}
                    {
                        isAdmin && 
                        <Link className="header-nav-items item-buttons login-l" to="/admin">Admin</Link>
                    }

<li className="header-nav-items  welcome ">Welcome {email}</li>
                    <div
                        className = "header-nav-items item-buttons sign-l"
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
            >< img src="/images/menu.png" alt="menu"  width={24} height={24} /></button>
        </header>
    )
}
