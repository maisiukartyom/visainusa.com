import "./Anketa.css";
import {Link} from 'react-router-dom';


const Anketa = () => {
    return (
        <div>
        <div className="container-center">
<Link><img src="images/logo.png" alt="logo" width={70} height={94}/></Link>
<form>
    <div className="one">
        <label className="q-one">1. Do you have a communicable disease of public health significance such as tuberculosis (TB)?</label>
<div className="mt">
    <input className="test"  type="radio" name="question1" id="answerOne">Yes</input>
    <input className="test"  type="radio" name="question1" >No</input>
</div>
    </div>

    <div className="two">
        <label className="q-one">2. Do you have a mental or physical disorder that poses or is likely to pose a threat to the safety or welfare of yourself or others?</label>
<div className="mt">
    <input className="test"  type="radio" name="question2" id="answerTwo">Yes</input>
    <input className="test"  type="radio" name="question2" >No</input>
</div>
    </div>

    <div className="three">
        <label className="q-one">3. Have you been unlawfully present in the United States for MORE than 180 days since your last entry into the U.S.? (Unlawful presence starts on the date your I-94 expired, if you did not timely file an extension application) or otherwise violated the terms of a U.S. visa? </label>
<div className="mt">
    <input className="test"  type="radio" name="question3" id="answerThree">Yes</input>
    <input className="test"  type="radio" name="question3" >No</input>
</div>
    </div>

    <div className="four">
        <label className="q-one">4. Have you worked in the United States without authorization for MORE than 180 days since your last entry into the U.S.? </label>
<div className="mt">
    <input className="test"  type="radio" name="question4" id="answerFour">Yes</input>
    <input className="test"  type="radio" name="question4" >No</input>
</div>
    </div>
    <div className="five">
        <label className="q-one">5. Have you ever engaged in terrorist activities? </label>
<div className="mt">
    <input className="test"  type="radio" name="question5" id="answerFive">Yes</input>
    <input className="test"  type="radio" name="question5" >No</input>
</div>
    </div>

    <div className="six">
        <label className="q-one">6. Have you ever been convicted of a crime, including both misdemeanor and/or felony in your home country or in the U.S.?  </label>
<div className="mt">
    <input className="test"  type="radio" name="question6" id="answerSix">Yes</input>
    <input className="test"  type="radio" name="question6" >No</input>
</div>
    </div>

    <div className="seven">
        <label className="q-one">7. Have you ever been a J-1 / J-2 visa nonimmigrant exchange visitor?  </label>
<div className="mt">
    <input className="test"  type="radio" name="question7" id="answerSeven">Yes</input>
    <input className="test"  type="radio" name="question7" >No</input>
</div>
    </div>

    <div className="eight">
        <label className="q-one">8. If you previously held J status, were you subject to the 212E two-year foreign residence requirement? Your J visa should say "Bearer is/is not subject to 212E. (Select “no” if you have never held J status)   </label>
<div className="mt">
    <input className="test"  type="radio" name="question8" id="answerEight">Yes</input>
    <input className="test"  type="radio" name="question8" >No</input>
</div>
    </div>

    <div className="nine">
        <label className="q-one">9.  If you are/were subject to the J 2-year foreign residence requirement, have you satisfied the requirement by either living in your home country for 2 years after your J program was completed or obtaining the waiver to avoid the 212E rule? (Select "no" if you never had J visa status)  </label>
<div className="mt">
    <input className="test"  type="radio" name="question9" id="answerNine">Yes</input>
    <input className="test"  type="radio" name="question9" >No</input>
</div>
    </div>

    <div className="ten">
        <label className="q-one">10.  Have you ever before applied for permanent resident status in the U.S. (this refers exclusively to the I-485 Adjustment of Status Application within the United States or application for an Immigrant Visa at the U.S. Consulate Abroad)?  </label>
<div className="mt">
    <input className="test"  type="radio" name="question10" id="answerTen">Yes</input>
    <input className="test"  type="radio" name="question10" >No</input>
</div>
    </div>

    <div className="eleven">
        <label className="q-one">11.  Do you have a pending U.S. asylum application? </label>
<div className="mt">
    <input className="test"  type="radio" name="question11" id="answerEleven">Yes</input>
    <input className="test"  type="radio" name="question11" >No</input>
</div>
    </div>

    <div className="twelve">
        <label className="q-one">12.  Have you ever crossed the U.S. through the Mexican border without U.S. visa?  </label>
<div className="mt">
    <input className="test"  type="radio" name="question12" id="answerTwelve">Yes</input>
    <input className="test"  type="radio" name="question12" >No</input>
</div>
    </div>

    <div className="thirteen">
        <label className="q-one">13.  Have you ever been the subject of removal or deportation from the United States? </label>
<div className="mt">
    <input className="test"  type="radio" name="question13" id="answerThirteen">Yes</input>
    <input className="test"  type="radio" name="question13 " >No</input>
</div>
    </div>
</form>
        </div>
        </div>
    )
}

export default Anketa