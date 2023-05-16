import './App.css';
import frontSideCard from "./images/bg-card-front.png";
import backSideCard from "./images/bg-card-back.png";
import logo from "./images/card-logo.svg";
import { useState, React} from 'react';
import ThankYouPage from './components/ThankYouPage';


function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [cardDigits, setCardDigits] = useState("");
  const [name, setName] = useState("");
  const [dateMm, setDateMm] = useState("");
  const [dateYy, setDateYy] = useState("");
  const [cvc, setCvc] = useState("");
  const [isInvalidCardNum, setIsInvalidCardNum] = useState(false);
  const [isInvalidExpDate, setIsInvalidExpDate] = useState(false);
  const [isInvalidExpDateYy, setIsInvalidExpDateYy] = useState(false);
  const [isInvalidCvc, setIsInvalidCvc] = useState(false);

  const handleExpDateChange = (e) => {
    const inputVal = e.target.value;
    const hasLetter = /[a-zA-Z]/.test(inputVal);
    setIsInvalidExpDate(hasLetter);
    setDateMm(inputVal.replace(/\D/, '').substring(0, 2));
  };
  const handleExpDateChangeYy = (e) => {
    const inputVal2 = e.target.value;
    const hasLetter = /[a-zA-Z]/.test(inputVal2);
    setIsInvalidExpDateYy(hasLetter);
    setDateYy(inputVal2.replace(/\D/, '').substring(0, 2));
  };
  
  const handleCvcChange = (e) => {
    const inputVal = e.target.value;
    const hasLetter = /[a-zA-Z]/.test(inputVal);
    setIsInvalidCvc(hasLetter);
    setCvc(inputVal.replace(/\D/, '').substring(0, 3));
  };
  
  const handleCardNumberChange = (e) =>{
    const inputVal = e.target.value;
    setCardDigits(inputVal);
    const hasLetter = /[a-zA-Z]/.test(inputVal);
    setIsInvalidCardNum(hasLetter);
  }
  const handleFormSubmit = (e) => {
    // e.preventDefault(); // Prevents the default form submission behavior
    
    // Perform custom validation
    if (name === "" || cardDigits === "" || dateMm === "" || dateYy === "" || cvc === "") {
      
      console.log("Please fill in all required fields.");
      return;
    }
  
    // Proceed with form submission
    setConfirmed(true);
  };
  

  return (
    <div className="App">
      <div className='container'>

        <div className='cards'>
          <div className='fr-side'></div>
          <div className='front-side'>
            <img src={frontSideCard} alt="front-side" />
          </div>
          <div className="card-details">
            <img src={logo} alt="" className='logo'/>
            {cardDigits ? <h2 className='digits'>{cardDigits}</h2>: <h2 className='digits'>1234 5678 9123 0000</h2>}
            <ul className='name-date'>
              {name ?  <li>{name}</li>: <li>Jane Appleseed</li>}
              <div className='MmYy'>
                {dateMm ? <li>{dateMm}</li> : <li><p>01</p></li>}
                {dateMm ? <li>/</li> : <li><p>/</p></li>}
                {dateYy ? <li>{dateYy}</li> : <li><p>27</p></li>}
              </div>
            </ul>
          </div>
          <div className='bc-side'></div>
          <div className='bc-side-line'></div>
          <div className='bc-side-line-light'></div>
          <div className='back-side'>
            <img src={backSideCard} alt="back-side" />
          </div>
          <div className='cvc'>
            {cvc ? <h3>{cvc}</h3> : <h3>123</h3>}
          </div>
        </div>
        <div className='form'>
          {!confirmed &&<form>
            <div className='name'>
              <label htmlFor='name' className='label'>CARDHOLDER NAME</label>
              <input type="text" id='name' placeholder="e.g. Jane Appleseed" className='input'
                     value={name} onChange={(e)=>setName(e.target.value)} required></input>
            </div>
            <div className='cardNumber'>
              <label htmlFor='cardNumber' className='label'>CARD NUMBER</label>
              <input type="text" name='cardNumber' id='cardNumber' placeholder="e.g. 1234 5678 9123 0000"
                     className={isInvalidCardNum?'invalid': "input"} maxLength={"19"}
                     value={cardDigits.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
                     onChange={handleCardNumberChange} required
                     />
                     {isInvalidCardNum?<p className='error'>Wrong format, numbers only</p>: ""}
            </div>
            <div className="expdateAndCvc">
              <div className='expDate'>
                <label htmlFor='expDate' className='label'>Exp. Date (MM/YY)</label>
                <div className='mmyy'>
                  {/* <input type="text" id="expDate" placeholder='MM' className='mm input' 
                          value={dateMm} onChange={(e)=>setDateMm(e.target.value)} maxLength={"2"}/>
                          {dateMm == "" || dateYy == "" ? <p className='error'>Can't be blank</p>: ""}

                  <input type="text" id="expDate" placeholder='YY' className='yy input' maxLength={"2"}
                          value={dateYy} onChange={(e)=>setDateYy(e.target.value)}/> */}
                      <input type="text" id="expDate" placeholder="MM" className={`input mm ${isInvalidExpDate ? "invalid" : ""}`}
                          value={dateMm} onChange={handleExpDateChange} maxLength="2" required
                            />
                            {isInvalidExpDate ? (<p className="error">Wrong format, numbers only</p>) : ("")}
                            {/* {dateMm == "" || dateYy == "" ? <p className='errorBlank'>Can't be blank</p>: ""} */}

                      <input type="text" id="expDate" placeholder="YY" className={`input yy ${isInvalidExpDate ? "invalid" : ""}`}
                              value={dateYy} onChange={handleExpDateChangeYy} maxLength="2" required
                            />
                            {isInvalidExpDateYy ? (<p className="error">Wrong format, numbers only</p>) : ("")}
                            
                </div>
              </div>
                <div className="cvcInput">
                  <label htmlFor='cvc' className='label' >CVC</label>
                  {/* <input type="text" id='cvc' placeholder='CVC' className='input'
                          value={cvc} onChange={(e)=>setCvc(e.target.value)} maxLength={"3"}></input> */}
                      <input type="text" id="cvc" placeholder="e.g. CVC" className={`input cvv ${isInvalidCvc ? "invalid" : ""}`}
                                 value={cvc} onChange={handleCvcChange} maxLength="3" required/>
                            {isInvalidCvc ? <p className="error">Wrong format, numbers only</p> : ""}
                            {/* {cvc == "" ? <p className='errorBlank'>Can't be blank</p>: ""} */}
                </div>
            </div>
            <button  className={`btn ${isInvalidCardNum ? 'btnDisable' : ""}`}  onClick={()=>handleFormSubmit()} >Confirm</button>
          </form>
          }
        </div>
        {confirmed && <ThankYouPage setConfirmed={setConfirmed}/>}
      </div>
    </div>
  );
}



export default App;
