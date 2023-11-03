import React from "react";
import "../pages/LevelOne/LevelOne.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-column">
          <h3>ABOUT US</h3>
          <p>Our team</p>
          <p>Advantages</p>
        </div>
        <div className="footer-column">
          <h3>SERVICES</h3>
          <p>EB-3 Unskilled Visa</p>
          <p>Pricing</p>
        </div>
               
        <div className="footer-column">
          <h3>SUCCESS STORIES</h3>
          <p>Testimonials</p>

        </div>
        <div className="footer-column link-level">
          <a href="https://web.telegram.org/k/#@eb3usa" target="_blank"><img class="link-margin" src="images/telegram.png" alt="telegram" width="38" height="38"/></a>
          <a href="#" target="_blank"><img class="link-margin" src="images/facebook.png" alt="facebook" width="38" height="38"/></a>
          <a href="#" target="_blank"><img class="link-margin" src="images/instagram.png" alt="instagram" width="38" height="38"/></a>
          <a href="https://www.youtube.com/@EB3unskilled" target="_blank"><img class="link-margin" src="images/youtube.png" alt="youtube" width="38" height="38"/></a>
         </div>
      </div>
    </footer>
  );
};

export default Footer;