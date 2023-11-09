import React, { useContext, useEffect, useState } from 'react';
import objects from '../../../jsonData/cities.json';
import AuthContext from '../../../context/AuthContext';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import Swal from 'sweetalert2';

function isInteger(value) {
    return value.isInteger
}

const EditbasicPreference = ({basicPreference, setComponent}) => {
    let [citiesList, setCitiesList] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    
    let updateBasicpreference = async (e) => {
        console.log("age form :::::::::::::::::::::::::::::::::::::::::::",e.target.age_from.value)
        e.preventDefault();
        if (e.target.age_from.value < 18) {
            ErrorMessge({ message: "The minimum age should be greater than 18" });
        } else if (e.target.age_to.value < 18 || e.target.age_from.value > e.target.age_to.value ) {
            ErrorMessge({ message: "maximum age should be greater than minimum age" });
        } else {
          let formData = new FormData();
          formData.append('mother_tongue', e.target.mother_tongue.value);
          formData.append("eating_habit", e.target.eating_habit.value);
          formData.append("drinking_habit", e.target.drinking_habit.value);
          formData.append("smoking_habit", e.target.smoking_habit.value);
          formData.append("martial_status", e.target.martial_status.value);
          formData.append("age_from", e.target.age_from.value);
          formData.append("age_to", e.target.age_to.value);
          formData.append("citizenship", e.target.citizenship.value);
          formData.append("location", e.target.location.value);
          formData.append("height", e.target.height.value);
          formData.append("body_type", e.target.body_type.value);
          console.log("form data ::::::::::::::::::::", formData);
      
          try {
            let response = await fetch("http://127.0.0.1:8000/userpreferences/updatebasicpreferences/", {
              method: "PATCH",
              headers: {
                'Authorization': 'Bearer ' + String(authTokens.access),
              },
              body: formData
            });
      
            if (response.ok) {
                setComponent("userPreferences")
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
                    title: 'religional details updated successfully'
                  })
            } else if (response.status === 400) {
              const data = await response.json();
              if (data.error) {
                ErrorMessge({ message: data.error });
              } else {
                ErrorMessge({ message: "An error occurred" });
              }
            } else if (response.status === 401) {
              logoutUser();
            } else {
                ErrorMessge({ message: "Error message" });
            }
      
          } catch (error) {
            console.error("An error occurred !!!!!!", error);
            ErrorMessge({ message: "An error occurred" });
          }
        }
      }
      

    useEffect(()=>{
        setCitiesList(objects.mandals)
    })
  return (
   
    <div className=" rounded-lg border m-3 shadow-sm bg-white border-y-zinc-950 p-4 md:p-8 flex items-center justify-center ">
        

        <form class="w-full max-w-lg" onSubmit={updateBasicpreference} >
        <h3 className="text-lg font-semibold text-[#a43f75] text-center">Edit Basic Preferences</h3>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Mother tongue
                    </label>
                    <input  
                        type="text"
                        name='mother_tongue'
                        defaultValue={basicPreference?.mother_tongue}
                        placeholder={basicPreference?.mother_tongue ?basicPreference?.mother_tongue : "enter your mother tongue"}
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
                        <option value={basicPreference? basicPreference?.eating_habit: ""} >{basicPreference? basicPreference?.eating_habit: "Select your eating habit"}</option>
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
                    <option value={basicPreference? basicPreference?.drinking_habit: ""} >{basicPreference? basicPreference?.drinking_habit: "Select your drinking habit"}</option>
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
                    <option value={basicPreference? basicPreference?.smoking_habit: ""} >{basicPreference? basicPreference?.smoking_habit: "Select your smoking habit"}</option>
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
                    <option value={basicPreference? basicPreference?.martial_status: ""} >{basicPreference? basicPreference?.martial_status: "Select your martial status"}</option>
                        <option value="Never-married">Never married</option>
                        <option value="widowed">widowed</option>
                        <option value="divorced">divorced</option>
                        
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        minimum age
                    </label>
                    <input  
                        type="text"
                        name='age_from'
                        defaultValue={basicPreference?.age_from}
                        placeholder={basicPreference?.age_from ? basicPreference?.age_from : "enter your prefered age from"}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3  mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   
                    />

                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                        maximum age
                    </label>
                    <input  
                        type="text"
                        name='age_to'
                        defaultValue={basicPreference?.age_to}
                        placeholder={basicPreference?.age_to ?basicPreference?.age_to : "enter your prefered age upto"}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3  mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   
                    />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Country
                    </label>
                    <input  
                        type="text"
                        name='citizenship'
                        defaultValue={basicPreference?.citizenship}
                        placeholder={basicPreference?.citizenship ?basicPreference?.citizenship : "enter your country"}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   
                    />
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        City
                    </label>
                    <select name="location" id="location" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={basicPreference ? basicPreference.location : ''}>{basicPreference ? basicPreference.location : 'Select your location'}</option>
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
                    defaultValue={basicPreference?.height}
                    placeholder={basicPreference?.height ?basicPreference?.height : "enter your height"}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" />
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        body type
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='body_type' >
                    <option value={basicPreference? basicPreference?.body_type: ""} >{basicPreference? basicPreference?.body_type: "Select your body type"}</option>
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
                        <option value={basicPreference? basicPreference?.physical_status: ""} >{basicPreference? basicPreference?.physical_status: "Select your physical status"}</option>
                        <option value="normal">normal</option>
                        <option value="physically-challenged">Physically Challenged</option>
                    </select>

                </div>

            </div>





            <div className='flex justify-between'>
                <button className='bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-1 px-4 rounded' type='submit'>Update</button>
                <p onClick={()=>setComponent("userPreferences")} className='bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded' >Back to user profile</p>
            </div>
        </form>


    </div>
  )
}

export default EditbasicPreference