import React from 'react';
import { baseUrl } from '../../../Configure/urls';

const ProfileLikedMatches = (
    {
        likedMatches,
        onClose
    }
) => {
  return (
<div class="flex place-items-start justify-center ">
    <div class="border rounded-lg shadow relative w-xl bg-[#F8D9D9]">
        <div class="flex justify-end p-2">
            <button onClick={onClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>

        <div class="p-6 text-center">
            <p className='font-semibold text-left'>Liked  profiles</p>
            <div className="max-w-screen-lg justify-between mx-auto">
                {
                    likedMatches.map((match)=>(

                <div className="p-3 my-2 flex items-center bg-[#EFF6FE] justify-between cursor-pointer rounded-md hover:bg-[#c5ddf9] border border-solid border-gray-700">
                    <div className="flex items-center">
                        <img className="rounded-full h-14 w-14" src={match?.profile_img ? `${baseUrl}${match?.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" }    />
                        <div className="ml-2 flex flex-col">
                            <div className="leading-snug text-sm text-gray-900 font-bold">{match.first_name} {match.last_name}</div>
                            <div className="leading-snug text-xs text-gray-600">{match.visited_time}</div>
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
</div>

  )
}

export default ProfileLikedMatches