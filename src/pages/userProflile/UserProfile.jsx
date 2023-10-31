import React, { useContext, useEffect, useState } from 'react';
import UserProfileDetails from '../../components/userProfile/UserProfileDetails';
import AuthContext from '../../context/AuthContext';
import EditProfile from '../../components/userProfile/EditProfile';
import UserDetails from '../../components/userProfile/UserDetails';
import EditBasicDetails from '../../components/userProfile/EditBasicDetails';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import EditProfessionalDetails from '../../components/userProfile/EditProfessionalDetails';


const UserProfile = () => {

  const [currentComponent, setCurrentComponent]  = useState('UserProfileDetails')
  const [displayComponent, setDisplayComponent] = useState('userDetails')

  let {authTokens} = useContext(AuthContext)
  let [user, setUser] = useState(null)
  let [userProfile, serUserProfile] = useState(null)
  let [basicDetails, setBasicDetails] = useState(null)
  let [professionalDetails, setProfessionalDetails] = useState(null)

  const getUserProfile = async () => {
      try {
          let response = await fetch('http://127.0.0.1:8000/userprofile/userdetails/', {
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
          } else if (response.status === 401) {
              alert("Unauthorized: not success!!!");
              console.log(response.status);
          } else {
              alert("An error occurred");
          }
          
      } catch (error) {
          console.error("An error occurred:", error);
      }
  }

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
            ErrorMessge({message:'table not created'})
            
        }

    }catch(error){
        console.error("error ::", error)
        
    }
  }

  const getProfesssionalDetails = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/userprofile/getprofessionaldetails/', {
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
        ErrorMessge({message:'table not created'})
      }else{
        alert("An error occurred");
      }
    }catch (error){
      console.error("error ::", error)
    }
  }

  const changeComponent = () =>{
    if (currentComponent === 'UserProfileDetails'){
      return <UserProfileDetails  user={user} userProfile={userProfile} setCurrentComponent = {setCurrentComponent} />
      
    }else if(currentComponent === 'editUser'){
      return <EditProfile user={user} userProfile={userProfile} setCurrentComponent = {setCurrentComponent} />
    }
  }

  const ChangeUserDetailComponents = () =>{
    if (displayComponent === 'userDetails'){
      return <UserDetails basicDetails={basicDetails} setDisplayComponent = { setDisplayComponent } />

    }else if (displayComponent === 'editBasicDetails'){
      return <EditBasicDetails basicDetails={basicDetails} setDisplayComponent = { setDisplayComponent } />

    }else if (displayComponent === 'editProfessionalDetails'){
      return <EditProfessionalDetails professionalDetails = {professionalDetails}  setDisplayComponent={setDisplayComponent}/>
    }

  }

  useEffect(() =>{
      getUserProfile();
      getBasicDetails();
      getProfesssionalDetails();
      
  }, [])

  return (
    <div>
      { changeComponent() }
      { ChangeUserDetailComponents() }
    </div>

  )
}

export default UserProfile






