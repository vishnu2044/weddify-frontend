import React, { useContext, useEffect, useState } from 'react'
import LocationPreference from './matchPreferences/LocationPreference'
import NewMatches from './matchPreferences/NewMatches'
import HomePageNotification from './HomePageNotification';
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';

const HomeField = () => {
  let {authTokens, logoutUser} = useContext(AuthContext)
  let [profileVisitedMatches, setProfileVisitedMatches] = useState([])
  let [matchCount, setMatchCount] = useState([])
  const navigate = useNavigate()

  const getProfilesVisitedYours = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/preferedmatches/matchesviewedyours/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens.access, 
        },
      })
      if (response.status === 200){
        let data = await response.json()
        setProfileVisitedMatches(data.data)
        setMatchCount(data.match_count)
      }else if (response.status === 400){
        ErrorMessge({message:'professional not addedd'})
      }else if (response.status === 401){
        ErrorMessge({message:'Unauthorized logging out'})
        logoutUser()
      }else{
        alert("An error occurred");
      }
    }catch (error){
      console.error("error ::", error)
    }
  }
  

  const checkProfileCompleteHome = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/preferedmatches/check_profile_completed/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens.access, 
        },
      })
      if (response.status === 200){
        console.log("profile is completed")
        getProfilesVisitedYours()
      }else if (response.status === 400){
        ErrorMessge({message: "complete your profile to access the site"})
        navigate('/home/userprofile')
      }else if (response.status === 401){
        ErrorMessge({message:'Unauthorized logging out'})
        logoutUser()
      }else{
        alert("An error occurred");
      }
    }catch (error){
      console.error("error ::", error)
    }
  }

  useEffect(()=>{
    checkProfileCompleteHome()
  }, [])

  return (
    <div>
      <HomePageNotification  profileVisitedMatches={profileVisitedMatches} matchCount={matchCount} />
      <LocationPreference />
      <NewMatches />
    </div>

  )
}

export default HomeField