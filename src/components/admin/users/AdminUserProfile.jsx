import React, {useState, useEffect, useContext} from 'react';
import {BiSolidUserCircle} from 'react-icons/bi';
import {ImProfile} from 'react-icons/im';
import {MdLocationPin, MdOutlineCastForEducation} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Configure/urls';
import { Link } from 'react-router-dom';

const AdminUserProfile = () => {
    const location = useLocation()
    const matchId = location.state.userId
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [UserProfile, setUserProfile] = useState(null)
    let [userBasic, setMUserBasic] = useState(null)
    let [userProfession, setuserProfession] = useState(null)
    let [userReligion, setUserReligion] = useState(null)
    let [matchProfile, setMatchProfile] = useState(null)

    let getUserProfile = async () =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/getmatchprofile/${matchId}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                },
            });
            if (response.status === 200){
                let data = await response.json(); 
                setUserProfile(data.user)
                setMUserBasic(data.basic)
                setuserProfession(data.professional)
                setUserReligion(data.religional)
                setMatchProfile(data.profile)

            }else if (response.status === 401){
                ErrorMessge({message: "authentication failed!!"})
                logoutUser()
            }else{
                ErrorMessge({message: "An error comes!!"})
                console.log(response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    let userBlockManagement = async(userId) =>{
        try{
          let response = await fetch(`${baseUrl}/user_block_management/${userId}/`,{
              method: "GET",
              headers :{
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + authTokens.access, 
              }
          });
          if (response.status=== 200){
            getUserProfile(matchId)
              let data = await response.json();
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
                title: data.success
              })
    
          }else if (response.status === 401){
              ErrorMessge({message:"unauthorized : not success"})
              logoutUser()
              console.log(response.status);
          }else if (response.status === 400){
              ErrorMessge({message:"complete your profile"})
    
          }else{
              ErrorMessge({message: "and error comes!!"})
              console.log(response.status)
          }
          
        }catch (error) {
          console.error("An error occurred:", error);
        } 
      }

    useEffect(()=>{
        getUserProfile()
    }, [])

  return (
    <div className='mt-28 px-4'>
        <div class="mx-auto py-8">
            <div class={`grid grid-cols-4 sm:grid-cols-12 gap-6 px-4  shadow rounded-lg mx-5 border border-solid border-gray-700 ` }>
                <div class="col-span-4 sm:col-span-3">
                    <div class="p-6">
                        <div class="flex flex-col items-center">
                            <img src={matchProfile?.profile_img ? `${baseUrl}${matchProfile.profile_img}`:'https://i.pravatar.cc/150?img=32'} class="w-auto h-auto bg-gray-300 rounded-md shrink-0" />
                        </div>
                    </div>
                </div>
                <div class="col-span-4 sm:col-span-9">
                    <div class="p-6">
                        <h1 class="text-xl text-left font-bold">{UserProfile?.first_name} {UserProfile?.last_name}</h1>

                        <div class="grid grid-cols-2 gap-2 text-gray-600">
                            <div class="text-left pr-3">
                                <p class="flex items-center">
                                    <BiSolidUserCircle class="mr-2 text-blue-600" /> <strong>{userBasic?.age} | "{userBasic?.height}"</strong>
                                </p>
                                <p class="flex items-center">
                                    <ImProfile class="mr-2 text-orange-600" /> <strong>{userReligion?.religion} ({userReligion?.caste})</strong>
                                </p>
                                <p class="flex items-center">
                                    <MdLocationPin class="mr-2 text-green-600" /> <strong>{userBasic?.location}</strong>
                                </p>
                                <p class="flex items-center">
                                    <MdOutlineCastForEducation class="mr-2 text-orange-600" /> <strong>{userProfession?.education ? `${userProfession?.education} |`: '' } {userProfession?.occupation? `${userProfession?.occupation}`: ''}</strong>
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 flex flex-wrap gap-4">
                            <Link to={`/home/chatpage/${UserProfile?.id}`} className='no-underline'>
                                <p className="bg-[#64b17f] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8  rounded-lg justify-center"> Chat </p>
                            </Link>
                            <p onClick={()=> userBlockManagement(UserProfile?.id)} className="bg-[#969696] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8  rounded-lg justify-center"> {UserProfile?.is_active ? 'block' : "Unblock"} </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="mb-4    ">
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 px-4 ">
                <div class="col-span-1 sm:col-span-6 gap-6 px-4">

                  <div class= {` shadow-xl rounded-2xl px-3 py-4 border border-solid border-gray-700 `}>
                    <div className="flex justify-between items-center px-3 ">
                        <h3 className="text-xl  font-semibold text-dark">{matchProfile?.gender === 'male' ? 'His' : 'Her'} Basic Details</h3>
                        
                    </div>
                        <div class="mt-4 grid grid-cols-2 gap-2 text-gray-600  ">
                                    <div class="text-right pr-3">
                                        <p><strong>Age :</strong></p>
                                        <p><strong>Mother Tongue :</strong></p>
                                        <p><strong>Eating Habit :</strong></p>
                                        <p><strong>Drinking Habit :</strong></p>
                                        <p><strong>Smoking Habit :</strong></p>
                                        <p><strong>Martial Status :</strong></p>
                                        <p><strong>Physical Type :</strong></p>
                                        <p><strong>Physical Status :</strong></p>
                                        <p><strong>Location :</strong></p>
                                        <p><strong>Citizenship :</strong></p>
                                    </div>
                                    <div class="px-3">
                                        
                                        {userBasic?.age ? <p>{userBasic.age}</p> : <p> Not added yet</p>}
                                        {userBasic?.mother_tongue ? <p>{userBasic.mother_tongue}</p> : <p> Not added yet</p>}
                                        {userBasic?.eating_habit ? <p>{userBasic.eating_habit}</p> : <p> Not added yet</p>}
                                        {userBasic?.drinking_habit ? <p>{userBasic.drinking_habit}</p> : <p> Not added yet</p>}
                                        {userBasic?.smoking_habit ? <p>{userBasic.smoking_habit}</p> : <p> Not added yet</p>}
                                        {userBasic?.martial_status ? <p>{userBasic.martial_status}</p> : <p> Not added yet</p>}
                                        {userBasic?.height||userBasic?.body_type ? <p>{userBasic?.height}  ({userBasic?.body_type})</p> : <p> Not added yet</p> }
                                        {userBasic?.physical_status ? <p>{userBasic.physical_status}</p> : <p> Not added yet</p>}
                                        {userBasic?.location ? <p>{userBasic.location}</p> : <p> Not added yet</p>}
                                        {userBasic?.citizenship ? <p>{userBasic.citizenship}</p> : <p> Not added yet</p>}
 

                                    </div>
                                </div>
                        <hr class="my-6 border-t border-gray-300" />
                  </div>
                </div>

                <div class="col-span-1 sm:col-span-6 gap-6 px-4">
                    <div class={` shadow-xl rounded-2xl p-6 border border-solid border-gray-700 `}>

                      <div className="flex justify-between items-center px-3 mb-3 ">
                          <h3 className="text-xl  font-semibold text-[#a43f75]"> {matchProfile?.gender === 'male' ? 'His' : 'Her'} Professional Details</h3>
                      </div>
                      <div class=" grid grid-cols-2 gap-2 text-gray-600">
                                    <div class="text-right pr-3">
                                        <p><strong>Education :</strong></p>
                                        <p><strong>College :</strong></p>
                                        <p><strong>Working Sector :</strong></p>
                                        <p><strong>Income (LPA) :</strong></p>
                                        <p><strong>Occupation :</strong></p>
                                        <p><strong>Organization :</strong></p>
                                    </div>
                                    <div class="px-3">
                                        {userProfession?.education ? <p>{userProfession.education}</p> : <p> Not added yet</p> }
                                        {userProfession?.college ? <p>{userProfession.college}</p> : <p> Not added yet</p> }
                                        {userProfession?.working_sector ? <p>{userProfession.working_sector}</p> : <p> Not added yet</p> }
                                        {userProfession?.income ? <p>{userProfession.income}</p> : <p> Not added yet</p> }
                                        {userProfession?.occupation ? <p>{userProfession.occupation}</p> : <p> Not added yet</p> }
                                        {userProfession?.organization ? <p>{userProfession.organization}</p> : <p> Not added yet</p> }


   
                                    </div>
                                </div>
                    </div>

                    <div class={` shadow-xl rounded-2xl mt-2 p-6 border border-solid border-gray-700 `}>

                      <div className="flex justify-between items-center px-3 mb-2">
                          <h3 className="text-xl  font-semibold text-[#a43f75]">{matchProfile?.gender === 'male' ? 'His' : 'Her'} Religional Details</h3>
                      </div>
                      <div class=" grid grid-cols-2 gap-2 text-gray-600 ">
                                    <div class="text-right pr-3">
                                        <p><strong>Religion :</strong></p>
                                        <p><strong>Caste :</strong></p>
                                        <p><strong>Star :</strong></p>

                                    </div>
                                    <div class="px-3">

                                    {userReligion?.religion ? <p>{userReligion.religion}</p> : <p> Not added yet</p> }
                                    {userReligion?.caste ? <p>{userReligion.caste}</p> : <p> Not added yet</p> }
                                    {userReligion?.star ? <p>{userReligion.star}</p> : <p> Not added yet</p> }



                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
  )
}

export default AdminUserProfile