import React, {useState} from "react";
import {Link} from 'react-router-dom';
import "../pages/LevelOne/LevelOne.css";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import {toast} from 'react-toastify'
import { useEffect } from "react";
import {ChatWidget} from "@papercups-io/chat-widget";


export const HeaderForMain = (props) => {

    const [isOpen, setOpen] = useState();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    const [verified, setVerified] = useState(false)
    const [chatUser, setChatUser] = useState({})
    const { pathname } = useLocation();

    const logout = async () => {
        await axios.get("/auth/logout", {
        withCredentials: true
        });

        //window.Intercom('shutdown');
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
            setChatUser({
                id: user.data.id,
                phone: user.data.phone,
                name: user.data.name,
                email: user.data.email, 
                isAdmin: user.data.isAdmin, 
                level: user.data.level
            })
            setVerified(true)
            // INTERCOM
            // if (!user.data.isAdmin){
            //     window.Intercom('boot', {
            //         api_base: "https://api-iam.intercom.io",
            //         app_id: 'lu9lx80w',
            //         name: user.data.name,
            //         email: user.data.email,
            //         user_id: user.data.user_id,
            //     });
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
    <div>       
        {/* <NewYear/> */}

            <header   className="header-level">
                <Link to="/"><span className="header-logo"><img src="images/logo-white.png" alt="logo" width={70} height={94}/></span></Link>
                <nav id="burger-nav" className={`header-nav ${isOpen? "active" : ""}`}>
                    <ul className="header-nav-list">
                    <Link to="/aboutus"><li className="header-nav-items aboutt">About Us</li></Link>
                        {!props.isUser && <a href="/#testimonials"><li className="header-nav-items">Testimonials</li></a>}
                        <a href="/#contacts"><li className="header-nav-items">Contacts</li></a>
                        <a href="/#pricing"><li className="header-nav-items">Pricing</li></a>
                        <Link to="/foremployer"><li className="header-nav-items employer">For the U.S. employer</li></Link>
                        {/* Only show if not authorized */}
                {
                        !user && 
                        <>

                        <Link
                            className=" item-buttonss-login login-l mar-left"
                            to="/login"
                            state={{previousPath: pathname}}
                        >
                        Log in
                        </Link>
                        <Link
                            className = " item-buttonss  sign-l mar-right"
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
                            <Link className=" item-buttonss login-l" to="/admin">Admin</Link>
                        }

    <li className="wel-email-main  welcome ">Welcome {email}</li>
                        <div
                            className = " item-buttonss sign-l"
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
            {!isAdmin && user &&
              <ChatWidget
                token="72a7fb3a-9c04-493c-93db-f063f9c1b77d"
                inbox="f0b19045-fa6e-4051-af3a-25bb87bb0588"
                title="Welcome to VisaInUSA"
                subtitle="Ask us anything in the chat window below 😊"
                primaryColor="#0693e3"
                greeting="Hello! Any question?"
                newMessagePlaceholder="Start typing..."
                showAgentAvailability={true}
                agentAvailableText="We're online right now!"
                agentUnavailableText="We're away at the moment."
                requireEmailUpfront={true}
                iconVariant="filled"
                baseUrl="https://app.papercups.io"
                // Optionally include data about your customer here to identify them
                customer={{
                    name: chatUser.name,
                    phone: chatUser.phone,
                    email: chatUser.email,
                    external_id: chatUser.id,
                    metadata: {
                      level: chatUser.level
                    }
                  }}
              />
          }
        </div>
    )
}
