import React, { useContext } from 'react'
import {baseUrl} from '../../../Configure/urls';
import AuthContext from '../../../context/AuthContext';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import Swal from 'sweetalert2';

const EditPremiumPlans = ({
  closeEditPopUp,
  premiumPlans,
  getPremiumDetails
}) => {
  const {authTokens, logoutUser} = useContext(AuthContext)

  const updatePremiumPlans = async (e) =>{
    e.preventDefault()
    let formData = new FormData()
    formData.append('monthly_price', e.target.monthly_price.value)
    formData.append('yearly_price', e.target.yearly_price.value)

    console.log("monthly ::::::::", e.target.monthly_price.value)
    console.log("yearly_price ::::::::", e.target.yearly_price.value)
    try{
      const response = await fetch(`${baseUrl}/adminpanel/edit-premium-plans/`, {
        method: 'PATCH',
        headers :{
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body : formData
      })
      if (response.ok){
        closeEditPopUp()
        getPremiumDetails()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Plans updated successfully'
        })
      }else if (response.status === 400){
        response.json()
        .then(data => {
            if (data.error) {
                ErrorMessge({message: data.error })
            } else {
                alert('An error occurred');
            }
        })
        .catch(error => {
            console.error('Error parsing response:', error);
            alert('An error occurred while processing the response');
        });
    }else if(response.status === 401){
        alert("authenticaton failed")
        return logoutUser
    }else{
        ErrorMessge({message: "basic details updation failed"})
        console.log(response.error);
    }
}catch (error){
    console.error("an error comes !!!!!!!!!!", error);
    alert("catched an error look console")
}
}


  return (
<div class="h-screen w-screen bg-gray-400">
  <div class="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
    <div class="relative container m-auto px-6">
      <div class="m-auto">
        <div class="rounded-xl bg-white w-auto shadow-xl">
          <div class="p-8 w-auto">
            <div class="space-y-4">
              <h2 class="mb-8 text-2xl font-bold">Edit your premium plan</h2>
            </div>
            <form onSubmit={updatePremiumPlans} >
              <span>monthly plan</span>
              <div class="mt-3 grid space-y-4">
                <input 
                  class='w-full h-10 shadow-md rounded-lg px-2 border border-gray-600 appearance-none hover:appearance-none' 
                  type="text" 
                  defaultValue={premiumPlans.monthly_price}
                  name = 'monthly_price'
                />
                <span>yearly plan</span>
                <input 
                  class='w-full h-10 shadow-md rounded-lg px-2 border border-gray-600 appearance-none hover:appearance-none' 
                  type="text" 
                  defaultValue={premiumPlans.yearly_price}
                  name = 'yearly_price'
                />
                <button type='submit' class="group h-12 px-6 border-2 bg-[#3679b4] mx-5 border-gray-300 shadow-md rounded-2xl">
                  <div class="relative flex items-center space-x-4 justify-center">
                    <span  class="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300  sm:text-base">
                      Update
                    </span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default EditPremiumPlans