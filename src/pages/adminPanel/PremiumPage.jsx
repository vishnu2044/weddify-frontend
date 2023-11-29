import React, { useContext, useEffect, useState } from 'react'
import PremiumPlans from '../../components/admin/premium/PremiumPlans'
import EditPremiumPlans from '../../components/admin/premium/EditPremiumPlans'
import { baseUrl } from '../../Configure/urls';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';

const PremiumPage = () => {
    let [isPopUpOpen, setIsPopUpOpen] = useState(false);
    let [ premiumPlans, setPremiumPlans ] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    const openEditPopup = () => {
        if (isPopUpOpen === false){
            setIsPopUpOpen(true);
        }
    };
    const closeEditPopUp = () => {
        if (isPopUpOpen === true){
            setIsPopUpOpen(false);
        }
    };
    
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

    useEffect(()=>{
        getPremiumDetails()
    }, [])

    return (
        <div className='mt-28 px-4'>
            <PremiumPlans openEditPopup={openEditPopup} premiumPlans={premiumPlans} />
            {isPopUpOpen && <EditPremiumPlans closeEditPopUp={closeEditPopUp} premiumPlans={premiumPlans} getPremiumDetails={getPremiumDetails}/>}
        </div>
    );
};

export default PremiumPage;