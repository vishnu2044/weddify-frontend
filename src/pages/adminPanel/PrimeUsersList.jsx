import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { baseUrl } from '../../Configure/urls';
import { useNavigate } from 'react-router-dom';

const PrimeUsersList = () => {
    const [primeUsersList, setPrimeUsersList] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()

    const getPremiumUsers = async() =>{
        try{
          let response = await fetch(`${baseUrl}/adminpanel/get_premium_user_details/`,{
              method: "GET",
              headers :{
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + authTokens.access, 
              }
          });
          if (response.status=== 200){
              let data = await response.json();
              setPrimeUsersList(data)
          }else if (response.status === 401){
              ErrorMessge({message:"unauthorized : not success"})
              logoutUser()
              console.log(response.status);
          }else if (response.status === 400){
              ErrorMessge({message:"No user have premium accounts"})
    
          }else{
              ErrorMessge({message: "and error comes!!"})
              console.log(response.status)
          }
          
        }catch (error) {
          console.error("An error occurred:", error);
        } 
      }
    useEffect(()=>{
        getPremiumUsers()
    }, [])
  return (
    <div>
        <div class="mx-6  rounded-md shadow-md border border-solid border-gray-200 mb-3">
            <div class="flex flex-wrap">
                <div class="w-full px-6">
                    <div class="flex items-center px-3 py-3 ">
                        <table class="min-w-full divide-y  divide-gray-200 rounded-md">
                            <thead>
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Id</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Type</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expairy date</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                {
                                    primeUsersList ?
                                    (

                                        primeUsersList.map((user)=>(
        
                                            <tr>
                                                <td class="px-2 py-4 whitespace-nowrap">
                                                    <div class="relative">
                                                        <img class="h-12 w-12 rounded-full object-cover" src={user?.profile_img ? `${baseUrl}${user.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="Avatar" />
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">{user?.username}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">{user?.first_name} {user?.last_name}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">{user?.unique_user_id}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">{user?.plan_name}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">{user?.amount_paid}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">{user?.expiry_date}</td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={()=>navigate('/adminpanel/adminuserprofile', {state : {userId : user?.id }})}
                                                        className="py-1.5 px-3 text-center bg-[#6471b1] rounded-lg text-white dark:bg-[#6471b1]"
                                                        type="submit"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) :
                                    <p>no users are take prime membership</p>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PrimeUsersList