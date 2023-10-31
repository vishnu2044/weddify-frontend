import React, { useEffect, useState } from 'react';
import obj from '../../jsonData/degrees.json';

const EditProfessionalDetails = ({setDisplayComponent, professionalDetails}) => {


    const [degreesList, setDegreesList] = useState([])

    // let updateProfessionalDetails = as


    useEffect(()=>{
        setDegreesList(obj.degrees);
    }, [])
  return (
    <div className=" rounded-lg border m-3 shadow-sm border-y-zinc-950 p-4 md:p-8 flex items-center justify-center ">
        

        <form class="w-full max-w-lg" >
        <h3 className="text-lg font-semibold text-[#a43f75] text-center">Update professional Details</h3>

        <div class="flex flex-wrap -mx-3 mb-6">
                <div className='w-full  px-3 mb-6 md:mb-0'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                            Education
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='education' >
                        <option value={professionalDetails? professionalDetails?.education: ""} >{professionalDetails? professionalDetails?.education: "Select educational qualification"}</option>
                            {degreesList.map((degree) => (
                                <option key={degree} value={degree}>
                                    {degree}
                                </option>)
                            )}
                    </select>

                </div>

            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    College
                </label>
                <input  
                    type="text"
                    name='college'
                    defaultValue={professionalDetails?.college}
                    placeholder={professionalDetails?.college ?professionalDetails?.college : "enter your college name"}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                    working sector
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='working_sector' >
                        <option value={professionalDetails? professionalDetails?.education: "working_sector"}>Select your working sector</option>
                        <option value="Government ">Government/PSU</option>
                        <option value="Private">Private</option>
                        <option value="Buisiness">Business</option>
                        <option value="Defence">Defence</option>
                        <option value="Self-Employed">Self Employed</option>
                        <option value="Not-Working">Not Working</option>

                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Income (in LPA)
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='income' >
                    <option value={professionalDetails? professionalDetails?.income: ""} >{professionalDetails? professionalDetails?.income: "Select your anual income"}</option>
                        <option value="0-1"> 0 - 1 LPA</option>
                        <option value="1-2"> 1 - 2 LPA</option>
                        <option value="2-3"> 2 - 3 LPA</option>
                        <option value="3-4"> 3 - 4 LPA</option>
                        <option value="4-5"> 4 - 5 LPA</option>
                        <option value="5-6"> 5 - 6 LPA</option>
                        <option value="6-7"> 6 - 7 LPA</option>
                        <option value="7-8"> 7 - 8 LPA</option>
                        <option value="8-9"> 8 - 9 LPA</option>
                        <option value="10-and-above"> 10 and above </option>

                    </select>
                </div>
            </div>
            
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Occupation
                </label>
                <input  
                    type="text"
                    name='occupation'
                    defaultValue={professionalDetails?.occupation}
                    placeholder={professionalDetails?.occupation ? professionalDetails?.occupation : "enter your occupation"}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Organization
                </label>
                <input  
                    type="text"
                    name='organization'
                    defaultValue={professionalDetails?.organization}
                    placeholder={professionalDetails?.organization ?professionalDetails?.organization : "enter your working organization"}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"   />
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

export default EditProfessionalDetails