import React, {useState} from 'react'
import FilterBar from '../../components/matches/FilterBar'
import MatchesField from '../../components/matches/MatchesField';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { baseUrl } from '../../Configure/urls';

const AllMatches = () => {
  let [allMatch, setAllMatch] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)

  const openPopup = () =>{
    if(isPopUpOpen === false){
      setIsPopUpOpen(true)
    }else{
      setIsPopUpOpen(false)
    }
  };

  const getAllMatches = async () =>{
    try{
        let response = await fetch(`${baseUrl}/preferedmatches/getallmatches/`,{
            method: "GET",
            headers :{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authTokens.access, 
            }
        });
        if (response.status=== 200){
            let data = await response.json();
            setAllMatch(data);
            console.log("all data :::::::::::::::::::::::::::",data)
        }else if (response.status === 401){
            logoutUser()
            ErrorMessge({message:"unauthorized : not success"})
            console.log(response.status);
        }else{
            ErrorMessge({message: "and error comes!!"})
            console.log(response.status)
        }
    }catch (error) {
        console.error("An error occurred:", error);
    }
}

let submitFilterData = async(e) =>{
  e.preventDefault();
  if (e.target.age_from.value < 18){
      ErrorMessge({message: "the minimum age should be greater than 18"})

  }else{
      let formData = new FormData();
      formData.append('age_from', e.target.age_from.value)
      formData.append('age_to', e.target.age_to.value)
      formData.append('martial_status', e.target.martial_status.value)
      formData.append('location', e.target.location.value)
      formData.append('working_sector', e.target.working_sector.value)
      formData.append('religion', e.target.religion.value)
      formData.append('caste', e.target.caste.value)
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",formData)

      try{
          let response = await fetch(`${baseUrl}/preferedmatches/filtering_matches/`, {
              method : "PATCH",
              headers : {
                  'Authorization' : 'Bearer ' + String(authTokens.access)
              },
              body: formData
          })
          
          if (response.ok){
              ErrorMessge({message:"filter data passed successfully"})
              openPopup()
              let data = await response.json()
              setAllMatch(data)
              console.log("return data :::::::::::::::::::::::",data)
          }else if (response.status === 400){
              const data = await response.json();
              if (data.error) {
                ErrorMessge({ message: data.error });
              } else {
                ErrorMessge({ message: "An error occurred" });
              }
          }else if (response.status === 401){
              ErrorMessge({message : "authorization failed loggigng out"})
              logoutUser()
          }else {
              ErrorMessge({message : "Error message"})
          }

      } catch (error) {
          console.error("An error occurred !!!!!!", error);
          ErrorMessge({ message: "An error occurred" });
      }
      
  }

}




let matchSearch = async(e) =>{
  e.preventDefault()
  let formData = new FormData
  formData.append('search_match', e.target.search_match.value)

  try{
    let response = await fetch(`${baseUrl}/preferedmatches/search_matches/`,{
      method: "PATCH",
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access),
      },
      body: formData
    })
    if (response.ok){
      let data = await response.json()
      setAllMatch(data)

    }else if (response.status === 400) {
      const data = await response.json();
      if (data.error) {
        ErrorMessge({ message: data.error });
      } else {
        ErrorMessge({ message: "An error occurred" });
      }

    }else if (response.status === 401) {
      logoutUser();

    }else {
        ErrorMessge({ message: "Error message" });
    }

  } catch (error) {
    console.error("An error occurred !!!!!!", error);
    ErrorMessge({ message: "An error occurred" });
  }

}

  return (
    <>
      <FilterBar submitFilterData={submitFilterData} matchSearch={matchSearch} openPopup={openPopup} isPopUpOpen={isPopUpOpen}/>
      <MatchesField getAllMatches={getAllMatches} allMatch={allMatch}/>
    </>
  )
}

export default AllMatches