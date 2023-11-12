import React, {useState} from 'react';
import ProfileVisitMatches from './notification/ProfileVisitMatches';


const HomePageNotification = ({profileVisitedMatches, matchCount}) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  
  const openPopup = () =>{
    if(isPopUpOpen === false){
      setIsPopUpOpen(true)
    }else{
      setIsPopUpOpen(false)
    }
  };

  const closePopUp = () =>{
    if(isPopUpOpen === false){
      setIsPopUpOpen(true)
    }else{
      setIsPopUpOpen(false)
    }
  }

  return (
    <>
    <div class="grid gap-8 md:grid-cols-2 lg:gap-10 px-8 md:px-5  mt-4 ">
    <p 
        class="flex bg-[#b3e8c6] flex-col p-4 space-y-2 transition-all duration-500  border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-3">
        <div class="flex items-center justify-center w-8 h-8 bg-white border pt-3  rounded-full shadow-md lg:h-12 lg:w-12">
            <p class="text-center text-lg font-semibold">{matchCount? matchCount : "0"}</p>
        </div>

        <div class="flex-1 ">
            <p class="mb-3   text-base font-medium text-gray-600">Persons wisited your profile</p>
            <span onClick={openPopup} class="flex cursor-pointer items-baseline text-sm font-bold mb-0">
              Check visited profiles
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
        </div>
    </p>

    <p 
        class="flex bg-[#ffb8b8] flex-col p-4 space-y-2 transition-all duration-500  border border-indigo-100 rounded-lg shadow hover:shadow-xl lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-3">
        <div class="flex items-center justify-center w-8 h-8 bg-white border pt-3  rounded-full shadow-md lg:h-12 lg:w-12">
            <p class="text-center text-lg font-semibold">10</p>
        </div>

        <div class="flex-1">
            <p class="mb-3   text-base font-medium text-gray-600">Persons liked your profile</p>
            <span  class="flex items-baseline text-sm font-bold mb-0">
              Check liked profiles
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
        </div>
    </p>




</div>

{
  isPopUpOpen && <ProfileVisitMatches profileVisitedMatches={profileVisitedMatches} onClose ={closePopUp} />
}
    </>

  )
}

export default HomePageNotification