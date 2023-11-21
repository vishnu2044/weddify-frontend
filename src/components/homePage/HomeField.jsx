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
  let [likedMatches, setLIkedMatches] = useState([])
  let [likeCount, setLikeCount] = useState([])
  const navigate = useNavigate()



  const getProfilesVisitedYours = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/preferedmatches/matchesviewedyours/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access,
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setProfileVisitedMatches(data.data);
        setMatchCount(data.match_count);
      } else if (response.status === 400) {
        ErrorMessge({ message: 'Professional not added' });
      } else if (response.status === 401) {
        ErrorMessge({ message: 'Unauthorized logging out' });
        logoutUser();
      } else {
        alert('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getProfilesLikedMatches = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/preferedmatches/liked_you_matches/', {
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
        alert('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  

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
    getProfilesLikedMatches()
    
  }, [])

  return (
    <div>
      <HomePageNotification  profileVisitedMatches={profileVisitedMatches} matchCount={matchCount} likedMatches={likedMatches} likeCount={likeCount}/>
      <LocationPreference />
      <NewMatches />
    </div>

  )
}

export default HomeField