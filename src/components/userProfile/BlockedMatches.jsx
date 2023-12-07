import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Configure/urls';

const BlockedMatches = ({setCurrentComponent}) => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [blockedMatches, setBlockedMatches] = useState([])
    const navigate  =useNavigate()

    const getBlockedMatches = async () =>{
        try{
          let response = await fetch(`${baseUrl}/userprofile/get_blocked_matches/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokens.access, 
            },
          })
          if (response.status === 200){
            let data = await response.json()
            setBlockedMatches(data)
          }else if (response.status === 400){
            ErrorMessge({message:'bad request'})
          }else if (response.status === 401){
            ErrorMessge({message:'Unauthorized logging out'})
            logoutUser()
          }else{
            alert("An error occurred ");
          }
        }catch (error){
          console.error("error ::", error)
        }
    }

    const unblockMatch = async ( match_id) => {
        try {
            console.log('the match id is', match_id);
            let response = await fetch(`${baseUrl}/userprofile/unblock_match/${match_id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
    
            if (response.ok) {
                console.log('User unblocked successfully');
                setBlockedMatches(prevBlockedMatches => prevBlockedMatches.filter(match => match.id !== match_id));
            } else {
                console.error('Failed to unblock user');
                console.error(response.status);
            }
        } catch (error) {
            console.error('Error unblocking user', error);
        }
    };
    

      useEffect(()=>{
        getBlockedMatches()
      }, [])

  return (
    <div class="bg-gray-100">
        <div class="container mx-auto py-8">
            <div class=" sm:grid-cols-12 gap-6 px-4">


                <div class="col-span-1 sm:col-span-9">
                    <div class="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-left">Blocked Profiles</h1>
                        <br />
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#a43f75]">View your blocked persons list</h3>
                            <p onClick={()=>setCurrentComponent("UserProfileDetails")} className="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">
                                Back
                            </p>
                        </div>

                        <div className="max-w-screen-lg justify-between mx-auto mt-10">
                            { blockedMatches.length > 0 ?
                                blockedMatches.map((blockedMatch) =>(

                            <div className="p-3 my-2 flex items-center bg-[#EFF6FE] justify-between cursor-pointer rounded-md hover:bg-[#c5ddf9] border border-solid border-gray-700">
                                <div className="flex items-center">
                                    <img className="rounded-full h-14 w-14" src={blockedMatch?.profile_img ? `${baseUrl}${blockedMatch.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" }  />
                                    <div className="ml-2 flex flex-col">
                                        <div className="leading-snug text-sm text-gray-900 font-bold">{blockedMatch.first_name} {blockedMatch.last_name}</div>
                                        <div className="leading-snug text-xs text-gray-600">last visited : </div>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <p onClick={()=> navigate("/home/matchprofile", {state : {matchId : blockedMatch.id }} )} className="h-7 mt-3 px-3 text-md font-semibold text-white mx-2 bg-[#64b17b] shadow-md rounded-full hover:bg-[#52b36a]">View</p>
                                    <p onClick={()=>unblockMatch( blockedMatch.id)} className="h-7 mt-3 px-3 text-md font-semibold text-white mx-2 bg-[#6471B1] shadow-md rounded-full hover:bg-[#4e5a93]">Unblock</p>

                                </div>
                            </div>
                                )) :
                                <p className="font-semibold ">No blocked matches </p>

                            }

                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlockedMatches