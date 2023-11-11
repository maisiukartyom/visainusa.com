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
                    <Link to="/newdesign"><li className="header-nav-item">Pricing</li></Link>
                    <Link to="/foremployer"><li className="header-nav-item employer">For the U.S. employer</li></Link>
<li className="header-nav-item item-button-l welcome">Welcome Alexsey</li>

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
          <div className="level ">
            <h2 className="appliName">Level 1</h2>
            <p className=" appliName-levelOne">FREE</p>
            <div className="text-discription">

              <p className="description">
 What is EB3 unskilled visa category?
              </p>
              <p className="description">
 How does EB3 unskilled visa work?
              </p>
              <p className="description ">
How long does it take to get the U.S.  permanent resident card?
              </p>
              <p className="description">

Am I eligible for EB3 unskilled visa?
              </p>
              <p className="description">
How much does EB3 unskilled cost?
              </p>
              <p className="description">
 What should I do in case of refusal?
              </p>
              <p className="description">
How do I start my EB3 journey?
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
            <h2 className="appliName">Level 2</h2>
            <h3 className="appliName-names">"Immigration with no mistake"</h3>
            <div className="text-discription">

              <p className="description top-level">
 Personal consultation (60 mins) on English, Spain or Russian languages 
              </p>

              <p className="description">
 Deep analysis of your particular situation 
              </p>
              <p className="description">
 Step-by-step description to obtain green card 
              </p>
              <p className="description">
 General information about other immigration programs in the U.S. 
              </p>
              <p className="description">
24 hours online chat after the consultation 
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
            <h2 className="appliName">Level 3</h2>
            <h3 className="appliName-names">"Self immigration with no overpriced assistance"</h3>
            <div className="text-discription">
              <p className="description ">
 Access to more than 1000 U.S. employers’ database (script of
                pitch included)
              </p>
              <p className="description">
 Access to more than 25 U.S. immigration attorneys’ database
              </p>
              <p className="description ">
Access to files templates of immigration forms as I-485, I-765,
                I-131 and DS-260
              </p>
              <p className="description">
 List of EB3 unskilled agencies
              </p>
              <p className="description">
List of risks for all parties
              </p>
              <p className="description">

Personal immigration specialist for 7 days
              </p>
                          </div>
            <div className="center-level">
              <Link to='/levelthree'>
              <button className="btn-levels-paid ">look</button>
              </Link>
              </div>
          </div>

        </div>
</div>
    );
  };
  

export default NewDesign
