import React, { useContext, useEffect, useState } from 'react'
import PremiumPlans from '../../components/admin/premium/PremiumPlans'
import EditPremiumPlans from '../../components/admin/premium/EditPremiumPlans'
import { baseUrl } from '../../Configure/urls';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import PrimeUsersList from './PrimeUsersList';

const PremiumPage = () => {
    let [isPopUpOpen, setIsPopUpOpen] = useState(false);
    let [currentComponent, setCurrentComponent]  = useState('planComponent')
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

    const renderPremiumComponents = () =>{
        if (currentComponent === 'planComponent'){
            return <PremiumPlans openEditPopup={openEditPopup} premiumPlans={premiumPlans} />
        }
        if (currentComponent === 'premiumlist'){
            return <PrimeUsersList />
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

    useEffect(()=>{
        getPremiumDetails()
        renderPremiumComponents()
    }, [])

    return (
        <div className='mt-28 px-4'>
            <div class="m-6">
                <div class="flex flex-wrap -mx-6">
                    <div class="w-full ">
                        <div class="flex items-center px-3 py-2 shadow-md rounded-md bg-[#C5E0F7]">
                            <h1 class="max-w-xl mx-auto leading-tight text-3xl font-bold text-gray-700 sm:text-center">
                                Premium Plans
                            </h1>
                            {
                                currentComponent === 'premiumlist' ?

                                    (<p onClick={()=> setCurrentComponent("planComponent")} className='block cursor-pointer py-2 px-3 mt-2 mx-2 shadow-md rounded-md text-white w-max font-semibold tracking-wide bg-dark  text-sm '>Premium Plans</p>)
                                    :
                                    (<>
                                        <p onClick={openEditPopup} className='block cursor-pointer py-2 px-3 mt-2 mx-2 shadow-md rounded-md text-white w-max font-semibold tracking-wide bg-dark  text-sm '>Edit plans</p>
                                        <p onClick={()=> setCurrentComponent("premiumlist")} className='block cursor-pointer py-2 px-3 mt-2 mx-2 shadow-md rounded-md text-white w-max font-semibold tracking-wide bg-dark  text-sm '>Premium users</p>
                                    </>)
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
            {renderPremiumComponents()}
            {isPopUpOpen && <EditPremiumPlans closeEditPopUp={closeEditPopUp} premiumPlans={premiumPlans} getPremiumDetails={getPremiumDetails}/>}
        </div>
    );
};

export default PremiumPage;