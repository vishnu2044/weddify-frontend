import React from 'react'

const EditPremiumPlans = ({closeEditPopUp}) => {
  return (
<div class="h-screen w-screen bg-gray-400">
  <div class="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
    <div class="relative container m-auto px-6">
      <div class="m-auto">
        <div class="rounded-xl bg-white w-auto shadow-xl">
          <div class="p-8 w-auto">
            <div class="space-y-4">
              <h2 class="mb-8 text-2xl font-bold">Edit your premium plan</h2>
            </div>
            <form action="">
              <div class="mt-10 grid space-y-4">
                <input class='w-full h-10 shadow-md rounded-lg px-2 border border-gray-600 appearance-none hover:appearance-none' type="text" />
                <input class='w-full h-10 shadow-md rounded-lg px-2 border border-gray-600 appearance-none hover:appearance-none' type="text" />
                <button type='submit' class="group h-12 px-6 border-2 bg-[#3679b4] mx-5 border-gray-300 shadow-md rounded-2xl">
                  <div class="relative flex items-center space-x-4 justify-center">
                    <span onClick={closeEditPopUp} class="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300  sm:text-base">
                      Update
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

export default EditPremiumPlans