import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import Swal from 'sweetalert2';
import { baseUrl } from '../../Configure/urls';
import { ErrorAlert } from '../../alerts/ErrorAlert';



const EditProfile = ({ userProfile, user, setCurrentComponent }) => {

    let {authTokens, logoutUser} = useContext(AuthContext)

    const [profile_img, setProfileImage] = useState()

    function containsOnlyAlphabets(value) {
        const regex = /^[A-Za-z]+$/;
        return regex.test(value);
    }

    function containsOnlyNumbers(value) {
        // Use a regular expression to check if the value contains only numbers
        const regex = /^[0-9]+$/;
        return regex.test(value);
      }

    let updateProfile = async (e) =>{
        e.preventDefault();
        if   (e.target.phone_number.value  === ''){
            ErrorMessge({message:'enter your phone number'})
            return ;
        }else if (!containsOnlyAlphabets(e.target.first_name.value)){
            ErrorMessge({message:'First name can only contain alphabets!'})
            return ;
        }else if (!containsOnlyAlphabets(e.target.last_name.value)){
            ErrorMessge({message:'Last name can only contain alphabets!'})
            return ;
        }else if (e.target.gender.value === '' || e.target.gender.value.trim() === ''){
            ErrorMessge({message:'please select your gender!'})
            return ;
        }else if (e.target.phone_number.value.length > 12 ){
            ErrorMessge({message:'phone number must be less than 12 numbers'})
            return ;
        }else if (e.target.username.value.length > 10 ){
            ErrorMessge({message:'Username must be less than 10 characters'})
            return ;
        }else if (!containsOnlyNumbers(e.target.phone_number.value)){
            ErrorMessge({message:'phone number only can contain numbers'})
            return ;
        }else{
            
            let formData = new FormData()
            formData.append('username', e.target.username.value);
            formData.append('first_name', e.target.first_name.value);
            formData.append('last_name', e.target.last_name.value);
            formData.append('email', e.target.email.value);
            formData.append('date_of_birth', e.target.date_of_birth.value);
            formData.append('phone_number', e.target.phone_number.value);
            formData.append('gender', e.target.gender.value);
            
            if (profile_img) {
                formData.append('profile_img', profile_img);
                
            }
            try{
                const response = await fetch(`${baseUrl}/userprofile/updateprofile/`, {
                    method: "PATCH",
                    headers: {
                        
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: formData,
                })
                if (response.ok){
                    setCurrentComponent('UserProfileDetails')
                    
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
                        title: 'Profile updated successfully'
                      })
                      
                } else if (response.status === 400) {
                    response.json()
                        .then(data => {
                            if (data.error) {
                                ErrorAlert({message: data.error })
                            } else {
                                alert('An error occurred');
                            }
                        })
                        .catch(error => {
                            console.error('Error parsing response:', error);
                            alert('An error occurred while processing the response');
                        });

                }else if (response.status === 401){
                    return logoutUser
                }else{
                    alert("Profile update failed");
                    console.log(response.error);
                }
            }catch (error){
                console.error('An Error occurred !!', error);
                alert("An error occurrec while updating profile")
            }

        }
   
    }

    useEffect(() =>{
        console.log(userProfile?.gender)
    }, [])
  return (
    <div className=" rounded-lg border m-3 shadow-sm border-y-zinc-950 p-4 md:p-8 flex items-center justify-center ">
        

        <form class="w-full max-w-lg" onSubmit={updateProfile}>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Username
                </label>
                <input placeholder={user ? user.username : "enter your username"} name='username' defaultValue={user?.username} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"  type="text" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <input placeholder={user ? user.first_name : 'enter your first name'} name='first_name' defaultValue={user?.first_name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text"  />
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                </label>
                <input placeholder={user ? user.last_name : 'enter your first name'} name='last_name' defaultValue={user?.last_name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" type="text"/>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Email
                </label>
                <input placeholder={user ? user.email : "enter your email"} name='email' defaultValue={user?.email} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"  type="text" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    phone number
                </label>
                <input placeholder={userProfile ? userProfile.phone_number : "enter your phone number"} name='phone_number' defaultValue={userProfile?.phone_number} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"  type="text" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-image">
                        profile image
                    </label>
                    <input onChange={(e)=>{
                            if(e.target.value[0] != null)
                            setProfileImage(e.target.files[0])
                        }}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='profile_img' type="file" accept="file" 
                     />
                </div>
            </div>


            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Gender
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value={userProfile? userProfile?.gender: ''} >{userProfile? userProfile.gender: 'select your gender'}</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Date of Birth
                    </label>
                    <input placeholder={userProfile? userProfile.date_of_birth : "enter your date of birth"}  name='date_of_birth' defaultValue={userProfile?.date_of_birth} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" id="grid-last-name" type="date"/>
                </div>
            </div>

            <div className='flex justify-between'>
                <button className='bg-[#6471B1] hover:bg-[#6471B1] cursor-pointer text-white font-bold py-1 px-4 rounded' type='submit'>Update</button>
                <p className='bg-[#6471B1] hover:bg-[#2f3762] cursor-pointer text-white font-bold py-2 px-4 rounded' onClick={() => setCurrentComponent('UserProfileDetails')}>Back to user profile</p>
            </div>
        </form>


    </div>



  )
}

export default EditProfile





