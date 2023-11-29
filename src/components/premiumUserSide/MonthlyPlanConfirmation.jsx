import React, { useContext, useEffect, useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import AuthContext from '../../context/AuthContext';

const MonthlyPlanConfirmation = (
    {
      MonthlyPlanConfirmationPopUp,
      premiumPlan,
      handlePayment
    }
) => {
  let [monthCount, setMonthCount] = useState(1)
  let [totalAmount, setTotalAmount] = useState(premiumPlan.monthly_price)
  let {user} = useContext(AuthContext)

  let monthCountIncrement = () =>{
    setMonthCount(monthCount +1)
  }

  let monthCountDecrement = () =>{
    setMonthCount(monthCount -1)
  }

  let amountCalculator = () =>{
    console.log("amount calucator works when click button")
    let monthlyAmount = premiumPlan.monthly_price
    setTotalAmount(monthlyAmount * monthCount)
  }

  const premiumType = monthCount > 1 ? `for ${monthCount} months` : 'for 1 month';

  useEffect(()=>{
    amountCalculator()
    console.log("user>>>>>>>>>>>>>",user.user_id)
  }, [monthCount])





  return (
<div class="h-screen w-screen ">
  <div class="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
    <div class="relative container m-auto px-2">
      <div class="m-auto">
        <div class="rounded-xl bg-white w-full shadow-xl">
          <div class="p-10 w-auto">
            <div class="flex justify-between">
              <h2 class="mb-8 text-2xl mx-4 font-bold">Confirm your monthly plan</h2>
              <IoMdCloseCircle onClick={MonthlyPlanConfirmationPopUp} class="mb-8 cursor-pointer text-2xl text-red-500 ml-4 font-bold" />
            </div>
            <form  >
              <div class="mt-3 grid space-y-4">

                <div className='flex '>

                  <span className='mt-4 font-semibold text-lg'>total months : </span>
                  <div class="flex mx-3 items-center justify-center">
                      <p 
                          onClick={monthCountDecrement}

                          class="flex justify-center cursor-pointer mt-4 items-center w-8 h-8 rounded-lg text-white bg-[#4B5563] hover:bg-[#374151]">

                          <svg class="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                          </svg>

                      </p>
                      <span id="counter"  class="text-2xl font-bold mx-4 mt-1">{monthCount}</span>
                      <p

                          onClick={monthCountIncrement}
                          class="flex justify-center cursor-pointer mt-4 items-center w-8 h-8 rounded-lg text-white bg-[#4B5563] hover:bg-[#374151]">

                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                          </svg>

                      </p>
                  </div>
                </div>
                <div className=' flex'>
                  <span className='py-1 font-semibold text-lg'>payable amount :  </span>
                    <p 
                      class='w-auto mx-4 px-16 h-10 shadow-md rounded-lg border py-1 border-gray-600 appearance-none hover:appearance-none' 
                    >
                      {totalAmount}
                    </p>

                </div>
                <p onClick={() => handlePayment({
                    total_amount : totalAmount, 
                    premium_type:`${premiumType}`, 
                    user_id: user.user_id,
                    type : 'month'    ,
                    duration : monthCount,
                  })} class="group h-12 px-6 py-2 cursor-pointer border-2 bg-[#3679b4] mx-5 border-gray-300 shadow-md rounded-2xl">
                  <div class="relative flex items-center space-x-4 justify-center">
                    <span  
                      class="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300  sm:text-base">
                        Checkout
                    </span>
                  </div>
                </p>
                
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

export default MonthlyPlanConfirmation