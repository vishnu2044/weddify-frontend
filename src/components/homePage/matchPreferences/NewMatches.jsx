import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ErrorMessge } from '../../../alerts/UserAuthentication'

const NewMatches = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    let [matches, SetMatches] = useState([])
    const navigate = useNavigate()

    const getNewMatches = async () =>{
        try{
            let response = await fetch('http://127.0.0.1:8000/preferedmatches/newmatches/',{
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
                ErrorMessge({message: "an error occurred !!!!"})
                console.log(response.status)
            }
        }catch (error) {
            console.error("An error occurred:", error);
        }
    }

    useEffect(()=>{
        getNewMatches()
    }, [])
  return (
<div className=" h-screen">
    {
        matches.length > 3 ? 
    <div className="py-2 max-w-screen-xl mx-auto px-3 bg-[#EFF6FE] shadow-md rounded-md border border-solid border-gray-700">
        <div className="flex justify-between">
            <p className=" text-lg font-medium leading-7 text-[#621a40] font-regular">
                New Matches
            </p>
            <p>see more</p>
        </div>


        <div className="grid grid-cols-3 col-gap-10">

            {
                matches.slice(0, 3).map((m)=>(
                    <div className="text-center m-4">
                        <img 
                            className=" h-60 w-100 rounded-md object-cover object-center border border-solid border-gray-700 cursor-pointer" 
                            src={m?.profile_img ? `http://127.0.0.1:8000/${m.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
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
                    </div>

                ))
            }

        </div>

    </div>  : <p></p>
    }

</div>
  )
}

export default NewMatches