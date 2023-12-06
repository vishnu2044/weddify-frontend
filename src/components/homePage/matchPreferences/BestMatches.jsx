import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai';
import { baseUrl } from '../../../Configure/urls';
import AuthContext from '../../../context/AuthContext';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import MactchContext from '../../../context/MatchContext';


const BestMatches = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [preferedMatchData, setPreferedMatchData] = useState([])
    const navigate = useNavigate()
    let  {unlikeUser, likeUser} = useContext(MactchContext)

    const getPreferedMatches = async() =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/get_matches_by_preference/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                },
            })
            if (response.status === 200){
                let data = await response.json()
                setPreferedMatchData(data)
            }else if (response.status === 400){
                ErrorMessge({message : 'error get while updating the prefered matches'})

            }else if (response.status === 401){
                ErrorMessge({message : "Unauthorized!"})
                logoutUser()
            }


        }catch (error){
          console.error("error ::", error)
        }
    }

    const handlelikeManagement = async ({ match_id: matchId, button }) => {
        console.log("its working!!!!!!!!!!!!!!!!!")
        try {
            if (button === 'likeUser'){
                console.log("::::::::::::like the users!!!!!!!!!!!!!!!!!!!!!!")

                await likeUser({ match_id: matchId });
            }else if (button === 'unLikeUser'){
                console.log("unlike the users!!!!!!!!!!!!!!!!!!!!!!")
                await unlikeUser({ match_id: matchId });

            }
            
            await getPreferedMatches();  
        } catch (error) {
            console.error('Error handling unlike user or getting user', error);
        }
    }

    useEffect(()=>{
        getPreferedMatches()
    }, [])
  return (
<div class="px-10 w-screen-lg mx-auto">
    <div class="text-center mb-4">
        <p class="mt-4 text-sm leading-7 text-gray-500 font-regular">
            THE PERFECT MATCH FOR YOU
        </p>
        <p class="mt-4 text-lg leading-7  font-semibold">
            The matches according to your Preferences
        </p>

    </div>

    <div class="sm:grid grid-cols-3 gap-6">
        {
            preferedMatchData.slice(0,3).map((match)=>(

                <div class="max-w-sm w-full lg:max-w-full lg:flex mx-auto my-4 border border-gray-950 shadow-sm rounded-md">
                    <div
                        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-tl-md rounded-bl-md text-center overflow-hidden"
                        style={{
                            backgroundImage: `url(${match.profile_img ? `${baseUrl}${match.profile_img}` : 'https://i.pravatar.cc/150?img=32'})`
                        }}
                        title="Woman holding a mug"
                    >
                    </div>


                    <div
                        class="border-r border-b border-l border-gray-600 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
                        <div class="">
                            <p
                                class="text-gray-900 font-bold text-xl mb-2 hover:text-indigo-600 transition duration-500 ease-in-out">
                                {match.first_name} {match.last_name}</p>
                            <p class="text-sm text-gray-600">
                                {match.occupation}
                            </p>
                            <p class="text-gray-500 text-base mt-4">age: {match.age}</p>
                            <p class="text-gray-500 text-base">{match.location}</p>

                        </div>
                        
                        <div className="flex flex-wrap justify-center bord cursor-pointer">
                                        
                            <p  
                                onClick={()=> navigate("/home/matchprofile", {state : {matchId : match.id }} )}
                                className="border border-gray-800  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg ">
                                    View
                            </p>
                                    
                            {
                                match.like ? (
                                    <p onClick={()=>handlelikeManagement({match_id : match.id, button:'unLikeUser'})}  className="border border-gray-800 bg-red-500 shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                    ) :
                                    (

                                        <p onClick={()=>handlelikeManagement({match_id : match.id, button:'likeUser'})} className="border border-gray-800 shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                    )
                            }

                            <Link className='no-underline text-black' to={`/home/chatpage/${match.id}`}>
                                <p className=" bg-[#bcffd4]  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center border border-gray-800"> Chat </p>
                            </Link>
                        </div>

                    </div>

                </div>
            ))
        }

    </div>

</div>
  )
}

export default BestMatches