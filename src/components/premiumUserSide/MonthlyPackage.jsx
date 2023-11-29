import React from 'react'

const MonthlyPackage = (
    {
      premiumPlan,
      MonthlyPlanConfirmationPopUp
    }
) => {
  return (
    <div className="p-10">
    <div className="relative max-w-7xl mx-auto">
      <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
        <div className="flex-1 px-6 py-8 lg:p-12 bg-gray-600">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Monthly Plan</h3>
          <p className="mt-6 text-base text-gray-50 sm:text-lg">Enhance your plan with a monthly subscription, unlocking additional benefits for an upgraded experience.</p>
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
                  <svg className="h-5 w-5 text-green-400 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="ml-3 text-white">Prefered matches for you</p>
              </li>
              <li className="flex items-start lg:col-span-1">
                <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <p className="ml-3 text-white">Chat with matches</p>
              </li>

            </ul>
          </div>
        </div>
        <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 bg-gray-700">
          <p className="text-lg leading-6 font-medium text-white">Upgrade your plan</p>
          <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-white">
            <span>₹{premiumPlan.monthly_price-1}</span> <span className='font-normal text-2xl'>/month</span>
          </div>
          <div className="mt-6">
            <div className="rounded-md shadow">
              <p  
                onClick={MonthlyPlanConfirmationPopUp}
                className="flex cursor-pointer items-center justify-center px-5 py-3 shadow-md text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">Upgrade now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MonthlyPackage