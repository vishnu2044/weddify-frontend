import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import { Link } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai';
import { baseUrl } from '../../../Configure/urls';
import MactchContext from '../../../context/MatchContext';

const NewMatches = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [matches, SetMatches] = useState([])
    const navigate = useNavigate()
    let {likeUser, unlikeUser} = useContext(MactchContext)

    const getNewMatches = async () =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/newmatches/`,{
                method: "GET",
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                }
            });
            if (response.status === 200){
                let data = await response.json();
                SetMatches(data)

                console.log("new matches data :::::::::::::::::::",data);
            }else if (response.status === 401){
                ErrorMessge({message: "unauthorized : not success !!"})
                logoutUser()
            }else {
                ErrorMessge({message: "an error occurred while get new matches !!!!"})
                console.log(response.status)
            }
        }catch (error) {
            console.error("An error occurred while get new matches ", error);
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
            // If unlikeUser is successful, call getUser
            await getNewMatches();  // You might need to pass any required parameters to getUser
        } catch (error) {
            console.error('Error handling unlike user or getting user', error);
        }
    }

    useEffect(()=>{
        getNewMatches()
    }, [])
  return (
    <>
    
    {
        matches.length >= 3 ? 
    <div className=" h-auto mb-4 mt-8">
        <div className="py-2 w-screen mx-auto bg-[#ffffff] px-16 ">
            <div className="flex justify-between">
                <p className=" text-lg font-medium leading-7 font-regular">
                    New Matches
                </p>
                <p>see more</p>
            </div>


            <div className="grid grid-cols-4 col-gap-10">

                {
                    matches.slice(0, 4).map((m)=>(
                        <div className="text-center m-4 border border-gray-800 rounded-md shadow-sm">
                            <img 
                                className=" h-60 w-100 rounded-tl-md rounded-tr-md object-cover object-center border border-solid border-gray-700 cursor-pointer" 
                                src={m?.profile_img ? `${baseUrl}${m.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
                                onClick={() => navigate("/home/matchprofile", { state: { matchId: m.id } })}
                                alt="Profile"
                            />
                            <div className="p-3 text-center">
                                <div className="text-md cursor-pointer">
                                    <p className=" text-gray-900  font-semibold">
                                        {m.first_name} {m.last_name}
                                    </p>
                                    <p className="text-gray-500 uppercase text-sm">{m.occupation}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center bord cursor-pointer">
                                
                                <p onClick={()=> navigate("/home/matchprofile", {state : {matchId : m.id }} )} className="border border-gray-800  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg ">View</p>
                                        
                                {
                                    m.like ? 
                                    (
                                        <p onClick={()=>handlelikeManagement({match_id : m.id, button:'unLikeUser'})} className="border border-gray-800 bg-red-500 shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                        
                                    )  : (

                                        <p onClick={()=>handlelikeManagement({match_id : m.id, button:'likeUser'})} className="border border-gray-800  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                                    )
                                }


            
                                <Link className='no-underline text-black' to={`/home/chatpage/${m.id}`}>
                                    <p className=" bg-[#bcffd4]  shadow-md py-2 px-3 md:py-2.5 md:px-8 mx-1 rounded-lg justify-center border border-gray-800"> Chat </p>
                                </Link>
                            </div>
                        </div>

                    ))
                }

            </div>

        </div>  
    
    </div>
    : <p></p>
}
    </>
  )
}

export default NewMatches