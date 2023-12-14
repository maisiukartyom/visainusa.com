import React from "react";
import "../pages/LevelOne/LevelOne.css";
import "../pages/Main/main.css";
import {Link} from 'react-router-dom';



const Footer = ({isUser}) => {
  return (
      <>
          <footer id="contacts" className=" footer">
              <div className="aboutUs">
                      <h4 className="parr4 light-color">About Us</h4>
                  <Link to="/aboutus">
                      <p className="grey marg">Our team</p>
                  </Link>
              </div>
              <div className="contacts ">
                  <h4 className="parr4 light-color">Services</h4>
                  <Link to="/abouteb3">
                      <p className="grey marg eb3-un">EB-3 Unskilled Visa</p>
                  </Link>
                  <Link to="/" state={{hash: "pricing"}}>
                      <p className="grey marg">Pricing</p>
                      </Link> 
              </div>
               {/* <div className="contacts ">
                  <h4 className="parr4 light-color">Success Stories</h4>
                  <Link to="/" state={{hash: "testimonials"}}>
                      <p className="grey marg">Testimonials</p>
                      </Link> 
              </div>  */}
              <div className="contacts ">
                  <div className="links">
                      <a href="https://t.me/eb3usa" target="_blank" rel='noopener noreferrer'><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/telegram.png?v=1698341412493" alt="telegram" width="38" height="38" /></a>
                      <a href="https://instagram.com/eb3.visa?igshid=MzMyNGUyNmU2YQ==" target="_blank" rel='noopener noreferrer'><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/instagram.png?v=1698341213474" alt="instagram" width="38" height="38" /></a>
                      <a href="https://www.youtube.com/@EB3unskilled" target="_blank" rel='noopener noreferrer'><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/youtube.png?v=1698341435865" alt="youtube" width="38" height="38" /></a>
                  </div>
              </div>
          </footer>
          <div className="created"><p className="we-creat">Created by</p></div>
          <div className="created-we"><a href="https://olya-safronova.glitch.me/" className="we" target="blank"><p > Olya Safronova </p></a> <a className="we"><p >and</p></a><a className="we " href="https://github.com/maisiukartyom" target="blank"><p > Artsiom Maisiuk</p></a> </div>
      </>
  )
}


export default Footer;