import React, { useContext, useEffect, useState } from 'react'
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';


const UserDetails = ({setDisplayComponent, basicDetails, religionalDetails, professionalDetails}) => {

    let {authTokens} = useContext(AuthContext)


  return (
    <>

<div class="bg-gray-100">
        <div class="container mx-auto py-8">
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 px-4 ">
                <div class="col-span-1 sm:col-span-6">

                  <div class="bg-white shadow-xl rounded-2xl px-3 py-4">
                    <div className="flex justify-between items-center px-3 ">
                        <h3 className="text-xl  font-semibold text-[#6471b1]">Basic Details</h3>
                        <p onClick={() => setDisplayComponent('editBasicDetails')} className="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
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

                                        {basicDetails?.age ? <p>{basicDetails?.age}</p> : <p> Not added yet</p> }
                                        {basicDetails?.mother_tongue ? <p>{basicDetails?.mother_tongue}</p> : <p> Not added yet</p> }
                                        {basicDetails?.eating_habit ? <p>{basicDetails?.eating_habit}</p> : <p> Not added yet</p> }
                                        {basicDetails?.drinking_habit ? <p>{basicDetails?.drinking_habit}</p> : <p> Not added yet</p> }
                                        {basicDetails?.smoking_habit ? <p>{basicDetails?.smoking_habit}</p> : <p> Not added yet</p> }
                                        {basicDetails?.martial_status ? <p>{basicDetails?.martial_status}</p> : <p> Not added yet</p> }
                                        {basicDetails?.height||basicDetails?.body_type ? <p>{basicDetails?.height}  ({basicDetails?.body_type})</p> : <p> Not added yet</p> }
                                        {basicDetails?.physical_status ? <p>{basicDetails?.physical_status}</p> : <p> Not added yet</p> }
                                        {basicDetails?.location ? <p>{basicDetails?.location}</p> : <p> Not added yet</p> }
                                        {basicDetails?.citizenship ? <p>{basicDetails?.citizenship}</p> : <p> Not added yet</p> }

                                        
                                    </div>
                                </div>
                        <hr class="my-6 border-t border-gray-300" />
                  </div>
                </div>

                <div class="col-span-1 sm:col-span-6">
                    <div class="bg-white shadow-xl rounded-2xl p-6">

                      <div className="flex justify-between items-center px-3">
                          <h3 className="text-xl  font-semibold text-[#6471b1]">Professional Details</h3>
                          <p onClick={() => setDisplayComponent('editProfessionalDetails')} className="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
                      </div>
                      <div class=" grid grid-cols-2 gap-2 text-gray-600 ">
                                    <div class="text-right pr-3">
                                        <p><strong>Education :</strong></p>
                                        <p><strong>College :</strong></p>
                                        <p><strong>Working Sector :</strong></p>
                                        <p><strong>Income (LPA) :</strong></p>
                                        <p><strong>Occupation :</strong></p>
                                        <p><strong>Organization :</strong></p>
                                    </div>
                                    <div class="px-3">

                                      {professionalDetails?.education ? <p>{professionalDetails?.education}</p> : <p> Not added yet</p> }
                                      {professionalDetails?.college ? <p>{professionalDetails?.college}</p> : <p> Not added yet</p> }
                                      {professionalDetails?.working_sector ? <p>{professionalDetails?.working_sector}</p> : <p> Not added yet</p> }
                                      {professionalDetails?.income ? <p>{professionalDetails?.income}</p> : <p> Not added yet</p> }
                                      {professionalDetails?.occupation ? <p>{professionalDetails?.occupation}</p> : <p> Not added yet</p> }
                                      {professionalDetails?.organization ? <p>{professionalDetails?.organization}</p> : <p> Not added yet</p> }
   
                                    </div>
                                </div>
                    </div>

                    <div class="bg-white shadow-xl rounded-2xl mt-2 p-6">

                      <div className="flex justify-between items-center px-3">
                          <h3 className="text-xl  font-semibold text-[#6471b1]">Religional Details</h3>
                          <p onClick={() => setDisplayComponent('editReligionalDetails')} className="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
                      </div>
                      <div class=" grid grid-cols-2 gap-2 text-gray-600 ">
                                    <div class="text-right pr-3">
                                        <p><strong>Religion :</strong></p>
                                        <p><strong>Caste :</strong></p>
                                        <p><strong>Star :</strong></p>

                                    </div>
                                    <div class="px-3">

                                      {religionalDetails?.religion ? <p>{religionalDetails?.religion}</p> : <p> Not added yet</p> }
                                      {religionalDetails?.caste ? <p>{religionalDetails?.caste}</p> : <p> Not added yet</p> }
                                      {religionalDetails?.star ? <p>{religionalDetails?.star}</p> : <p> Not added yet</p> }

                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    </div>





    
    
    </>

  )
}

export default UserDetails