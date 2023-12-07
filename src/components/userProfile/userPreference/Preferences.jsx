import React, { useContext, useEffect, useState } from 'react'
import UserPreferences from './UserPreferences'
import AuthContext from '../../../context/AuthContext'

import EditBasicPreferences from './EditBasicPreferences'
import { ErrorMessge } from '../../../alerts/UserAuthentication'
import EditProfessionalPreference from './EditProfessionalPreference'
import EditReligionalPreference from './EditReligiousPreference'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../Configure/urls'

const Preferences = () => {
  const [component, setComponent] = useState('userPreferences')

  let {authTokens, logoutUser} = useContext(AuthContext)
  let [basicPreference , setBasicPreference] = useState([])
  let [professionalPreference, setProfessionalPreference] = useState([])
  let [religiounalPreference, setReligiounalPreference] = useState([])
  const navigate = useNavigate()

  const getBasicPreferences = async () =>{
    try{
      let response = await fetch(`${baseUrl}/userpreferences/getbasicpreferences/`,{
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access, 
      }
      });

      if (response.status === 200){
        let data = await response.json()
        setBasicPreference(data)
      }
      else if (response.status === 401){
        ErrorMessge({message: "Unauthorized : not access"})
        logoutUser()
        console.log(response.status);
      }
      else if (response.status === 400){
        ErrorMessge({message: "didnt added basic preferences"})
        navigate("/home/userprofile")
      }
      else{
        console.log("didnt get the basic preference details!!!")
        console.log(response.status);
      }
    } catch (error) {
      console.error("An error occurred while basic preference:", error);
    }
  }

  const getprofessionalpreference = async () =>{
    try{
      let response = await fetch(`${baseUrl}/userpreferences/getprofessionalpreferences/`,{
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access, 
      }
      });

      if (response.status === 200){
        let data = await response.json()
        setProfessionalPreference(data)
      }
      else if (response.status === 401){
        alert('Unauthorized : not access!!!')
        logoutUser()
        console.log(response.status);
      }else if (response.status === 400){
        console.log("please add basic preference !!!")
        navigate("/home/userprofile")
        
        console.log(response.status);
      }else{
        alert("an error occurrence while professional preference");
        console.log(response.status);
      }
    } catch (error) {
      ErrorMessge({message:"an error occurred while get professional preference"})
      console.error("An error occurred:", error);
    }
  }

  const getReligiounalPreference = async () =>{
    try{
      let response = await fetch(`${baseUrl}/userpreferences/getreligiouspreferences/`,{
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authTokens.access, 
      }
      });

      if (response.status === 200){
        let data = await response.json()
        setReligiounalPreference(data)
      }
      else if (response.status === 401){
        alert('Unauthorized : not access!!!')
        console.log(response.status);
        logoutUser()
      }
      else if (response.status === 400){
        console.log("didnt get the religional preference details!!!")
        navigate("/home/userprofile")
        console.log(response.status);
      }
      else{
        alert("an error occurrect religious preference get");
        console.log(response.status);
      }
    } catch (error) {
      ErrorMessge({message:"an error occurred while religional preference"})
      console.error("An error occurred:", error);
    }
  }

  const changePreferenceComponent = () =>{
    if (component === 'userPreferences'){
      return <UserPreferences 
          basicPreferences={basicPreference}  
          setComponent = {setComponent}
          professionalPreference = {professionalPreference}
          religiounalPreference = {religiounalPreference}
      />

    }else if (component === 'editBasicPreference'){
    return <EditBasicPreferences 
        basicPreference={basicPreference} 
        setComponent = {setComponent} 
      />
    }else if (component === 'editProfessionalPreference'){
      return <EditProfessionalPreference 
      setComponent = {setComponent}
      professionalPreference = {professionalPreference}
      />
    }else if (component === 'editreligionalpreference'){
      return <EditReligionalPreference religiounalPreference={religiounalPreference} setComponent={setComponent}  />
    }
      
    
}

  useEffect(()=>{
    getBasicPreferences()
    getprofessionalpreference()
    getReligiounalPreference()

  }, [])
  return (
    <>
    

        <div className="bg-gray-100 mt-3 mb-4">
            <div className="container mx-auto py-8 bg-[#375779] rounded-xl">
                <h2 className='text-center text-white pb-3'>Your preferences</h2>

                
                { changePreferenceComponent() }

            </div>
        </div>


    
    </>

  )
}

export default Preferences