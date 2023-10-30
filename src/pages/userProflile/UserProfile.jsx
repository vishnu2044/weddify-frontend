import React, { useContext, useEffect, useState } from 'react';
import UserProfileDetails from '../../components/userProfile/UserProfileDetails';
import AuthContext from '../../context/AuthContext';
import EditProfile from '../../components/userProfile/EditProfile';
import UserDetails from '../../components/userProfile/UserDetails';
import EditBasicDetails from '../../components/userProfile/EditBasicDetails';



const UserProfile = () => {

  const [currentComponent, setCurrentComponent]  = useState('UserProfileDetails')
  const [displayComponent, setDisplayComponent] = useState('userDetails')
  let {authTokens} = useContext(AuthContext)
  let [user, setUser] = useState(null)
  let [userProfile, serUserProfile] = useState(null)

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

  const changeComponent = () =>{
    if (currentComponent === 'UserProfileDetails'){
      return <UserProfileDetails  user={user} userProfile={userProfile} setCurrentComponent = {setCurrentComponent} />
    }else if(currentComponent === 'editUser'){
      return <EditProfile user={user} userProfile={userProfile} setCurrentComponent = {setCurrentComponent} />
    }
  }

  const ChangeUserDetailComponents = () =>{
    if (displayComponent === 'userDetails'){
      return <UserDetails setDisplayComponent = { setDisplayComponent } />
    }else if (displayComponent === 'editBasicDetails'){
      return <EditBasicDetails setDisplayComponent = { setDisplayComponent } />
    }

  }

  useEffect(() =>{
      getUserProfile();
      
  }, [])

  return (
    <div>
      { changeComponent() }
      { ChangeUserDetailComponents() }
    </div>

  )
}

export default UserProfile






