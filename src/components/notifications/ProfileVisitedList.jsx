import React from 'react';
import { baseUrl } from '../../Configure/urls';

const ProfileVisitedList = ({profileVisitedMatches}) => {
  return (
    <div className='container justify-center'>
        <div className="w-3/4 mx-auto borde rounded-md shadow-md   h-96 overflow-y-auto">

            <div className="py-2 justify-center px-3  mx-auto border-gray-400">
                {
                    profileVisitedMatches.map((match)=>(

                    <div className="p-3 my-1 flex items-center w-full bg-[#EFF6FE] justify-between cursor-pointer rounded-md hover:bg-[#c5ddf9]">
                        <div className="flex items-center">
                            <img className="rounded-full h-14 w-14" src={match?.profile_img ? `${baseUrl}${match.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"} />
                            <div className="ml-3 flex flex-col">
                            <div className="leading-snug text-sm text-gray-900 font-bold mx-5">{match.first_name} {match.last_name}</div>
                            <div className="leading-snug text-xs text-gray-600 mx-5">{match.visited_time}</div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <p className="h-7 mt-3 px-3 text-md font-semibold text-white mx-2 bg-[#64b17b] shadow-md rounded-full hover:bg-[#52b36a]">View</p>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default ProfileVisitedList