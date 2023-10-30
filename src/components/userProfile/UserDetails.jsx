import React, { useContext, useEffect, useState } from 'react'
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';


const UserDetails = ({setDisplayComponent}) => {

    let {authTokens} = useContext(AuthContext)
    let [basicDetails, setBasicDetails] = useState(null)

    const getBasicDetails = async () =>{
        try{
            let response = await fetch('http://127.0.0.1:8000/userprofile/userprofile/',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                },
            })
            if (response.status === 200){
                let data = await response.json();
                setBasicDetails(data)
            }else if (response.status === 400){
                // ErrorMessge({message:'table not created'})
                
            }

        }catch(error){
            console.error("error ::", error)
            
        }
    }
    useEffect(()=>{
        getBasicDetails()
    }, [])
  return (
<div className="p-2 md:p-8 flex mx-0 md:mx-3 flex-wrap">
        <div className="w-full md:w-1/2 md:p-8  border rounded-lg border-zinc-950">
          <div className=''>
            <div className="flex justify-between items-center p-3">
              <h3 className="text-lg font-semibold text-[#a43f75]">Basic Details</h3>
              <p onClick={() => setDisplayComponent('editBasicDetails')} className="bg-[#621a40] hover-bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Edit</p>
            </div>
            <div className='mr-20'>
              <ul className="text-gray-600">
                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Age:</span>
                  {basicDetails ? <span>{basicDetails?.age}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Mother Tongue:</span>
                  {basicDetails ? <span>{basicDetails?.mother_tongue}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Eating habit:</span>
                  {basicDetails ? <span>{basicDetails?.eating_habit}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Drinking habits:</span>
                  {basicDetails ? <span>{basicDetails?.drinking_habit}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Smoking habits:</span>
                  {basicDetails ? <span>{basicDetails?.smoking_habit}</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">Marital status:</span>
                  {basicDetails ? <span>{basicDetails?.martial_status }</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">physical type:</span>
                  {basicDetails ? <span>`${basicDetails?.height} ( ${basicDetails?.body_type})`</span> : <span>Not added</span>}
                </li>

                <li className="flex justify-between space-x-2">
                  <span className="font-bold text-md">physical status:</span>
                  {basicDetails ? <span>{basicDetails?.physical_status }</span> : <span>Not added</span>}

                </li>   1

              </ul>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-8 border rounded-xl  border-zinc-950">
          <div>
            <div className="flex justify-between items-center p-3 ">
              <h3 className="text-lg font-semibold text-[#a43f75]">Professional Details</h3>
              <p className="bg-[#621a40] hover-bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Edit</p>
            </div>
            <p className="text-gray-600"><strong>Education :</strong></p>
            <p className="text-gray-600"><strong>College :</strong></p>
            <p className="text-gray-600"><strong>Working sector :</strong></p>
            <p className="text-gray-600"><strong>Income :</strong></p>
            <p className="text-gray-600"><strong>Occupation :</strong></p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-[#a43f75]">Religious Details</h3>
              <p className="bg-[#621a40] hover-bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Edit</p>
            </div>
            <p className="text-gray-600"><strong>Religion :</strong></p>
            <p className="text-gray-600"><strong>Cast :</strong></p>
          </div>
        </div>
      </div>
  )
}

export default UserDetails