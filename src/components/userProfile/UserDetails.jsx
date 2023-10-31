import React, { useContext, useEffect, useState } from 'react'
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';


const UserDetails = ({setDisplayComponent, basicDetails}) => {

    let {authTokens} = useContext(AuthContext)
    let professionalDetails = null
    let relegionalDetails = null

  return (
<div className="p-2 md:p-8 flex mx-0 md:mx-3 flex-wrap">
        <div className="w-full md:w-1/2 md:p-8  border rounded-lg border-zinc-950">
          <div className=''>
            <div className="flex justify-between items-center p-3">
              <h3 className="text-xl  font-semibold text-[#a43f75]">Basic Details</h3>
              <p onClick={() => setDisplayComponent('editBasicDetails')} className="bg-[#621a40] hover-bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
            </div>
            <div className='mr-20'>
              <ul className="text-gray-600">
                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Age:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.age}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Mother Tongue:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.mother_tongue}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Eating habit:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.eating_habit}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Drinking habits:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.drinking_habit}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Smoking habits:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.smoking_habit}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Marital status:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.martial_status }</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">physical type:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.height}  ({basicDetails?.body_type})</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-base">physical status:</span>
                  {basicDetails ? <span className="font-normal text-base">{basicDetails?.physical_status }</span>  : <span>Not added</span>}

                </li>   

              </ul>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-8 border rounded-xl  border-zinc-950">

          <div className=''>
            <div className="flex justify-between items-center p-3">
              <h3 className="text-xl  font-semibold text-[#a43f75]">Professional Details</h3>
              <p onClick={() => setDisplayComponent('editProfessionalDetails')} className="bg-[#621a40] hover-bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
            </div>
            <div className='mr-20'>
              <ul className="text-gray-600">
                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Education :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.education}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Education in detail :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.educationDetail}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">College :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.college}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Working sector :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.working_sector}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Income (LPA) :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.income}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Occupation :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.occupation}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Organization :</span>
                  {professionalDetails ? <span className="font-normal text-base">{professionalDetails?.organization}</span> : <span>Not added</span>}
                </li>

              </ul>
            </div>
          </div>

          <div className=''>
            <div className="flex justify-between items-center p-3">
              <h3 className="text-xl  font-semibold text-[#a43f75]">Professional Details</h3>
              <p onClick={() => setDisplayComponent('editBasicDetails')} className="bg-[#621a40] hover-bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
            </div>
            <div className='mr-20'>
              <ul className="text-gray-600">
                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Religion :</span>
                  {relegionalDetails ? <span className="font-normal text-base">{relegionalDetails?.religion}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Cast :</span>
                  {relegionalDetails ? <span className="font-normal text-base">{relegionalDetails?.cast}</span> : <span>Not added</span>}
                </li>



              </ul>
            </div>
          </div>

        </div>
      </div>
  )
}

export default UserDetails