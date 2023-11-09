import React, { useContext, useEffect, useState } from 'react'
import UserPreferences from './UserPreferences'
import AuthContext from '../../../context/AuthContext'

import EditBasicPreferences from './EditBasicPreferences'
import { ErrorMessge } from '../../../alerts/UserAuthentication'
import EditProfessionalPreference from './EditProfessionalPreference'
import EditReligionalPreference from './EditReligiousPreference'

const Preferences = () => {
  const [component, setComponent] = useState('userPreferences')

  let {authTokens} = useContext(AuthContext)
  let [basicPreference , setBasicPreference] = useState([])
  let [professionalPreference, setProfessionalPreference] = useState([])
  let [religiounalPreference, setReligiounalPreference] = useState([])

  const getBasicPreferences = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/userpreferences/getbasicpreferences/',{
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
        alert('Unauthorized : not access!!!')
        console.log(response.status);
      }
      else{
        alert("an error occurrect");
        console.log(response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const getprofessionalpreference = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/userpreferences/getprofessionalpreferences/',{
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
        console.log(response.status);
      }
      else{
        alert("an error occurrect");
        console.log(response.status);
      }
    } catch (error) {
      ErrorMessge({message:"an error occurred"})
      console.error("An error occurred:", error);
    }
  }

  const getReligiounalPreference = async () =>{
    try{
      let response = await fetch('http://127.0.0.1:8000/userpreferences/getreligiouspreferences/',{
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
      }
      else{
        alert("an error occurrect religious preference get");
        console.log(response.status);
      }
    } catch (error) {
      ErrorMessge({message:"an error occurred"})
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
            <div className="container mx-auto py-8 bg-[#621a40] rounded-xl">
                <h2 className='text-center text-white pb-3'>Your preferences</h2>

                
                { changePreferenceComponent() }

            </div>
        </div>


    
    </>

  )
}

export default Preferences