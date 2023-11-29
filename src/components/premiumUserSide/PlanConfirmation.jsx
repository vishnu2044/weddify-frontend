import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";


const PlanConfirmation = (
    {
      MonthlyPlanConfirmation
    }
) => {
  return (
<div class="h-screen w-screen ">
  <div class="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
    <div class="relative container m-auto px-2">
      <div class="m-auto">
        <div class="rounded-xl bg-white w-full shadow-xl">
          <div class="p-10 w-auto">
            <div class="flex justify-between">
              <h2 class="mb-8 text-2xl mx-4 font-bold">Confirm your plan</h2>
              <IoMdCloseCircle onClick={MonthlyPlanConfirmation} class="mb-8 cursor-pointer text-2xl text-red-500 ml-4 font-bold" />
            </div>
            <span>monthly plan : </span>
            <form  >
              <span>monthly plan</span>
              <div class="mt-3 grid space-y-4">
                <p 
                  class='w-full h-10 shadow-md rounded-lg px-2 border py-1 border-gray-600 appearance-none hover:appearance-none' 
                >/month</p>
                <span>total months</span>
                <input 
                  class='w-full h-10 shadow-md rounded-lg px-2 border border-gray-600 appearance-none hover:appearance-none' 
                  type="number" 
                  name = 'yearly_price'
                />
                <button type='submit' class="group h-12 px-6 border-2 bg-[#3679b4] mx-5 border-gray-300 shadow-md rounded-2xl">
                  <div class="relative flex items-center space-x-4 justify-center">
                    <span  class="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300  sm:text-base">
                      Checkout
                    </span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default PlanConfirmation