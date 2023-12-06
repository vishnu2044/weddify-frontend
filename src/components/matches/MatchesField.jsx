import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import {AiOutlineHeart} from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { all } from 'axios';
import { baseUrl } from '../../Configure/urls';
import MactchContext from '../../context/MatchContext';
import DoubleCheckAlert from '../../alerts/DoubleCheckAlert';
import BlockUserAlert from '../../alerts/BlockUserAlert';


const MatchesField = ({getAllMatches, allMatch}) => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()
    let {likeUser, unlikeUser, blockUser} = useContext(MactchContext)
    let [blockUserPopUp, setBlockuserPopUp] = useState(false)
    let [matchName, setMatchName ] = useState('')
    let [matchProfileId, setMatchProfileId ] = useState('')

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
    
    
    
    const handleButtonManagement = async ({ match_id: matchId, button }) => {
        console.log("its working!!!!!!!!!!!!!!!!!")
        try {
            if (button === 'likeUser'){
                console.log("::::::::::::like the users!!!!!!!!!!!!!!!!!!!!!!")

                await likeUser({ match_id: matchId });
            }else if (button === 'unLikeUser'){
                console.log("unlike the users!!!!!!!!!!!!!!!!!!!!!!")
                await unlikeUser({ match_id: matchId });

            }else if(button === 'block'){
                await blockUser({ match_id: matchId })
            }
            
            await getAllMatches();  
        } catch (error) {
            console.error('Error handling unlike user or getting user', error);
        }
    }

    const ManageBlockPopUp = async ({name, matchId}) =>{
        if (blockUserPopUp === false){
            setBlockuserPopUp(true)
            setMatchName(name)
            setMatchProfileId(matchId)
        }else{
            setBlockuserPopUp(false)
            setMatchName('')
            setMatchProfileId('')
        }
    }

    useEffect(()=>{
        getAllMatches()
        checkProfileComplete()
        const currentPageAddress = window.location.pathname;
        console.log("current page address>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(currentPageAddress);

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
                            <img src={match?.profile_img ? `${baseUrl}${match.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="" className="w-full h-60 object-cover object-center bord cursor-pointer p-2 rounded-2xl" />
            
                            <h4 className="text-lg md:text-xl pt-2 font-bold">{match.first_name} {match.last_name}</h4>
                            <p className="text-sm font-semibold leading-6 md:leading-7 my-2 md:my-3 ">{match.age? `Age : ${match.age}` : ''}   </p>
                            <p className="text-sm leading-6 md:leading-7 my-2 md:my-3 font-semibold ">{match.occupation ? `Occupation : ${match.occupation} ` : ""}</p>
                            

                            <div className="flex flex-wrap justify-center bord cursor-pointer">
                                
                                <p onClick={()=> navigate("/home/matchprofile", {state : {matchId : match.id }} )} className="border border-gray-800  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 font-semibold rounded-lg">View</p>
                                
                                {match.like === true ? 
                                    <p onClick={()=>handleButtonManagement({match_id : match.id, button:'unLikeUser'})} className="bg-[#ff2525] text-white shadow-md py-2 px-2 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                    : 
                                    <p onClick={()=>handleButtonManagement({match_id : match.id, button:'likeUser'})} className="border border-gray-800 shadow-md py-2 px-2 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                }
                                <Link to={`/home/chatpage/${match.id}`} className='no-underline text-black'>
                                    <p className="bg-[#bcffd4]  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center border font-semibold border-gray-800"> Chat </p>
                                </Link>
                                <p onClick={()=> ManageBlockPopUp({name : `${match.first_name} ${match.last_name}`, matchId : match.id })}  className="border border-gray-800 bg-[#afc9e9] shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 font-semibold rounded-lg">Block</p>
                            </div>
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
        {
            blockUserPopUp && <BlockUserAlert matchProfileId={matchProfileId} ManageBlockPopUp={ManageBlockPopUp} handleButtonManagement={handleButtonManagement} matchName={matchName} />
        }
        
    </>



  )
}

export default MatchesField

