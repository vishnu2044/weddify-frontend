import React from 'react';
import { Link } from 'react-router-dom';

const CurrentPlan = (
  {premiumUserData}
) => {
  return (
    <div class="p-1 mt-10">
      <div class="bg-white w-1/2 mx-auto p-4 rounded-md shadow-lg ">
        <h1 class="text-2xl font-bold text-[#6471b1] mb-4 text-center">You are currently using premium version</h1>
        <div class="mt-4 grid grid-cols-2 gap-2 text-gray-600  ">
            <div class="text-right pr-3">
              <p><strong>Plan :</strong></p>
              <p><strong>Duration :</strong></p>
              <p><strong>Amount paid :</strong></p>
              <p><strong>Expairy date :</strong></p>
            </div>
            <div class="px-3">
              <p>{premiumUserData.plan_name}</p>
              <p>{premiumUserData.plan_count}</p>
              <p>{premiumUserData.amount_paid}</p>
              <p>{premiumUserData.expiry_date}</p>
            </div>
          </div>
        <div class=" text-center">
          <Link>
              <p 
                  class="inline-block cursor-pointer bg-[#6471b1] py-2 px-4 text-white rounded-md font-semibold uppercase text-sm ">Back to Home
              </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CurrentPlan