import React, { useState, useEffect, useContext } from 'react';

import { baseUrl } from '../../Configure/urls';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';
import FreeVersion from '../../components/premiumUserSide/FreeVersion';
import MonthlyPackage from '../../components/premiumUserSide/MonthlyPackage';
import YearlyPackage from '../../components/premiumUserSide/YearlyPackage';
import PlanConfirmation from '../../components/premiumUserSide/PlanConfirmation';
import MonthlyPlanConfirmation from '../../components/premiumUserSide/MonthlyPlanConfirmation';
import YearlyPlanConfirmation from '../../components/premiumUserSide/YearlyPlanConfirmation';
import axios from 'axios';
import CurrentPlan from '../../components/premiumUserSide/CurrentPlan';


const PremiumPlans = () => {

  const [premiumPlan, setPremiumPlans] = useState([])
  const {authTokens, logoutUser} = useContext(AuthContext)
  let [yearlyPlanConfirmation, setYearlyPlanConfirmation] = useState(false)
  let [monthlyPlanConfirmation, setMonthlyPlanConfirmation] = useState(false)
  let [userIsPremium, SetUserIsPremium] = useState(false)
  let [premiumUserData, setPremiumUserData] = useState([])

  let YearlyPlanConfirmPopUp = () =>{
    if (yearlyPlanConfirmation === false){
      setYearlyPlanConfirmation(true)
    }else{
      setYearlyPlanConfirmation(false)
    }
  }

  let MonthlyPlanConfirmationPopUp = () =>{
    if (monthlyPlanConfirmation === false){
      setMonthlyPlanConfirmation(true)
    }else{
      setMonthlyPlanConfirmation(false)
    }
  }



  const getPremiumDetails = async () =>{
    try{
      let response = await fetch(`${baseUrl}/adminpanel/get_premium_plan_details/`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access, 
        },
      });
      if (response.status === 200){
        let data = await response.json()
        setPremiumPlans(data)
      }else if (response.status === 400){
        ErrorMessge({message:'professional not addedd'})
      }else if (response.status === 401){
        ErrorMessge({message:'Unauthorized logging out'})
        logoutUser()
      }else{
        alert("An error occurred");
      }
    }catch (error){
      console.error("error ::", error)
    }
  }


  useEffect(() => {
    getPremiumDetails()

  }, []);

  const handlePayment = async (data) =>{
    axios.post(`${baseUrl}/create-checkout-session/strip-checkout/`, data).then((res)=>{
        window.location.href = res.data
    }).catch((err)=>{
      console.log(err)
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


  const chetUserIsPremium = async() =>{
    try{
      let response = await fetch(`${baseUrl}/create-checkout-session/check-user-is-premium/`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access, 
        },
      });
      if (response.status === 200){
        let data = await response.json()
        SetUserIsPremium(true)
        setPremiumUserData(data)


      }else if (response.status === 404){
        console.log("user is not premium user")
      }
    }catch (error){
      console.error("error ::", error)
    }
  }

  useEffect(()=>{
    chetUserIsPremium()
  }, [])

  return (
    <div className="bg-gray-100">
      <div className="container pt-2">
        <div className="h-auto">
        {
          userIsPremium ? (
            <CurrentPlan premiumUserData={premiumUserData} />
          ) : (
            <>
              {monthlyPlanConfirmation && (
                <MonthlyPlanConfirmation
                  MonthlyPlanConfirmationPopUp={MonthlyPlanConfirmationPopUp}
                  premiumPlan={premiumPlan}
                  handlePayment={handlePayment}
                />
              )}

              {yearlyPlanConfirmation && (
                <YearlyPlanConfirmation
                  premiumPlan={premiumPlan}
                  YearlyPlanConfirmPopUp={YearlyPlanConfirmPopUp}
                  handlePayment={handlePayment}
                />
              )}

              <FreeVersion />
              <MonthlyPackage premiumPlan={premiumPlan} MonthlyPlanConfirmationPopUp={MonthlyPlanConfirmationPopUp} />
              <YearlyPackage premiumPlan={premiumPlan} YearlyPlanConfirmPopUp={YearlyPlanConfirmPopUp} />
            </>
          )
        }

          
        </div>
      </div>
    </div>
  )
}

export default PremiumPlans