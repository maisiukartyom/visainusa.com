import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '..//pages//NewDesign.css'
import { HeaderForMain } from './HeaderForMain';


const NewDesign = () => {
  const [isOpen, setOpen] = useState();
  return(
<div>
  {/* header */}

  <header className="header-level">
            <Link to="/"><span className="header-logo"><img src="images/logo.png" alt="logo" width={70} height={94}/></span></Link>
            <nav className={`header-nav ${isOpen? "active" : ""}`}>
                <ul className="header-nav-list">
                <Link to="/aboutus"><a href="/#aboutus"><li className="header-nav-item">About Us</li></a></Link>
                    <a href="/#testimonials"><li className="header-nav-item">Testimonials</li></a>
                    <a href="/#contacts"><li className="header-nav-item">Contacts</li></a>
                    <Link to="/"><li className="header-nav-item">Pricing</li></Link>
                    <Link to="/foremployer"><li className="header-nav-item employer">For the U.S. employer</li></Link>
                    <a href="/#contacts"><li className="header-nav-item welcome">Welcome Alexsey</li></a> 

                </ul>
            </nav>
            <button className="header-menu-button"
            onClick={() => setOpen(!isOpen)}
            >< img src="images/menu.png" alt="menu"  width={24} height={24} /></button>
        </header>


        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

{/* levels */}
        <div className="grid">
        <div className="level-paid ">
            <h2 className="appliName-future">Level 1</h2>
            
            <>
                <p className="appliName-levelOne price">FREE</p>
              </>
            <div className="text-discription-future">
              <p className="description-future ">
              What is EB3 unskilled visa category?
              </p>
              <p className="description-future">
              How does EB3 unskilled visa work?
              </p>
              <p className="description-future ">
              How long does it take to get the U.S. permanent resident card?
              </p>
              <p className="description-future ">
              Am I eligible for EB3 unskilled visa?
              </p>
              <p className="description-future">
              How much does EB3 unskilled cost? 
              </p>
              <p className="description-future ">
              What should I do in case of refusal?
              </p>
              <p className="description-future ">
              How do I start my EB3 journey?
              </p>
              <p className="description-future ">
              I worked unauthorized, can I apply for the EB3 unskilled?
              </p>
              <p className="description-future ">
              What is Retrogression and Visa Bulletin? 
              </p>
              <p className="description-future ">
              When can I drop my F status?
              </p>
              <p className="description-future ">
              Can I adjust my status to EB3 unskilled?
              </p>
                          </div>
                          <div className="center-level">
              <Link to='/levelone'>
                <button className="btn-levels">CHOOSE</button>
              </Link>
              </div>
          </div>
          
          <div className="level-paid ">
          <p className="coming-newDesign">Paid</p>
            <h2 className="appliName-future">Level 2</h2>
            <h3 className="appliName-names">"Immigration with no mistake"</h3>
            <>
            <div className="price-all">
            <p className="appliName-levelOne-del price-all">500$</p>
                <p className="appliName-level-two price-all">199$</p>
                </div>
              </>
            <div className="text-discription-future">
              <p className="description-future ">
              Personal consultation (60 mins) on English, Spanish or Russian languages
              </p>
              <p className="coming-bonus">
              Our services include:
              </p>
              <p className="description-future">
              In-depth insights into the EB3 unskilled program
              </p>
              <p className="description-future ">
              Deep analysis of your specific situation
              </p>
              <p className="description-future ">
              Step-by-step guidance on obtaining a green card
              </p>
              <p className="description-future ">
              General information about other immigration programs in the U.S.
              </p>
              <p className="description-future ">
              Enjoy 24/7 online chat support for any additional questions or clarifications after your consultation
              </p>
              <p className="coming-bonus-two description-future-finaly">
              As an extra bonus, you'll enjoy exclusive access to a specially tailored job offering pool for EB3 unskilled applicants. Get a head start on your application journey – start applying today!  
              </p>

                          </div>
                          <div className="center-level">
              <Link to='/leveltwo'>
              <button className="btn-levels-paid  ">look</button>
              </Link>
              </div>
          </div>





          <div className="level-paid ">
          <p className="coming-newDesign">Paid</p>
            <h2 className="appliName-future">Level 3</h2>
            <h3 className="appliName-names">"Smart immigration with no overpriced assistance"</h3>
            <>
            <div className="price-all">
            <p className="appliName-levelOne-del price-all">1500$</p>
                <p className="appliName-level-two price-all">599$</p>
                </div>
              </>
            <div className="text-discription-future">
              <p className="description-future ">
              Access to more than 1000 U.S. employers’ database (script of pitch included)
              </p>
              <p className="description-future">
              Access to more than 25 U.S. immigration attorneys’ database 
              </p>
              <p className="description-future ">
              Access to instruction of immigration forms as I-140, I-485, I-765, I-131 and DS-260
              </p>
              <p className="description-future ">
              List of EB3 unskilled agencies
              </p>
              <p className="description-future ">
              48 hours online chat after the consultation
              </p>
              <p className="description-future ">
              Opportunity to complete entire EB3 program from 9999$
              </p>
              <p className="coming-bonus">Extra bonus!</p>
              <p className="description-future description-future-finaly "> Be prepared to immerse in English language environment 
              (3 x 30 mins speaking club for you and your kids)
</p>
<div className="center-level">
              <Link to='/levelthree'>
              <button className="btn-levels-paid ">look</button>
              </Link>
              </div>
                          </div>

          </div>




        </div>
</div>
    );
  };
  

export default NewDesign
