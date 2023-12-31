import React, { useContext, useEffect, useState , lazy, Suspense } from 'react'
import LocationPreference from './matchPreferences/LocationPreference'
import NewMatches from './matchPreferences/NewMatches'
import HomePageNotification from './HomePageNotification';
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';
import MatchesInvite from './banners/MatchesInvite';
import { baseUrl } from '../../Configure/urls';
import BestMatches from '../../components/homePage/matchPreferences/BestMatches'
import { ErrorAlert } from '../../alerts/ErrorAlert';



const HomeField = () => {
  let {authTokens, logoutUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const checkProfileCompleteHome = async () =>{
    try{
      let response = await fetch(`${baseUrl}/preferedmatches/check_profile_completed/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens.access, 
        },
      })
      if (response.status === 200){
        console.log("profile is completed")
      }else if (response.status === 400){
        navigate('/home/userprofile')
        ErrorAlert({message: "complete your profile to access the site"})
      }else if (response.status === 401){
        ErrorMessge({message:'Unauthorized logging out'})
        logoutUser()
      }else{
        alert("An error occurred while check profile complete");
      }
    }catch (error){
      console.error("error while check profile complete ::", error)
    }
  }

  useEffect(()=>{
    checkProfileCompleteHome()
  }, [])
  return (
    <div>
      <HomePageNotification  />

        <BestMatches />


      <MatchesInvite />
      <NewMatches />
      <LocationPreference />
    </div>

  )
}

export default HomeField