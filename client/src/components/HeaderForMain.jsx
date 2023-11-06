import React, {useState} from "react";
import {Link} from 'react-router-dom';
import "../pages/LevelOne/LevelOne.css";



export const HeaderForMain = () => {

    const [isOpen, setOpen] = useState();

    return (
        <header className="header-level">
            <Link to="/"><span className="header-logo"><img src="images/logo.png" alt="logo" width={70} height={94}/></span></Link>
            <nav className={`header-nav ${isOpen? "active" : ""}`}>
                <ul className="header-nav-list">
                <Link to="/aboutus"><a href="/#aboutus"><li className="header-nav-item">About Us</li></a></Link>
                    <a href="/#testimonials"><li className="header-nav-item">Testimonials</li></a>
                    <a href="/#contacts"><li className="header-nav-item">Contacts</li></a>
                    <a href="/#pricing"><li className="header-nav-item">Pricing</li></a>
                    <Link to="/foremployer"><li className="header-nav-item employer">For the U.S. employer</li></Link>
                    <Link to="/login"><li className="header-nav-item item-button-l login-l">Log in</li></Link>
                    <Link to="/signup"><li className="header-nav-item item-button-l sign-l">Sign up</li></Link>
                </ul>
            </nav>
            <button className="header-menu-button"
            onClick={() => setOpen(!isOpen)}
            >< img src="images/menu.png" alt="menu"  width={24} height={24} /></button>
        </header>
    )
}
