import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import {AiOutlineHeart} from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { all } from 'axios';



const MatchesField = ({getAllMatches, allMatch}) => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()


    const checkProfileComplete = async () =>{
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
            
          }else if (response.status === 400){
            ErrorMessge({message: "complete your profile to to get your matches"})
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
    

      
      let blockUser = async ({match_id}) =>{
          try{
              let response = await fetch(`http://127.0.0.1:8000/preferedmatches/blockuser/${match_id}/`, {
                  method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },     
            });
            if (response.ok) {
                console.log('User blocked successfully');
                getAllMatches()
            } else {
                console.error('Failed to block user');
            }
        } catch (error) {
            console.error('Error blocking user', error);
        }
    }
    
    let likeUser = async ({match_id}) =>{
        try{
            let response = await fetch(`http://127.0.0.1:8000/preferedmatches/like_match/${match_id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.ok) {
                console.log('liked the profile successfully')
                getAllMatches()
                
            } else {
                console.error('like option failed!');
            }
        } catch (error) {
            console.error('Error blocking user', error);
        }
    }
    
    let unlikeUser = async ({match_id}) =>{
        try{
            let response = await fetch(`http://127.0.0.1:8000/preferedmatches/unlike_match/${match_id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.ok) {
                console.log('liked the profile successfully')
                getAllMatches()
                
            } else {
                console.error('like option failed!');
            }
        } catch (error) {
            console.error('Error blocking user', error);
        }
    }



    

    useEffect(()=>{
        getAllMatches()
        checkProfileComplete()
    }, [])

  return (
    <>

        {
            allMatch.length >0 ?
        <div className="flex flex-wrap  mt-3 ">
            { 
                allMatch.map((match) => (

                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 ">
                        <div className="bg-[#ffffff] border-x  rounded-xl text-center shadow-md border border-solid border-gray-700">
                            <img src={match?.profile_img ? `http://127.0.0.1:8000${match.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="" className="w-full h-60 object-cover object-center bord cursor-pointer p-2 rounded-2xl" />
            
                            <h4 className="text-lg md:text-xl pt-2 font-bold">{match.first_name} {match.last_name}</h4>
                            <p className="text-sm font-semibold leading-6 md:leading-7 my-2 md:my-3 ">{match.age? `Age : ${match.age}` : ''}   </p>
                            <p className="text-sm leading-6 md:leading-7 my-2 md:my-3 font-semibold ">{match.occupation ? `Occupation : ${match.occupation} ` : ""}</p>
                            

                            <div className="flex flex-wrap justify-center bord cursor-pointer">
                                
                                    <p onClick={()=> navigate("/home/matchprofile", {state : {matchId : match.id }} )} className="bg-[#6471b1] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8 mx-2 rounded-lg ">View</p>
                                
                                {match.like === true ? 
                                    <p onClick={()=>unlikeUser({match_id : match.id})} className="bg-[#ff2525] text-white shadow-md py-2 px-2 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                                            : 
                                    <p onClick={()=>likeUser({match_id : match.id})} className="bg-[#6471b1] text-white shadow-md py-2 px-2 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                }
                                <Link to={`/home/chatpage/${match.id}`}>
                                    <p className="bg-[#64b17f] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> Chat </p>
                                </Link>
                            </div>
                            <p className="text-sm leading-6 md:leading-7 my-2 mx-2 md:my-3 font-medium text-left ">Don't like {match.gender === 'male' ? 'Him' : 'Her'} ?</p>
                            <p onClick={()=>blockUser({match_id : match.id})} className="bg-[#c4c3c3] bord cursor-pointer py-2 px-6 md:py-2.5 md:px-8 mx-2 rounded-lg shadow-md ">Block</p>
            
                        </div>
                    </div>  

                )) 
            }  
        </div>
        :
                <div class="p-1 mt-10">
                <div class="bg-white w-1/2 mx-auto p-4 rounded-md shadow-lg ">
                    <h1 class="text-2xl font-bold text-[#6471b1] mb-4 text-center">Sorry ! No data available</h1>
                    <p class="text-gray-700 mb-4 text-center">Reset your filter</p>
            
                    <div class=" text-center">
                        <p  onClick={()=>window.location.reload()}
                            class="inline-block cursor-pointer bg-[#6471b1] py-2 px-4 text-white rounded-md font-semibold uppercase text-sm ">Ok
                        </p>
                    </div>
                </div>
            </div>
        }
    
    </>



  )
}

export default MatchesField