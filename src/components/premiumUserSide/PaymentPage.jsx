import React, {useEffect} from 'react';
import { baseUrl } from '../../Configure/urls';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import axios from 'axios';

const PaymentPage = () => {
    
    const handlePayment = async () =>{
        axios.post(`${baseUrl}/create-checkout-session/strip-checkout/`).then((res)=>{
            window.location.href = res.data
        }).catch((err)=>{
            ErrorMessge({message: "not working"})
        })
        
    }

    useEffect(() => {
        
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          console.log("Order placed! You will receive an email confirmation.");

        }
    
        if (query.get("canceled")) {
          console.log("Order canceled -- continue to shop around and checkout when you're ready.");
        }
      }, []);
  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
        <button onClick={handlePayment} className='bg-dark text-white' type="submit">Checkout</button>
    </section>
  )
}

export default PaymentPage