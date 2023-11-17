import React from "react";
import "../pages/LevelOne/LevelOne.css";
import "../pages/Main/main.css"



const Footer = () => {
  return (
      <>
          <footer id="contacts" className=" footer">
              <div className="aboutUs">
                  <a href="#">
                      <h4 className="parr4 light-color">About Us</h4>
                  </a>
                  <a href="#">
                      <p className="grey marg">Our team</p>
                  </a>
                  <a href="#">
                      <p className="grey marg">Advantages</p>
                  </a>
              </div>
              <div className="contacts ">
                  <h4 className="parr4 light-color">Services</h4>
                  <a href="#">
                      <p className="grey marg">EB-3 Unskilled Visa</p>
                  </a>
                  <a href="#pricing">
                      <p className="grey marg">Pricing</p>
                  </a>
              </div>
              <div className="contacts ">
                  <h4 className="parr4 light-color">Success Stories</h4>
                  <a href="#testimonials">
                      <p className="grey marg">Testimonials</p>
                  </a>
              </div>
              <div className="contacts ">
                  <div className="links">
                      <a href="https://web.telegram.org/k/#@eb3usa" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/telegram.png?v=1698341412493" alt="telegram" width="38" height="38" /></a>
                      <a href="#" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/facebook.png?v=1698341176410" alt="facebook" width="38" height="38" /></a>
                      <a href="#" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/instagram.png?v=1698341213474" alt="instagram" width="38" height="38" /></a>
                      <a href="https://www.youtube.com/@EB3unskilled" target="_blank"><img className="link-margin" src="https://cdn.glitch.global/eed07d64-49b2-4c82-baf4-2a0def1065aa/youtube.png?v=1698341435865" alt="youtube" width="38" height="38" /></a>
                  </div>
              </div>
          </footer>
      </>
  )
}


export default Footer;