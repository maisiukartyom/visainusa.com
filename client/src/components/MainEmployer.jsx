import React from "react";
import FormEmployer from './FormEmployer';
import "../pages/ForEmployer/ForEmployer.css";


export const MainEmployer = () => {
    return(
        <div>
         <div className="employer-first-block">
            <div className="first-block-employer">
               <h2 className="h2-employer">ABOUT US</h2>
               <p className="text-employer">At "Visa in USA" Limited Liability Company, we
specialize in helping businesses reduce unskilled labor
turnover and increase their funds for growth and
expansion. We don't charge you for unskilled workers.</p>
            </div>
         </div>
         <div className="hr"></div>


      <div className="employer-benefits">
      <div className="block-benefits-employer">
      <h2 className="h2-employer">THE U.S. EMPLOYER BENEFITS</h2>
      <p className="text-employer-benefits">Comprehensive labor solutions in entry-level
positions in your company, which improve retention
rates and bring you a new pool of talent through legal immigration.</p>
      <p className="par-employer-ben">Benefits for a U.S. employer:</p>
      <ul type="square">
         <li className="par-benefits-employer">educated and stable labor for unskilled positions
with salaries not lower than the local prevailing
wage, typically, close to the minimum wage​​</li>
      <li className="par-benefits-employer">reduced employee turnover rate employment
contracts would be intended to be made on a
permanent basis and workers would not
have motives to quit until at least 1 year after
starting the job because of the loss of their
immigration status​​​</li>
      <li className="par-benefits-employer">all applicants are bilingual, usually have bachelor's
degrees have increased diversity in the workplace,
have no criminal record, pass a drug test ​​</li>
      <li className="par-benefits-employer">they can and desire to move up in your
organization after working in an entry-level role ​</li>
      <li className="par-benefits-employer">they pay all legal and government fees​​</li>
      <li className="par-benefits-employer">No employment agency recurring fee, unique
      and untapped labor pool, long-lasting solution​</li>
         </ul>
   </div>
   <div className="photo-block-employer">
   <div className="photo-ben" ><img src="images/benefits.jpg" alt="benefits" width={500} height={450}/></div>

   </div>
   </div>
   <div className="hr"></div>

      <div className="documents">
         <div className="doc-table">
      <h2 className="h2-employer-table">PERM LABOR CERTIFICATION PROCESS FOR THE U.S.
EMPLOYERS</h2>
         <div className="table">
      <table>
               <tr >
                  <th className="perm">PERM Labor Certification Process for the U.S. employers</th>
                  <th>Time</th>
                  <th>Cost</th>
               </tr>
               <tr>
                  <td>1. Develop a job description in compliance with DOL requirements</td>
                  <td className="table-color"> 2 week</td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>2. Request a Prevailing Wage Determination (PWD) by completing Form ETA-9141 and submitting it to the National Prevailing Wage
Center. Electronic filing using the FLAG System is strongly recommended</td>
                  <td className="table-color"> 2 week</td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>3. Obtain Prevailing Wage Determination</td>
                  <td className="table-color"> 7 months </td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>4. Create an account and place a job order with State Workforce Agency (SWA) </td>
                  <td className="table-color"> 1 months </td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>5. 1st Sunday advertisement in the newspaper in the greatest area circulation within the same MSA (metropolitan statistical area) of
the worksite location</td>
                  <td className="table-color">1 week</td>
                  <td className="table-color">up to 1000$</td>
               </tr>
               <tr>
                  <td>6. 2nd Sunday advertisement in the newspaper in the greatest area circulation within the same MSA (metropolitan statistical area)
                         of the worksite location</td>
                  <td className="table-color">1 week</td>
                  <td className="table-color">up to 1000$</td>
               </tr>
               <tr>
                  <td>7. A notice of the open position must be posted at the physical worksite in a conspicuous location </td>
                  <td className="table-color">2 weeks</td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>8. 30-day “Colling-off Period” - after the last day any recruitment effort is made, the Sponsor must wait for an additional 30 days
before they are allowed to file an LC. These 30 days are to allow Americans an opportunity to apply for the job</td>
                  <td className="table-color">1 month </td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>9. Draft and file Form ETA 9089 – the application for Permanent Labor Certification </td>
                  <td className="table-color">2 weeks</td>
                  <td className="table-color">no fee</td>
               </tr>
               <tr>
                  <td>10. Wait for the Labor Certification approval </td>
                  <td className="table-color">10 months</td>
                  <td className="table-color">no fee</td>
               </tr>

               
            </table>
            </div>
            </div>
            </div>


            <div className="hr"></div>

      <div className="table-time">
         <div className="doc-table">
      <h2 className="h2-table">TIMELINE AND MILESTONES FOR EB3 UNSKILLED CATEGORY</h2>
      <p className="text-table-time">the chart doesn't reflect any audit, request for evidence and retrogression, the retrogression could impact timing depending on the priority date</p>
         <div className="table-time">
      <img src="images/table.png" alt="table" className="time"/>
            </div>
            </div>
            </div>

            <div className="summary">
            <div className="summary-form">

         <div className="block-summary">
      <h2 className="h2-employer">Summary</h2>
      <p className="text-summary">At Visa in USA limited liability company, we believe in giving 110%.
By closing the labor shortage gap and using the unique knowledge,
we help businesses grow and generate more income. We thrive
because of our market knowledge and a great team behind our
service. As our CEO says, "Efficiencies will come from proactively
transforming how we do business."</p>
      </div>

      <FormEmployer />

</div>
</div>
</div>
        
    )
}