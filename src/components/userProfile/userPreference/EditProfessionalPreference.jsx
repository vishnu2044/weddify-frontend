import React, { useState, useEffect, useContext } from 'react'
import obj from '../../../jsonData/degrees.json';
import AuthContext from '../../../context/AuthContext';
import Swal from 'sweetalert2';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import { baseUrl } from '../../../Configure/urls';


const EditProfessionalPreference = ({
    setComponent, 
    professionalPreference
}) => {

    const [degreesList, setDegreesList] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    
    let updateProfessionalPreferences = async (e) =>{
        e.preventDefault()
        if (e.target.occupation.value === ''){
            ErrorMessge({message:'please enter your mother tongue'})
        }else{
            let formData = new FormData
            formData.append("education", e.target.education.value);
            formData.append("college", e.target.college.value);
            formData.append("working_sector", e.target.working_sector.value);
            formData.append("income", e.target.income.value);
            formData.append("occupation", e.target.occupation.value);
            formData.append("organization", e.target.organization.value);

            try{
                const response =  await fetch(`${baseUrl}/userpreferences/updateprfessionalpreference/`, {
                    method: "PATCH",
                    headers: {
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: formData
                })
                if (response.ok ){
                    setComponent('userPreferences')
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
                        title: 'professional preferences updated successfully'
                      })

                }else if (response.status === 400){
                    response.json()
                    .then(data =>{
                        if (data.error){
                            ErrorMessge({message: data.error})
                        }else{
                            ErrorMessge({message:"an error occurred"})
                        }
                    })
                    .catch(error =>{
                        console.error("error :::::::::::", error);
                        alert('An error occurred while professional preference');
                    })

                }else if (response.status === 401){
                    return logoutUser
                }else{
                    ErrorMessge({message:'professional details update failed!'})
                    console.log(response.error);
                }

            }catch(error){
                console.error('An Error occurred !!', error);
                alert("An error occurrec while updating professional details")

            }
        }
    }

    useEffect(()=>{
        setDegreesList(obj.degrees);
    }, [])
  return (
    <>
        <div class="rounded-lg border bg-white m-3 shadow-sm border-y-zinc-950 p-4 md:p-8 flex items-center justify-center">
        <form class="w-full max-w-lg" onSubmit={updateProfessionalPreferences} >
            <h3 class="text-lg font-semibold  text-center">Update Professional Preferences</h3>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label for="education" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Education</label>
                    <select name="education" id="education" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={professionalPreference ? professionalPreference.education : ''}>{professionalPreference ? professionalPreference.education : 'Select educational qualification'}</option>
                        {degreesList.map((degree) => (
                            <option key={degree} value={degree}>
                                {degree}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label for="college" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">College</label>
                    <input type="text" name="college" id="college" defaultValue={professionalPreference?.college} placeholder={professionalPreference?.college ? professionalPreference.college : 'Enter your college name'} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="working_sector" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Working Sector</label>
                    <select name="working_sector" id="working_sector" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={professionalPreference ? professionalPreference.working_sector : ''}>{professionalPreference ? professionalPreference.working_sector : 'Select your working sector'}</option>
                        <option value="Government">Government/PSU</option>
                        <option value="Private">Private</option>
                        <option value="Business">Business</option>
                        <option value="Defence">Defence</option>
                        <option value="Self-Employed">Self Employed</option>
                        <option value="Not-Working">Not Working</option>
                    </select>
                </div>

                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label for="income" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Income (in LPA)</label>
                    <select name="income" id="income" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value={professionalPreference ? professionalPreference.income : ''}>{professionalPreference ? professionalPreference.income : 'Select your annual income'}</option>
                        <option value="0-1">0 - 1 LPA</option>
                        <option value="1-2">1 - 2 LPA</option>
                        <option value="2-3">2 - 3 LPA</option>
                        <option value="3-4">3 - 4 LPA</option>
                        <option value="4-5">4 - 5 LPA</option>
                        <option value="5-6">5 - 6 LPA</option>
                        <option value="6-7">6 - 7 LPA</option>
                        <option value="7-8">7 - 8 LPA</option>
                        <option value="8-9">8 - 9 LPA</option>
                        <option value="10-and-above">10 and above</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label for="occupation" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Occupation</label>
                    <input type="text" name="occupation" id="occupation" defaultValue={professionalPreference?.occupation} placeholder={professionalPreference? professionalPreference?.occupation : 'Enter your occupation'} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label for="organization" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Organization</label>
                    <input type="text" name="organization" id="organization" defaultValue={professionalPreference?.organization} placeholder={professionalPreference? professionalPreference?.organization : 'Enter your working organization'} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800" />
                </div>
            </div>

            <div class="flex justify-between">
                <button class="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white font-bold py-1 px-4 rounded" type="submit">Update</button>
                <p onClick={() => setComponent('userPreferences')} class="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white font-bold py-2 px-4 rounded">Back to user profile</p>
            </div>
        </form>
    </div>
    </>
  )
}

export default EditProfessionalPreference