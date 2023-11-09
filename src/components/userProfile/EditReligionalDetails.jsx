import React, { useContext, useEffect, useState } from 'react';
import religionCasteData from '../../jsonData/religions.json';
import object from '../../jsonData/stars.json';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import Swal from 'sweetalert2';

const EditReligionalDetails = ({religionalDetails , setDisplayComponent}) => {
    const [religion, setReligion] = useState('');
    const [caste, setCaste] = useState('');
    const [stars, setstars] = useState([])
    const availableCastes = religionCasteData[religion] || []
    let { authTokens, logoutUser } = useContext(AuthContext)

    const handleReligionChange = (e) =>{
        
        const selectedReligion = e.target.value;
        setReligion(selectedReligion)
        console.log(availableCastes);
        setCaste('')
    }

    const handleCasteChange = (e) =>{
        const selectedCaste = e.target.value
        setCaste(selectedCaste)
    }

    let updateReligionalDetails = async (e) =>{

        e.preventDefault();
        let formData = new FormData(); 
        formData.append('religion', e.target.religion.value);
        formData.append('caste', e.target.caste.value);
        formData.append('star', e.target.star.value);
        console.log("religion :::::::::::::::::::::::", e.target.religion.value);
        
        
        try{
            const response = await fetch('http://127.0.0.1:8000/userprofile/updatereligionaldata/', {
                method : "PATCH",
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: formData
            })
            if (response.ok){
                setDisplayComponent('userDetails')
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
            }else if(response.status === 400){
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
                    alert('An error occurred while processing the response');
                })

            }else if (response.status === 401){
                return logoutUser
            }else{
                ErrorMessge({message:'professional details upload failed!'})
            }
        }catch(error){
            console.error('An Error occurred !!', error);
            alert("An error occurrec while updating professional details")

        }
    }

    useEffect(()=>{
        setstars(object.stars)
    })

  return (
    <div className=" rounded-lg border m-3 shadow-sm border-y-zinc-950 p-4 md:p-8 flex items-center justify-center ">
        

        <form class="w-full max-w-lg" onSubmit={updateReligionalDetails}>
            <h3 className="text-lg font-semibold text-[#a43f75] text-center">Religional Details</h3>


            <div class="flex flex-wrap -mx-3 mb-6">
                <div className='w-full  px-3 mb-6 md:mb-0'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" name='religion'>
                            Religion
                    </label>
                    <select
                        name='religion'
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                        onChange={handleReligionChange}
                        >
                            <option value={religionalDetails? religionalDetails?.religion: ""}>
                                {religionalDetails? religionalDetails?.religion: "Select your religion"}
                            </option>
                            {Object.keys(religionCasteData).map((religion) => (
                                <option key={religion} value={religion}>
                                    {religion}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div className='w-full  px-3 mb-6 md:mb-0'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Cast
                    </label>
                    <select
                        name='caste'
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"

                        onChange={handleCasteChange}
                        >
                            <option value={religionalDetails? religionalDetails?.caste: ""}>
                            {religionalDetails? religionalDetails?.caste: "Select your caste"}
                            </option>
                            {availableCastes.map((caste) => (
                                <option key={caste} value={caste}>
                                    {caste}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div className='w-full  px-3 mb-6 md:mb-0'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                            Star
                    </label>
                    <select  
                        name='star'
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  
                    >

                        <option value={religionalDetails? religionalDetails?.star: ""} >
                            {religionalDetails? religionalDetails?.star: "Select your star"}
                        </option>
                        {stars.map((star) => (
                            <option key={star} value={star}>
                                {star}
                            </option>
                        ))}
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

export default EditReligionalDetails