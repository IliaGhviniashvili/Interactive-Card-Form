import React from "react"
import thankYou from "../images/icon-complete.svg";
import  "./ThankYouPage.css";

function ThankYouPage({setConfirmed}){
    return(
      <div class="thankYouPage">
        <div className='thankYou'>
          <img src={thankYou} alt="" />
          <h2 className="thanks">THANK YOU!</h2>
          <p className="pText">We've added your card details</p>
          <button type='button' className='btn2' onClick={()=>setConfirmed(false)}>Continue</button>
        </div>
      </div>
    )
  }
  export default ThankYouPage;