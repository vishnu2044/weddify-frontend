import React, { useContext, useEffect, useState } from 'react'
import img_1 from '../../images/frontPage/fontPageImg01.jpg';
import {BiSolidUserCircle} from 'react-icons/bi';
import {ImProfile} from 'react-icons/im';
import {MdLocationPin, MdOutlineCastForEducation} from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Configure/urls';
import {AiOutlineHeart} from 'react-icons/ai';
import MactchContext from '../../context/MatchContext';

const MatchProfile = () => {
    const location = useLocation()
    const matchId = location.state.matchId
    let {authTokens, logoutUser} = useContext(AuthContext)
    let {likeUser, unlikeUser, blockUser, unblockMatch} = useContext(MactchContext)
    let [matchUser, setMatchUser] = useState(null)
    let [matchBasic, setMmatchBasic] = useState(null)
    let [matchProfession, setMatchProfession] = useState(null)
    let [matchReligion, setMatchReligion] = useState(null)
    let [matchProfile, setMatchProfile] = useState(null)
    
    let [matchLike, setMatchLike] = useState(false)
    let [matchBlock, setMatchBlock] = useState(false)
    let [blockPopUp, setBlockPopUp] = useState(false)

    let getMatchProfile = async () =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/getmatchprofile/${matchId}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                },
            });
            if (response.status === 200){
                let data = await response.json(); 
                setMatchUser(data.user)
                setMmatchBasic(data.basic)
                setMatchProfession(data.professional)
                setMatchReligion(data.religional)
                setMatchProfile(data.profile)
                setMatchLike(data.like)
                setMatchBlock(data.block)

            }else if (response.status === 401){
                ErrorMessge({message: "authentication failed!!"})
                logoutUser()
            }else{
                ErrorMessge({message: "An error comes get match profile!!"})
                console.log(response.status);
            }
        } catch (error) {
            console.error("An error occurred while get match profile:", error);
        }
    }
    const handleButtonManagement = async ({ match_id: matchId, button }) => {
        try {
            if (button === 'likeUser'){
                await likeUser({ match_id: matchId });
            }else if (button === 'unLikeUser'){
                await unlikeUser({ match_id: matchId });
            }else if (button === 'block'){
                await blockUser({ match_id: matchId });

            }else if (button === 'unblock'){
                await unblockMatch({ match_id: matchId });

            }
            
            await getMatchProfile();  
        } catch (error) {
            console.error('Error handling unlike user or getting user', error);
        }
    }
    

    useEffect(()=>{
        getMatchProfile()
    }, [])

  return (
    <div class="">
        <div class="mx-auto py-8">
            <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 bg-white shadow rounded-lg mx-5 border border-solid border-gray-700">
                <div class="col-span-4 sm:col-span-3">
                    <div class="p-6">
                        <div class="flex flex-col items-center">
                            <img src={matchProfile?.profile_img ? `${baseUrl}${matchProfile.profile_img}`:'https://i.pravatar.cc/150?img=32'} class="w-auto h-auto bg-gray-300 rounded-md shrink-0" />
                        </div>
                    </div>
                </div>
                <div class="col-span-4 sm:col-span-9">
                    <div class="p-6">
                        <h1 class="text-xl text-left font-bold">{matchUser?.first_name} {matchUser?.last_name}</h1>

                        <div class="grid grid-cols-2 gap-2 text-gray-600">
                            <div class="text-left pr-3">
                                <p class="flex items-center">
                                    <BiSolidUserCircle class="mr-2 text-blue-600" /> <strong>{matchBasic?.age} | "{matchBasic?.height}"</strong>
                                </p>
                                <p class="flex items-center">
                                    <ImProfile class="mr-2 text-orange-600" /> <strong>{matchReligion?.religion} ({matchReligion?.caste})</strong>
                                </p>
                                <p class="flex items-center">
                                    <MdLocationPin class="mr-2 text-green-600" /> <strong>{matchBasic?.location}</strong>
                                </p>
                                <p class="flex items-center">
                                    <MdOutlineCastForEducation class="mr-2 text-orange-600" /> <strong>{matchProfession?.education ? `${matchProfession?.education} |`: '' } {matchProfession?.occupation? `${matchProfession?.occupation}`: ''}</strong>
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 flex flex-wrap gap-2">

                            {
                                matchLike ?
                                (<p 
                                    onClick={()=>handleButtonManagement({match_id : matchUser.id, button:'unLikeUser'})} 
                                    className="bg-[#ff2525] text-white cursor-pointer shadow-md py-2 px-2 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>)
                                    :
                                (<p 
                                    onClick={()=>handleButtonManagement({match_id : matchUser.id, button:'likeUser'})}  
                                    className="  shadow-md py-2 px-2 md:py-2.5 cursor-pointer md:px-8 mx-2 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>)
                            }
                            {
                                matchBlock ?

                                (<p 
                                    onClick={()=>handleButtonManagement({match_id : matchUser.id, button:'unblock'})}
                                    className="bg-[#61809d] cursor-pointer text-white shadow-md py-2 px-4 md:py-2.5 md:px-8  rounded-lg justify-center"> Unblock </p>)
                                :
                                (<p 
                                    onClick={()=>handleButtonManagement({match_id : matchUser.id, button:'block'})}
                                    className="bg-[#4b6985] cursor-pointer text-white shadow-md py-2 px-4 md:py-2.5 md:px-8  rounded-lg justify-center"> Block </p>)
                            }
                            <Link to={`/home/chatpage/${matchUser?.id ? matchUser.id : null}`}  className='no-underline'>
                                <p className="bg-[#64b17f] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8  rounded-lg justify-center"> Chat </p>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="mb-4    ">
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 px-4 ">
                <div class="col-span-1 sm:col-span-6 gap-6 px-4">

                  <div class="bg-white shadow-xl rounded-2xl px-3 py-4 border border-solid border-gray-700">
                    <div className="flex justify-between items-center px-3 ">
                        <h3 className="text-xl  font-semibold text-[#a43f75]">{matchBasic?.gender === 'male' ? 'Him' : 'Her'} Basic Details</h3>
                        
                    </div>
                        <div class="mt-4 grid grid-cols-2 gap-2 text-gray-600  ">
                                    <div class="text-right pr-3">
                                        <p><strong>Age :</strong></p>
                                        <p><strong>Mother Tongue :</strong></p>
                                        <p><strong>Eating Habit :</strong></p>
                                        <p><strong>Drinking Habit :</strong></p>
                                        <p><strong>Smoking Habit :</strong></p>
                                        <p><strong>Martial Status :</strong></p>
                                        <p><strong>Physical Type :</strong></p>
                                        <p><strong>Physical Status :</strong></p>
                                        <p><strong>Location :</strong></p>
                                        <p><strong>Citizenship :</strong></p>
                                    </div>
                                    <div class="px-3">
                                        
                                        {matchBasic?.age ? <p>{matchBasic.age}</p> : <p> Not added yet</p>}
                                        {matchBasic?.mother_tongue ? <p>{matchBasic.mother_tongue}</p> : <p> Not added yet</p>}
                                        {matchBasic?.eating_habit ? <p>{matchBasic.eating_habit}</p> : <p> Not added yet</p>}
                                        {matchBasic?.drinking_habit ? <p>{matchBasic.drinking_habit}</p> : <p> Not added yet</p>}
                                        {matchBasic?.smoking_habit ? <p>{matchBasic.smoking_habit}</p> : <p> Not added yet</p>}
                                        {matchBasic?.martial_status ? <p>{matchBasic.martial_status}</p> : <p> Not added yet</p>}
                                        {matchBasic?.height||matchBasic?.body_type ? <p>{matchBasic?.height}  ({matchBasic?.body_type})</p> : <p> Not added yet</p> }
                                        {matchBasic?.physical_status ? <p>{matchBasic.physical_status}</p> : <p> Not added yet</p>}
                                        {matchBasic?.location ? <p>{matchBasic.location}</p> : <p> Not added yet</p>}
                                        {matchBasic?.citizenship ? <p>{matchBasic.citizenship}</p> : <p> Not added yet</p>}
 

                                    </div>
                                </div>
                        <hr class="my-6 border-t border-gray-300" />
                  </div>
                </div>

                <div class="col-span-1 sm:col-span-6 gap-6 px-4">
                    <div class="bg-white shadow-xl rounded-2xl p-6 border border-solid border-gray-700">

                      <div className="flex justify-between items-center px-3 mb-3 ">
                          <h3 className="text-xl  font-semibold text-[#a43f75]"> {matchBasic?.gender === 'male' ? 'Him' : 'Her'} Professional Details</h3>
                      </div>
                      <div class=" grid grid-cols-2 gap-2 text-gray-600 ">
                                    <div class="text-right pr-3">
                                        <p><strong>Education :</strong></p>
                                        <p><strong>College :</strong></p>
                                        <p><strong>Working Sector :</strong></p>
                                        <p><strong>Income (LPA) :</strong></p>
                                        <p><strong>Occupation :</strong></p>
                                        <p><strong>Organization :</strong></p>
                                    </div>
                                    <div class="px-3">
                                        {matchProfession?.education ? <p>{matchProfession.education}</p> : <p> Not added yet</p> }
                                        {matchProfession?.college ? <p>{matchProfession.college}</p> : <p> Not added yet</p> }
                                        {matchProfession?.working_sector ? <p>{matchProfession.working_sector}</p> : <p> Not added yet</p> }
                                        {matchProfession?.income ? <p>{matchProfession.income}</p> : <p> Not added yet</p> }
                                        {matchProfession?.occupation ? <p>{matchProfession.occupation}</p> : <p> Not added yet</p> }
                                        {matchProfession?.organization ? <p>{matchProfession.organization}</p> : <p> Not added yet</p> }


   
                                    </div>
                                </div>
                    </div>

                    <div class="bg-white shadow-xl rounded-2xl mt-2 p-6 border border-solid border-gray-700 ">

                      <div className="flex justify-between items-center px-3 mb-2">
                          <h3 className="text-xl  font-semibold text-[#a43f75]">{matchBasic?.gender === 'male' ? 'Him' : 'Her'} Religional Details</h3>
                      </div>
                      <div class=" grid grid-cols-2 gap-2 text-gray-600 ">
                                    <div class="text-right pr-3">
                                        <p><strong>Religion :</strong></p>
                                        <p><strong>Caste :</strong></p>
                                        <p><strong>Star :</strong></p>

                                    </div>
                                    <div class="px-3">

                                    {matchReligion?.religion ? <p>{matchReligion.religion}</p> : <p> Not added yet</p> }
                                    {matchReligion?.caste ? <p>{matchReligion.caste}</p> : <p> Not added yet</p> }
                                    {matchReligion?.star ? <p>{matchReligion.star}</p> : <p> Not added yet</p> }



                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>

        

    </div>

  )
}

export default MatchProfile