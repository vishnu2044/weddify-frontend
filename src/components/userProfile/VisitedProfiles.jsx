import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { useNavigate } from 'react-router-dom';

const VisitedProfiles = ({setCurrentComponent}) => {

  let {authTokens} = useContext(AuthContext)
  let [viewdProfiles, setViewedProfiles] = useState([])
  const navigate = useNavigate()

  const getViewedProfiles = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/preferedmatches/viewed_profiles/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokens.access, 
            },
          })
          if (response.status === 200){
            let data = await response.json()
            setViewedProfiles(data)
            console.log(data);
            
          }else if (response.status === 400){
            ErrorMessge({message:'details not getted'})
          }else{
            alert("An error occurred");
          }
        }catch (error){
          console.error("error ::", error)
        }
  }

    useEffect(()=>{
        getViewedProfiles()
    }, [])

    useEffect(()=>{
      console.log(viewdProfiles)
      console.log(viewdProfiles)
      console.log(viewdProfiles)
    }, [viewdProfiles])


  return (
    <div class="bg-gray-100">
    <div class="container mx-auto py-8">
        <div class=" sm:grid-cols-12 gap-6 px-4">


            <div class="col-span-1 sm:col-span-9">
                <div class="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-left">Visited Profiles</h1>
                    <br />
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-[#a43f75]">last visited profiles list</h3>
                        <div className='flex'>
                        <p onClick={()=>setCurrentComponent('profilesVisitedYOurs')} className="bg-[#621a40] mx-2 hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">
                            Viewed you
                        </p>
                        <p onClick={()=>setCurrentComponent("UserProfileDetails")} className="bg-[#621a40] mx-2 hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">
                            Back
                        </p>

                        </div>
                    </div>

                    <div className="max-w-screen-lg justify-between mx-auto mt-10">
                      {
                        viewdProfiles.map((profile)=>(

                        <div className="p-3 my-2 flex items-center bg-[#EFF6FE] justify-between cursor-pointer rounded-md hover:bg-[#c5ddf9] border border-solid border-gray-700">
                            <div className="flex items-center">
                                <img className="rounded-full h-14 w-14" src={profile?.profile_img ? `http://127.0.0.1:8000${profile?.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" } />
                                <div className="ml-2 flex flex-col">
                                    <div className="leading-snug text-sm text-gray-900 font-bold">{profile.first_name} {profile.last_name}</div>
                                    <div className="leading-snug text-xs text-gray-600">{profile.visited_time} </div>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <p className="h-7 mt-3 px-3 text-md font-semibold text-white mx-2 bg-[#64b17b] shadow-md rounded-full hover:bg-[#52b36a]">Chat</p>
                                <p onClick={()=> navigate("/home/matchprofile", {state : {matchId : profile.id }} )} className="h-7 mt-3 px-3 text-md font-semibold text-white mx-2 bg-[#6471B1] shadow-md rounded-full hover:bg-[#4e5a93]">View profile</p>

                            </div>
                        </div>
                        ))
                      }

                    </div>


                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default VisitedProfiles