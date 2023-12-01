import React from 'react'

const PremiumPlans = ({
  openEditPopup,
  premiumPlans
}) => {
  return (
<div className='mt-3 px-4'>
  <div class="mx-auto max-w-7xl py-2 px-4">

    <div class="sm:align-center sm:flex sm:flex-col mx-auto max-w-3xl">

    </div>


    <div class=" space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-2">


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