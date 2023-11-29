import React from 'react'

const PremiumPlans = ({
  openEditPopup,
  premiumPlans
}) => {
  return (
<div className='mt-28 px-4'>
  <div class="mx-auto max-w-7xl py-2 px-4">

    <div class="sm:align-center sm:flex sm:flex-col mx-auto max-w-3xl">

    </div>
    <div class="m-6">
        <div class="flex flex-wrap -mx-6">
            <div class="w-full px-6 ">
                <div class="flex items-center px-3 py-2 shadow-md rounded-md bg-[#589bd5]">
                    <h1 class="max-w-xl mx-auto leading-tight text-3xl font-bold  sm:text-center">
                        Plans
                    </h1>
                    <p onClick={openEditPopup} className='block cursor-pointer py-2 px-3 mt-2 shadow-md rounded-md text-white w-max font-semibold tracking-wide bg-dark  text-sm '>Edit plans</p>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-2">


      <div class="divide-y bg-[#C9C9F0] divide-gray-200 rounded-lg border border-gray-200 shadow-md">
        <div class="p-6">
          <h2 class="text-lg font-medium leading-6 text-gray-900">Monthly Plan</h2>
          <p class="my-4 text-4xl font-bold tracking-tight text-gray-900">
            ₹<span id="standardPlanPrice">{premiumPlans.monthly_price-1}</span><span class="text-base font-medium text-gray-500 ml-1">/month</span>
          </p>
        </div>
      </div>

      <div class="divide-y bg-[#C9C9F0] divide-gray-200 rounded-lg border-2 shadow-md">
        <div class="px-6 py-4">
          <h2 class="text-lg font-medium leading-6 text-gray-900">Yearly Plan</h2>
          <p class="my-4 text-3xl font-bold tracking-tight text-gray-900">
            ₹<span id="standardPlanPrice">{premiumPlans.yearly_price-1}</span><span class="text-base font-medium text-gray-500 ml-1">/month</span>
          </p>
          <p class="my-4 text-2xl font-bold tracking-tight text-[#404080]">
            ₹<span id="standardPlanPrice">{premiumPlans.yearly_plan_month_rate-1}</span><span class="text-base font-medium text-gray-500 ml-1">/month</span>
          </p>
        </div>
        <div class="px-6 pt-6 pb-8 border-t">


        </div>
      </div>

    </div>
  </div>
</div>

  )
}

export default PremiumPlans