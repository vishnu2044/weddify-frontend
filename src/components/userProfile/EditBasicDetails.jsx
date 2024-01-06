import React, { useContext, useEffect, useState } from 'react'
import { ErrorMessge } from '../../alerts/UserAuthentication'
import AuthContext from '../../context/AuthContext'
import Swal from 'sweetalert2';
import objects from '../../jsonData/cities.json';
import { baseUrl } from '../../Configure/urls';
import { ErrorAlert } from '../../alerts/ErrorAlert';

const EditBasicDetails = ({setDisplayComponent, basicDetails}) => {

    let {authTokens, logoutUser} = useContext(AuthContext)
    let [citiesList, setCitiesList] = useState([])

    let updateBasicDetails = async (e) =>{
        e.preventDefault()
        if (e.target.mother_tongue.value === ''){
            ErrorMessge({message:'please enter your mother tongue'})
        }else{
            let formData = new FormData
            formData.append('mother_tongue', e.target.mother_tongue.value);
            formData.append('eating_habit', e.target.eating_habit.value);
            formData.append('drinking_habit', e.target.drinking_habit.value);
            formData.append('smoking_habit', e.target.smoking_habit.value);
            formData.append('martial_status', e.target.martial_status.value);
            formData.append('height', e.target.height.value);
            formData.append('body_type', e.target.body_type.value);
            formData.append('physical_status', e.target.physical_status.value);
            formData.append('location', e.target.location.value);
            formData.append('citizenship', e.target.citizenship.value);

            try{
                const response = await fetch(`${baseUrl}/userprofile/updatebasicdetails/`, {
                    method: "PATCH",
                    headers: {
                        
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: formData,
                })
                if (response.ok){
                    setDisplayComponent("userDetails")
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
                        title: 'Basic details updated successfully'
                      })
                }else if (response.status === 400){
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
    }
    useEffect(()=>{
        setCitiesList(objects.mandals)
    })
  return (
    <div className=" rounded-lg border m-3 shadow-sm border-y-zinc-950 p-4 md:p-8 flex items-center justify-center ">
        

        <form class="w-full max-w-lg" onSubmit={updateBasicDetails}>
        <h3 className="text-lg font-semibold text-[#a43f75] text-center">Basic Details</h3>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Mother tongue
                    </label>
                    <input  
                        type="text"
                        name='mother_tongue'
                        defaultValue={basicDetails?.mother_tongue}
                        placeholder={basicDetails?.mother_tongue ?basicDetails?.mother_tongue : "enter your mother tongue"}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   
                    />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        eatiing habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='eating_habit' >
                        <option value={basicDetails? basicDetails?.eating_habit: ""} >{basicDetails? basicDetails?.eating_habit: "Select your eating habit"}</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non-vegetarian">Non vegetarian</option>
                        <option value="eggetarian">Eggetarian</option>
                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Drinking habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='drinking_habit' >
                    <option value={basicDetails? basicDetails?.drinking_habit: ""} >{basicDetails? basicDetails?.drinking_habit: "Select your drinking habit"}</option>
                        <option value="teetotaler"> teetotaler</option>
                        <option value="social-drinkers">Social drinker</option>
                        <option value="moderate-drinker">Moderate drinker</option>
                        <option value="Heavy-drinker">Heavy drinker</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Smoking habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='smoking_habit' >
                    <option value={basicDetails? basicDetails?.smoking_habit: ""} >{basicDetails? basicDetails?.smoking_habit: "Select your smoking habit"}</option>
                        <option value="nonsmoker">Nonsmoker</option>
                        <option value="former-smoker">Former smoker</option>
                        <option value="occasionally">Occasionally</option>
                        <option value="regular-smoker">regular smoker</option>
                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        martial status
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='martial_status' >
                    <option value={basicDetails? basicDetails?.martial_status: ""} >{basicDetails? basicDetails?.martial_status: "Select your martial status"}</option>
                        <option value="Never-married">Never married</option>
                        <option value="widowed">widowed</option>
                        <option value="divorced">divorced</option>
                        
                    </select>
                </div>
            </div>

            {/* <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Smoking habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='smoking_habit' >
                    <option value={basicDetails? basicDetails?.citizenship: ""} >{basicDetails? basicDetails?.citizenship: "Select your smoking habit"}</option>
                        <option value="nonsmoker">Nonsmoker</option>
                        <option value="former-smoker">Former smoker</option>
                        <option value="occasionally">Occasionally</option>
                        <option value="regular-smoker">regular smoker</option>
                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        martial status
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='martial_status' >
                    <option value={basicDetails? basicDetails?.martial_status: ""} >{basicDetails? basicDetails?.martial_status: "Select your martial status"}</option>
                        <option value="Never-married">Never married</option>
                        <option value="widowed">widowed</option>
                        <option value="divorced">divorced</option>
                        
                    </select>
                </div>
            </div> */}

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Country
                    </label>
                    <input  
                        type="text"
                        name='citizenship'
                        defaultValue={basicDetails?.citizenship}
                        placeholder={basicDetails?.citizenship ?basicDetails?.citizenship : "enter your country"}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   
                    />
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        City
                    </label>
                    <select name="location" id="location" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={basicDetails ? basicDetails.location : ''}>{basicDetails ? basicDetails.location : 'Select your location'}</option>
                        {citiesList.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    height (cm)
                </label>
                <input  
                    type="text"
                    name='height'
                    defaultValue={basicDetails?.height}
                    placeholder={basicDetails?.height ?basicDetails?.height : "enter your height"}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" />
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        body type
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='body_type' >
                    <option value={basicDetails? basicDetails?.body_type: ""} >{basicDetails? basicDetails?.body_type: "Select your body type"}</option>
                        <option value="slim">Slim</option>
                        <option value="athletic">Athletic</option>
                        <option value="average">Average</option>
                        <option value="heavy">Heavy</option>
                        
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div className='w-full  px-3 mb-6 md:mb-0'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                            Physical status
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='physical_status' >
                        <option value={basicDetails? basicDetails?.physical_status: ""} >{basicDetails? basicDetails?.physical_status: "Select your physical status"}</option>
                        <option value="normal">normal</option>
                        <option value="physically-challenged">Physically Challenged</option>
                    </select>

                </div>

            </div>





            <div className='flex justify-between'>
                <button className='bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-1 px-4 rounded' type='submit'>Update</button>
                <p onClick={() => setDisplayComponent('userDetails')} className='bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded' >Back to user profile</p>
            </div>
        </form>


    </div>

  )
}

export default EditBasicDetails