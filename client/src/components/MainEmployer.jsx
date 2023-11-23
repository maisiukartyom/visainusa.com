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
      {/* <p className="text-employer-benefits">Comprehensive labor solutions in entry-level
positions in your company, which improve retention
rates and bring you a new pool of talent through legal immigration.</p> */}
      {/* <p className="par-employer-ben">Benefits for the U.S. employer:</p> */}
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
      <li className="par-benefits-employer">Cost saving model for 1 year:​</li>
       <li className="par-benefits-employer cost-emp"><img src="images/cost.jpg" alt="table" className="cost-table" />​</li> 
         </ul>
   </div>
   <div className="photo-block-employer">
   <div className="photo-ben" ><img src="images/benefits.jpg" alt="benefits" width={500} height={450}/></div>

   </div>
   </div>
   <div className="hr-emp"></div>

      <div className="documents">
         <div className="doc-table">
      <h2 className="h2-employer-table">PERM LABOR CERTIFICATION PROCESS FOR THE U.S.
EMPLOYERS</h2>
         <div className="table">
            <img src="images/Perm.jpg" alt="photo" className="perm"/>
                  </div>
            </div>
            </div>


            <div className="hr-emp"></div>

      <div className="table-time">
         <div className="doc-table">
      <h2 className="h2-table">TIMELINE AND MILESTONES FOR EB3 UNSKILLED CATEGORY</h2>
      <p className="text-table-time">the chart doesn't reflect any audit, request for evidence and retrogression, the retrogression could impact timing depending on the priority date</p>
         <div className="table-time">
      <img src="images/table.jpg" alt="table" className="time"/>
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