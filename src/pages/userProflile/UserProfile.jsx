import React, { useContext, useEffect, useState } from 'react';
import UserProfileDetails from '../../components/userProfile/UserProfileDetails';
import AuthContext from '../../context/AuthContext';
import EditProfile from '../../components/userProfile/EditProfile';
import UserDetails from '../../components/userProfile/UserDetails';
import EditBasicDetails from '../../components/userProfile/EditBasicDetails';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import EditProfessionalDetails from '../../components/userProfile/EditProfessionalDetails';
import EditReligionalDetails from '../../components/userProfile/EditReligionalDetails';
import Preferences from '../../components/userProfile/userPreference/Preferences';
import VisitedProfiles from '../../components/userProfile/VisitedProfiles';
import BlockedMatches from '../../components/userProfile/BlockedMatches';
import ProfilesVisitedYous from '../../components/userProfile/ProfilesVisitedYous';
import { baseUrl } from '../../Configure/urls';
import { ErrorAlert } from '../../alerts/ErrorAlert';


const UserProfile = () => {

  const [currentComponent, setCurrentComponent]  = useState('UserProfileDetails')
  const [displayComponent, setDisplayComponent] = useState('userDetails')

  let {authTokens, logoutUser} = useContext(AuthContext)
  let [user, setUser] = useState(null)
  let [userProfile, serUserProfile] = useState(null)
  let [basicDetails, setBasicDetails] = useState(null)
  let [professionalDetails, setProfessionalDetails] = useState(null)
  let [religionalDetails, setReligionalDetails] = useState(null)

  const getUserProfile = async () => {
      try {
          let response = await fetch(`${baseUrl}/userprofile/userdetails/`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + authTokens.access, 
              }
          });
  
          if (response.status === 200) {
              let data = await response.json();
              setUser(data);
              serUserProfile(data.user_profile)
          } else if (response.status === 400) {
            response.json()
            .then(data =>{
                if (data.error){
                    ErrorAlert({message: data.error})
                }else{
                    console.log("user profile is not completed")
                }
            })
              console.log(response.status);
          } else if (response.status === 401) {
              ErrorAlert({message : "unauthorized user"})
              logoutUser()
          } else {
              alert("An error occurred while getting user profile");
              console.log(response.status)
          }
          
      } catch (error) {
          console.error("An error occurred: while geting user profile", error);
      }
  }

  const getBasicDetails = async () =>{
    try{
        let response = await fetch(`${baseUrl}/userprofile/getbasicdetails/`,{
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
          console.log('basic details didnt added');    
        }
    }catch(error){
        console.error("error geting while user basic details getting!!!!!!!!!::", error)
        
    }
  }

  const getProfesssionalDetails = async () =>{
    try{
      let response = await fetch(`${baseUrl}/userprofile/getprofessionaldetails/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens.access, 
        },
      })
      if (response.status === 200){
        let data = await response.json()
        setProfessionalDetails(data)
      }else if (response.status === 400){
        console.log("didnt get the professional details!!!")
      }else{
        alert("An error occurred whil professional details add");
      }
    }catch (error){
      console.error("An error occurred whil professional details add", error)
    }
  }


  const getReligionalDetails = async () =>{
    try{
      let response = await fetch(`${baseUrl}/userprofile/getreligionaldetails/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authTokens.access, 
        },
      })
      if (response.status === 200){
        let data = await response.json()
        setReligionalDetails(data)
        
      }else if (response.status === 400){
        console.log('religgious details didnt added'); 
      }else{
        alert("An error occurred while religious details add");
      }
    }catch (error){
      console.error("An error occurred while religious details add   error ::", error)
    }
  }

  

  const changeComponent = () =>{
    if (currentComponent === 'UserProfileDetails'){
      return <UserProfileDetails  user={user} userProfile={userProfile} setCurrentComponent = {setCurrentComponent} />
    }else if(currentComponent === 'editUser'){
      return <EditProfile user={user} userProfile={userProfile} getUserProfile={getUserProfile} setCurrentComponent = {setCurrentComponent} />
    }else if (currentComponent === 'visitedProfiles'){
      return <VisitedProfiles setCurrentComponent = {setCurrentComponent}/>
    }else if (currentComponent === 'blockedProfiles'){
      return <BlockedMatches setCurrentComponent = {setCurrentComponent} />
    }else if (currentComponent === 'profilesVisitedYOurs'){
      return <ProfilesVisitedYous setCurrentComponent = {setCurrentComponent}/>
    }
  }

  const ChangeUserDetailComponents = () =>{
    if (displayComponent === 'userDetails'){
      return <UserDetails basicDetails={basicDetails} religionalDetails={religionalDetails} professionalDetails={professionalDetails} setDisplayComponent = { setDisplayComponent } />

    }else if (displayComponent === 'editBasicDetails'){
      return <EditBasicDetails basicDetails={basicDetails} setDisplayComponent = { setDisplayComponent } />

    }else if (displayComponent === 'editProfessionalDetails'){
      return <EditProfessionalDetails professionalDetails = {professionalDetails}  setDisplayComponent={setDisplayComponent}/>

    }else if (displayComponent === 'editReligionalDetails'){
      return <EditReligionalDetails religionalDetails = {religionalDetails}  setDisplayComponent={setDisplayComponent}/>
    }

  }

  useEffect(() =>{
      getUserProfile();
      getBasicDetails();
      getProfesssionalDetails();
      getReligionalDetails();
      
      
  }, [])
  
  useEffect(() =>{
      getUserProfile();
      getBasicDetails();
      getProfesssionalDetails();
      getReligionalDetails();
      
      
  }, [currentComponent, displayComponent])

  return (
    <div>
      { changeComponent() }
      { ChangeUserDetailComponents() }
      <Preferences />
    </div>

  )
}

export default UserProfile






