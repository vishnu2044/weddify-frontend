import React from 'react';
import { FaCircleXmark } from "react-icons/fa6";

const FreeVersion = () => {
  return (
    <div className="p-10">
    <div className="relative max-w-7xl mx-auto">
      <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
        <div className="flex-1 px-6 py-4 lg:p-10 bg-gray-600">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Free version</h3>
          <p className="mt-6 text-base text-gray-50 sm:text-lg">Explore our website with your current plan and elevate your experience by upgrading to unlock a host of additional benefits</p>
          <div className="mt-3">
            <div className="flex items-center">
              <div className="flex-1 border-t-2 border-green-700"></div>
            </div>
            <ul role="list" className="mt-1 space-y- lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2">
              <li className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="ml-3 text-white">Access to visit your matches profile</p>
              </li>
              <li className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="ml-3 text-white">build a preference according to your profile</p>
              </li>
              <li className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="ml-3 text-white">Prefered matches for you</p>
              </li>
              <li className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                <FaCircleXmark className='h-5 w-5 text-[#ff6060]'/>
                </div>
                <p className="ml-3 text-white">Chat with matches</p>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
  )
}

export default FreeVersion