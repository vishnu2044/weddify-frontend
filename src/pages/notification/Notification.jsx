import React, { useContext, useEffect, useState } from 'react'
import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";
import LikedMatchesList from '../../components/notifications/LikedMatchesList';
import { baseUrl } from '../../Configure/urls';
import { ErrorMessge} from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';
import ProfileVisitedList from '../../components/notifications/ProfileVisitedList';


const Notification = () => {
  let [visitedDropDown, setVisitedDropDown] = useState(false)
  let [likedDropDown, setLikedDropDown] = useState(false)
  let [onclickEvent, setOnclickEvent] = useState(false)

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

  useEffect(()=> {
    getProfilesLikedMatches();
    getProfilesVisitedYours();
  }, [])

  const handleVisitedDropDown = () =>{
    if (visitedDropDown === false){
      setVisitedDropDown(true)
    }else{
      setVisitedDropDown(false)
    }
  }

  const handleLikedDropDown = () =>{
    if (likedDropDown === false){
      setLikedDropDown(true)
    }else{
      setLikedDropDown(false)
    }
  }
  return (
    <div className='container h-screen'>
    

      <div class="grid gap-3 mt-3 ">
        <p class="flex bg-[#d2ffe3] flex-col px-4 space-y-2 transition-all duration-500  border  rounded-lg shadow hover:shadow-xl lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-3">
          <div class="flex items-center justify-center w-4 h- bg-white border pt-3 mt-1  rounded-full shadow-md lg:h-12 lg:w-12">
            <p class="text-center text-lg  font-semibold">{visitedMatchCount}</p>
          </div>

          <div class="flex justify-between w-full">
            <p class="mb-1 mt-3  text-base font-medium text-gray-600">Persons wisited your profile</p>
            {
              visitedDropDown ? 
              (<p onClick={handleVisitedDropDown} class="mt-3 text-xl text-gray-700 mx-5 font-medium "><FaCircleChevronUp /></p>)
              :
              (<p onClick={handleVisitedDropDown} class="mt-3 text-xl text-gray-700 mx-5 font-medium "><FaCircleChevronDown /></p>)
            }

          </div>
        </p> 
        {
          visitedDropDown && <ProfileVisitedList profileVisitedMatches={profileVisitedMatches} />
        }

        <p class="flex bg-[#f8d9d9] flex-col px-4 space-y-2 transition-all duration-500  border  rounded-lg shadow hover:shadow-xl lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-3">
          <div class="flex items-center justify-center w-4 h- bg-white border pt-3 mt-1  rounded-full shadow-md lg:h-12 lg:w-12">
            <p class="text-center text-lg  font-semibold">{likeCount}</p>
          </div>

          <div class="flex justify-between w-full">
            <p class="mb-1 mt-3  text-base font-medium text-gray-600">Persons liked your profile</p>
            {
              likedDropDown ? 
              (<p onClick={handleLikedDropDown} class="mt-3 text-xl text-gray-700 mx-5 font-medium "><FaCircleChevronUp /></p>)
              :
              (<p onClick={handleLikedDropDown} class="mt-3 text-xl text-gray-700 mx-5 font-medium "><FaCircleChevronDown /></p>)
            }

          </div>
        </p> 
        {
          likedDropDown && <LikedMatchesList likedMatches={likedMatches} />
        } 

    </div>

    </div>
  )
}

export default Notification