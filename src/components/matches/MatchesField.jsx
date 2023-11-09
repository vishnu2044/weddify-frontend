import React, { useContext, useEffect, useState } from 'react';
import img_03 from '../../images/frontPage/fontPageImg01.jpg';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import {AiOutlineHeart} from 'react-icons/ai';
import {BsChatRight} from 'react-icons/bs';
import MatchProfile from './MatchProfile';
import { useNavigate, Link } from 'react-router-dom';

const MatchesField = () => {
    let [allMatch, setAllMatch] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()

    const getAllMatches = async () =>{
        try{
            let response = await fetch("http://127.0.0.1:8000/preferedmatches/getallmatches/",{
                method: "GET",
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                }
            });
            if (response.status=== 200){
                let data = await response.json();
                setAllMatch(data);
                console.log(data)
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

    useEffect(()=>{
        getAllMatches()
    }, [])

  return (

    <div className="flex flex-wrap  mt-4">
        {
            allMatch.map((match) => (

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 ">
                    <div className="bg-[#ffffff] border-x  rounded-xl text-center shadow-md border border-solid border-gray-700">
                        <img src={match?.profile_img ? `http://127.0.0.1:8000/${match.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="" className="w-full h-60 object-cover object-center bord cursor-pointer p-2 rounded-2xl" />
        
                        <h4 className="text-lg md:text-xl pt-2 font-bold">{match.first_name} {match.last_name}</h4>
                        <p className="text-sm font-semibold leading-6 md:leading-7 my-2 md:my-3 ">{match.age? `Age : ${match.age}` : ''}   </p>
                        <p className="text-sm leading-6 md:leading-7 my-2 md:my-3 font-semibold ">{match.occupation ? `Occupation : ${match.occupation} ` : ""}</p>
                        

                        <div className="flex flex-wrap justify-center bord cursor-pointer">
                            {/* <Link to='matchprofile'> */}
                                <p onClick={()=> navigate("/home/matchprofile", {state : {matchId : match.id }} )} className="bg-[#6471b1] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8 mx-2 rounded-lg ">View</p>
                            {/* </Link> */}
                            <p className="bg-[#ff2525] text-white shadow-md py-2 px-2 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> <AiOutlineHeart className='text-2xl'/> </p>
                            <p className="bg-[#64b17f] text-white shadow-md py-2 px-4 md:py-2.5 md:px-8 mx-2 rounded-lg justify-center"> Chat </p>
                        </div>
                        <p className="text-sm leading-6 md:leading-7 my-2 md:my-3 font-medium text-left ">Don't like {match.gender === 'male' ? 'Him' : 'Her'} ?</p>
                        <p className="bg-[#c4c3c3] bord cursor-pointer py-2 px-6 md:py-2.5 md:px-8 mx-2 rounded-lg shadow-md border border-solid border-gray-700">Remove</p>
        
                    </div>
                </div>  

            ))
        }  
</div>



  )
}

export default MatchesField