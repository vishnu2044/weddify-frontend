import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Configure/urls";
import AuthContext from "./AuthContext";
import { ErrorMessge } from "../alerts/UserAuthentication";
import { ErrorAlert } from "../alerts/ErrorAlert";




const MactchContext = createContext()
export default MactchContext

export const MatchProvider =  ({children}) =>{

    const navigate = useNavigate
    const {authTokens, logoutUser} = useContext(AuthContext)



    let likeUser = async ({match_id}) =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/like_match/${match_id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.ok) {
                console.log('liked the profile successfully')
                
            } else {
                console.error('like option failed!');
            }
        } catch (error) {
            console.error('Error blocking user', error);
        }
    }
    
    let unlikeUser = async ({ match_id }) =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/unlike_match/${match_id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.ok) {
                console.log('liked the profile successfully')

            } else {
                console.error('like option failed!');
            }
        } catch (error) {
            console.error('Error blocking user', error);
        }
    }

    let blockUser = async ({match_id}) =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/blockuser/${match_id}/`, {
                method: "PATCH",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authTokens.access}`,
                },     
            });
            if (response.ok) {
              console.log('User blocked successfully');
              console.log('User blocked successfully');
              console.log('User blocked successfully');
            } else {
              console.error('Failed to block user');
            }
        } catch (error) {
          console.error('Error blocking user', error);
        }
    }

  const unblockMatch = async ( {match_id}) => {
      try {
          console.log('the match id is', match_id);
          let response = await fetch(`${baseUrl}/userprofile/unblock_match/${match_id}/`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${authTokens.access}`,
              },
          });
  
          if (response.ok) {
              console.log('User unblocked successfully');
          } else {
              console.error('Failed to unblock user');
              console.error(response.status);
          }
      } catch (error) {
          console.error('Error unblocking user', error);
      }
  };

  const checkProfileComplete = async () =>{
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
        ErrorAlert({message: "complete your profile to to get your matches"})
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



    

    let contextData = {
        likeUser: likeUser,
        unlikeUser : unlikeUser,
        blockUser : blockUser,
        unblockMatch : unblockMatch,
        checkProfileComplete : checkProfileComplete,
    }

    return (
        <MactchContext.Provider value={contextData}>
            {children}
        </MactchContext.Provider>
    )

}