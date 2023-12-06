import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { ErrorMessge } from '../../../alerts/UserAuthentication'
import { useNavigate } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai';
import { baseUrl } from '../../../Configure/urls';

    const LocationPreference = () => {
        let {authTokens, logoutUser} = useContext(AuthContext)
        let [matches, setMatches] = useState([]);
        let [allMatches, setAllMatches] = useState([]);
        const navigate = useNavigate()

        const getMatchesLocationsBased = async () =>{
            try{
                let response = await fetch(`${baseUrl}/preferedmatches/getmatcheslocationbased/`,{
                    method: "GET",
                    headers :{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authTokens.access, 
                    }
                });
                if (response.status=== 200){
                    let data = await response.json();
                    setMatches(data);
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>::::::::::::::',data)
                    console.log("mathces>>>>>>>>>>>>>>>>>>>>>>>>>",data)
                }else if (response.status === 401){
                    logoutUser()
                    ErrorMessge({message:"unauthorized : not success"})
                    console.log(response.status);
                }else if (response.status === 400){
                    ErrorMessge({message:"complete your profile"})
                    navigate("/home/userprofile")
                }else{
                    ErrorMessge({message: "and error comes!!"})
                    console.log(response.status)
                }
                
            }catch (error) {
                console.error("An error occurred:", error);
            }
        }

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
                    setAllMatches(data);
                    console.log("All mathces >>>>>>>>>>>>>>>>>", data)
                    console.log(data)
                }else if (response.status === 401){
                    logoutUser()
                    ErrorMessge({message:"unauthorized : not success"})
                    console.log(response.status);
                }
                else if (response.status === 400){
                    ErrorMessge({message:"error get while get matches"})
                    console.log(response.status);
                }else{
                    ErrorMessge({message: "and error comes!!"})
                    console.log(response.status)
                }
                
            }catch (error) {
                console.error("An error occurred:", error);
            }
        }

        useEffect(()=>{
            getMatchesLocationsBased()
            getAllMatches()
        }, [])
        
    return (
        <div>
        <div className="py-4 bg-white">
            <div className="max-w-screen mx-auto px-0 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between">
            {matches ? (
                <div className="sm:w-6/12 order-last sm:order-first sm:rounded-tl-md sm:rounded-bl-md bg-[#EFF6FE] text-center  border-solid border-r-0 border-gray-700">
                <div className="flex justify-between items-center px-3">
                    <p className="text-[#621a40] font-semibold text-md pt-2 px-5">Based on your location</p>
                    <p className="cursor-pointer px-5 text-orange-700">See all</p>
                </div>
                {matches.length > 1 ? (
                    <ul className="grid grid-cols-3 col-gap-5 row-gap-5 py-0 md:col-gap-5 md:row-gap-10">
                    {matches.slice(0, 3).map((match) => (
                        <li className="p-2 text-center" key={match.id}>
                        <div className="flex flex-col w-auto items-center rounded-md bg-white mx-4 shadow-md">
                            <div className="flex-shrink-0 bg-white">
                            <img
                                onClick={() => navigate("/home/matchprofile", { state: { matchId: match.id } })}
                                className="mb-2  mx-auto rounded-md h-32 w-screen cursor-pointer"
                                src={match?.profile_img ? `${baseUrl}${match.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
                                alt="User Avatar"
                            />
                            </div>
                            <div className="text-center">
                            <h4 className="text-lg leading-6 font-semibold text-gray-900 transition duration-500 ease-in-out">
                                <p className="hover:text-indigo-600 transition duration-500 ease-in-out">
                                {match?.first_name} {match?.last_name}
                                </p>
                            </h4>
                            <p className="text-sm text-gray-500">
                                {match?.age} Yrs, <span className='font-semibold text-black'>{match?.education}</span>
                            </p>
                            </div>
                            <div className="flex flex-wrap justify-center bord cursor-pointer">
                                
                                <p onClick={() => navigate("/home/matchprofile", { state: { matchId: match.id } })} className="border border-gray-800 bg-[#EFF6FE]  shadow-md py-2 px-5 md:py-2.5 md:px-8 mx-1 rounded-lg ">View</p>            
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div className='pt-4 mt-4'>
                    <p>No matches available at your location </p>
                    <p
                        onClick={() => navigate('/home/matches')}
                        className='bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white py-2 p-2 mx-4 rounded'
                    >
                        Find matches
                    </p>
                    </div>
                )}
                </div>
            ) : (
                <div></div>
            )}

            {allMatches ? (
                <div className="sm:w-6/12 order-last sm:order-first bg-[#EFF6FE] sm:rounded-br-md sm:rounded-tr-md text-center  border-solid border-r-0 border-gray-700">
                <div className="flex justify-between items-center px-3">
                    <p className="text-[#621a40] font-semibold text-md pt-2 px-5">All matches</p>
                    <p className="cursor-pointer px-5 text-orange-700">See all</p>
                </div>
                <ul className="grid grid-cols-3 col-gap-5 row-gap-5 py-0 md:col-gap-5 md:row-gap-10">
                    {allMatches.slice(0, 3).map((match) => (
                        <li className="p-2 text-center" key={match.id}>
                        <div className="flex flex-col w-auto items-center rounded-md bg-white mx-4 shadow-md">
                            <div className="flex-shrink-0 bg-white">
                            <img
                                onClick={() => navigate("/home/matchprofile", { state: { matchId: match.id } })}
                                className="mb-2  mx-auto rounded-md h-32 w-screen cursor-pointer"
                                src={match?.profile_img ? `${baseUrl}${match.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
                                alt="User Avatar"
                            />
                            </div>
                            <div className="text-center">
                            <h4 className="text-lg leading-6 font-semibold text-gray-900 transition duration-500 ease-in-out">
                                <p className="hover:text-indigo-600 transition duration-500 ease-in-out">
                                {match?.first_name} {match?.last_name}
                                </p>
                            </h4>
                            <p className="text-sm text-gray-500">
                                {match?.age} Yrs, <span className='font-semibold text-black'>{match?.education}</span>
                            </p>
                            </div>
                            <div className="flex flex-wrap justify-center bord cursor-pointer">
                                
                                <p onClick={() => navigate("/home/matchprofile", { state: { matchId: match.id } })} className="border border-gray-800 bg-[#EFF6FE] shadow-md py-2 px-5 md:py-2.5 md:px-8 mx-1 rounded-lg ">View</p>            
                            </div>
                        </div>
                        </li>
                    ))}
                </ul>
                </div>
            ) : (
                <p></p>
            )}
            </div>
        </div>
        </div>

  )
}

export default LocationPreference