import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import PaymentSuccess from './PaymentSuccess';
import { IoIosCloseCircle } from "react-icons/io";
import PaymentFailure from './PaymentFailure';
import { baseUrl } from '../../../Configure/urls';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import AuthContext from '../../../context/AuthContext';

const PaymentConfirmationPage = () => {

    const {user} = useContext(AuthContext)
    let [dispalyPage, setDisplayPage] = useState('')

    const updatePremiumStatus = async (totalAmount, planType, duration, user_id)=>{
        let formData = new FormData
        formData.append('totalAmount',totalAmount)
        formData.append('planType',planType)
        formData.append('duration',duration)
        formData.append('user_id',user_id)
        let response = await fetch(`${baseUrl}/create-checkout-session/update-premium-status/`, {
            method: 'POST',
            body: formData
        })
        if (response.status === 200){
            console.log("premium status updated successfully")
        }else{
            console.log(response.status)
            ErrorMessge({message: "data get error while updating permium detials!!!!"})
            
        }
    }

    useEffect(()=>{
        const queryString = window.location.search;
        const query = new URLSearchParams(queryString);


    
        if (query.get("success")) {
            console.log("Order placed! You will receive an email confirmation.");
            setDisplayPage('successPage')
            console.log(query)
            const totalAmount = query.get('amount')
            const planType = query.get('plan_type')
            const duration = query.get('duration')
            const user_id = query.get('user_id')
            updatePremiumStatus(totalAmount, planType, duration, user_id)
        }
    
        if (query.get("canceled")) {
            console.log("Order canceled -- continue to shop around and checkout when you're ready.");
            setDisplayPage('failedPage')
        }
    }, [])

    let pageRendering = () =>{
        if (dispalyPage == 'successPage'){
            return <PaymentSuccess />
        }else if (dispalyPage === 'failedPage'){ 
            return <PaymentFailure />
         }
    }

    useEffect(()=>{
        pageRendering()
        
    }, [])

  return <>{pageRendering()}</>;
}

export default PaymentConfirmationPage