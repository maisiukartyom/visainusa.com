import "./Anketa.css";
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import PopUpForm from "../../components/PopUpForm";
import SupportEngine from "../../components/SupportEngine";


const Anketa = () => {

    const [answers, setAnswers] = useState(Array(13).fill(''));
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const openPopUp = () => {
      setIsPopUpOpen(true);
    };
  
    const closePopUp = () => {
      setIsPopUpOpen(false);
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        };
    
        const handleSubmit = (event) => {
            event.preventDefault();
            if (answers.every(answer => answer === 'no')) {
                alert('«Congratulations! You have been successfully passed questionnaire and pre-approved for EB3 unskilled program»');
            } else {
                openPopUp();
                // alert () выпадает форма обратной связи, данные которой отправляются на почту Алексею
            }
        };
        const [isChecked, setIsChecked] = useState(false);

        const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        };


    return (
        <div className="body">
            <form className="form-anketa" onSubmit={handleSubmit}>
            <div className="logo-center"><Link to="/"><img src="images/logo.png" alt="logo"  width={70} height={94}/></Link></div>
                    <div className="one" value={answers[0]} onChange={e => handleAnswerChange(0, e.target.value)}>
                        <label className="label" value="" ><b>1.</b> Do you have a communicable disease of public health significance such as tuberculosis (TB)?</label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question1" id="answerOne" value="yes"/>Yes
                            <input className="test"  type="radio" name="question1" value="no"/>No
                        </div>
                        </div>

                        <div className="two" value={answers[1]} onChange={e => handleAnswerChange(1, e.target.value)}>
                        <label className="label" value="" ><b>2.</b> Do you have a mental or physical disorder that poses or is likely to pose a threat to the safety or welfare of yourself or others?</label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question2" id="answerTwo" value="yes"/>Yes
                            <input className="test"  type="radio" name="question2" value="no"/>No
                        </div>
                    </div>

                    <div className="three" value={answers[2]} onChange={e => handleAnswerChange(2, e.target.value)}> 
                        <label className=" label" value="" ><b>3.</b> Have you been unlawfully present in the United States for MORE than 180 days since your last entry into the U.S.? (Unlawful presence starts on the date your I-94 expired, if you did not timely file an extension application) or otherwise violated the terms of a U.S. visa? </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question3" id="answerThree" value="yes"/>Yes
                            <input className="test"  type="radio" name="question3" value="no"/>No
                        </div>
                    </div>

                    <div className="four" value={answers[3]} onChange={e => handleAnswerChange(3, e.target.value)}>
                        <label className=" label" value=""> <b>4.</b> Have you worked in the United States without authorization for MORE than 180 days since your last entry into the U.S.? </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question4" id="answerFour" value="yes"/>Yes
                            <input className="test"  type="radio" name="question4" value="no"/>No
                        </div>
                    </div>

                    <div className="five" value={answers[4]} onChange={e => handleAnswerChange(4, e.target.value)}>
                        <label className="label" value=""><b>5.</b> Have you ever engaged in terrorist activities? </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question5" id="answerFive" value="yes"/>Yes
                            <input className="test"  type="radio" name="question5" value="no"/>No
                        </div>
                    </div>

                    <div className="six" value={answers[5]} onChange={e => handleAnswerChange(5, e.target.value)}>
                        <label className="label" value=""><b>6.</b> Have you ever been convicted of a crime, including both misdemeanor and/or felony in your home country or in the U.S.?  </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question6" id="answerSix" value="yes"/>Yes
                            <input className="test"  type="radio" name="question6" value="no"/>No
                        </div>
                    </div>

                    <div className="seven" value={answers[6]} onChange={e => handleAnswerChange(6, e.target.value)}>
                        <label className="label" value=""><b>7.</b> Have you ever been a J-1 / J-2 visa nonimmigrant exchange visitor?  </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question7" id="answerSeven" value="yes"/>Yes
                            <input className="test"  type="radio" name="question7" value="no"/>No
                        </div>
                    </div>

                    <div className="eight" value={answers[7]} onChange={e => handleAnswerChange(7, e.target.value)}>
                        <label className="label" value=""><b>8.</b> If you previously held J status, were you subject to the 212E two-year foreign residence requirement? Your J visa should say "Bearer is/is not subject to 212E. (Select “no” if you have never held J status)   </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question8" id="answerEight" value="yes"/>Yes
                            <input className="test"  type="radio" name="question8" value="no"/>No
                        </div>
                    </div>

                    <div className="nine" value={answers[8]} onChange={e => handleAnswerChange(8, e.target.value)}>
                        <label className="label"value="" ><b>9.</b>  If you are/were subject to the J 2-year foreign residence requirement, have you satisfied the requirement by either living in your home country for 2 years after your J program was completed or obtaining the waiver to avoid the 212E rule? (Select "no" if you never had J visa status)  </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question9" id="answerNine" value="yes"/>Yes
                            <input className="test"  type="radio" name="question9" value="no"/>No
                        </div>
                    </div>

                    <div className="ten"  value={answers[9]} onChange={e => handleAnswerChange(9, e.target.value)}>
                        <label className="label" value=""><b>10.</b>  Have you ever before applied for permanent resident status in the U.S. (this refers exclusively to the I-485 Adjustment of Status Application within the United States or application for an Immigrant Visa at the U.S. Consulate Abroad)?  </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question10" id="answerTen" value="yes"/>Yes
                            <input className="test"  type="radio" name="question10" value="no"/>No
                        </div>
                    </div>

                    <div className="eleven" value={answers[10]} onChange={e => handleAnswerChange(10, e.target.value)}>
                        <label className="label"value="" ><b>11.</b>  Do you have a pending U.S. asylum application? </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question11" id="answerEleven" value="yes"/>Yes
                            <input className="test"  type="radio" name="question11" value="no"/>No
                        </div>
                    </div>

                    <div className="twelve" value={answers[11]} onChange={e => handleAnswerChange(11, e.target.value)}>
                        <label className="label"value="" ><b>12.</b>  Have you ever crossed the U.S. through the Mexican border without U.S. visa?  </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question12"  value="yes"/>Yes
                            <input className="test"  type="radio" name="question12" id="answerTwelve" value="no"/>No
                        </div>
                    </div>

                    <div className="thirteen" value={answers[12]} onChange={e => handleAnswerChange(12, e.target.value)}>
                        <label className="label"value="" ><b>13.</b>  Have you ever been the subject of removal or deportation from the United States? </label>
                        <div className="mt">
                            <input className="test"  type="radio" name="question13"  value="yes"/>Yes
                            <input className="test"  type="radio" name="question13" id="answerThirteen" value="no"/>No
                        </div>
                    </div>
                    <label className="check">
                            <input className="check-box" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
                            <p className="mini-text">«LLC “Visa in USA” is not an immigration law firm and does not provide legal advices on the selection of immigration programs, filling out immigration petitions and employment in the United States. Consultations are of an informational nature. All information presented on www.visainusa.com are taken from open official sources of USCIS/DOL».</p>
                    </label>
                    <div className="btn-center" >
                    <button className="btn-level-anketa" disabled={!isChecked} >Check your eligibility</button>
                    </div>
            </form>
            {
                isPopUpOpen && <PopUpForm onClose={closePopUp}/>
            }
        </div>
    )
}

export default Anketa