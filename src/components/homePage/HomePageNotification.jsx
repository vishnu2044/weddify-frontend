import React, {useContext, useEffect, useState} from 'react';
import ProfileVisitMatches from './notification/ProfileVisitMatches';
import ProfileLikedMatches from './notification/ProfileLikedMatches';
import { baseUrl } from '../../Configure/urls';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';



const HomePageNotification = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isLikedPopUp, setILikedPopUp] = useState(false)
  let {authTokens, logoutUser} = useContext(AuthContext)

  let [profileVisitedMatches, setProfileVisitedMatches] = useState([])
  let [visitedMatchCount, setVisitedMatchCount] = useState('')
  let [likedMatches, setLIkedMatches] = useState([])
  let [likeCount, setLikeCount] = useState('')


  const getProfilesVisitedYours = async () => {
    try {
      const response = await fetch(`${baseUrl}/preferedmatches/matchesviewedyours/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setProfileVisitedMatches(data.data);
        setVisitedMatchCount(data.match_count)
        console.log("visited profiles::::::::::::::::",data.data)
      } else if (response.status === 400) {
        ErrorMessge({ message: 'Professional not added' });
      } else if (response.status === 401) {
        logoutUser();
        ErrorMessge({ message: 'Unauthorized logging out' });
      } else {
        alert('An error occurred while profile visited matches');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getProfilesLikedMatches = async () => {
    try {
      const response = await fetch(`${baseUrl}/preferedmatches/liked_you_matches/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setLIkedMatches(data.data);
        console.log(":>:>:>:>:>:>:>",data.data)
        setLikeCount(data.liked_count)

      } else if (response.status === 400) {
        console.log('no matches liked your profile')
      } else if (response.status === 401) {
        ErrorMessge({ message: 'Unauthorized logging out' });
        logoutUser();
      } else {
        alert('An error while profile liked matches');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const openPopup = () =>{
    if(isPopUpOpen === false){
      setIsPopUpOpen(true)
    }else{
      setIsPopUpOpen(false)
    }
  };

  const likePopUp = () =>{
    if(isLikedPopUp === false){
      setILikedPopUp(true)
    }else{
      setILikedPopUp(false)
    }
  }
  
  useEffect(()=>{
    getProfilesVisitedYours();
    getProfilesLikedMatches();
    
  }, [])

  return (
    <>
    <div class="grid gap-3 md:grid-cols-2   mt-3 ">
    <p 
        class="flex bg-[#d2ffe3] flex-col p-4 space-y-2 transition-all duration-500  border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-3">
        <div class="flex items-center justify-center w-8 h-8 bg-white border pt-3 mt-1  rounded-full shadow-md lg:h-12 lg:w-12">
            <p class="text-center text-lg  font-semibold">{visitedMatchCount? visitedMatchCount : "0"}</p>
        </div>

        <div class="flex-1 ">
            <p class="mb-1 mt-3  text-base font-medium text-gray-600">Persons wisited your profile</p>
            {
              visitedMatchCount ?
            <span onClick={openPopup} class="flex cursor-pointer items-baseline text-sm font-bold mb-0">
              Check visited profiles
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            :
              <p></p>
            }
        </div>
    </p>

    <p 
        class="flex bg-[#f8d9d9] flex-col p-4 space-y-2 transition-all duration-500  border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-3">
        <div class="flex items-center justify-center w-8 h-8 bg-white border pt-3 mt-1 rounded-full shadow-md lg:h-12 lg:w-12">
            <p class="text-center text-lg font-semibold">{likeCount ? likeCount : "0"}</p>
        </div>

        <div class="flex-1">
            <p class="mb-1 mt-3  text-base font-medium text-gray-600">Persons liked your profile</p>
            {
              likeCount ?
            <span onClick={likePopUp} class="flex cursor-pointer items-baseline text-sm font-bold mb-0">
              Check liked profiles
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            :
              <p></p>
            }
        </div>
    </p>




</div>

{
  isPopUpOpen && <ProfileVisitMatches profileVisitedMatches={profileVisitedMatches} onClose ={openPopup} />
}
{
  isLikedPopUp && <ProfileLikedMatches likedMatches={likedMatches} onClose ={likePopUp} />
}
    </>

  )
}

export default HomePageNotification