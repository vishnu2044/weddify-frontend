import React from 'react'

const DoubleCheckAlert = () => {
  return (
<div class="h-screen w-screen bg-gray-400">
  <div class="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
    <div class="relative container m-auto px-6">
      <div class="m-auto">
        <div class="rounded-xl bg-white w-auto shadow-xl">
          <div class="p-12 w-auto">
            <div class="space-y-4">
              <h3 class="mb-12 text-lg font-semibold">Do you want to block this person ?</h3>
            </div>


            <div class="mt-3 justify-center flex">

                <button type='submit' class="group h-12 px-6 border-2 bg-[#fb483b] mx-4  border-gray-300 shadow-md rounded-2xl">
                  <div class="relative flex items-center space-x-4 justify-center">
                    <span  class="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300  sm:text-base">
                      Block
                    </span>
                  </div>
                </button>
                <button type='submit' class="group h-12 px-6 border-2 bg-[#3679b4] mx-4 border-gray-300 shadow-md rounded-2xl">
                  <div class="relative flex items-center space-x-4 justify-center">
                    <span  class="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300  sm:text-base">
                      Cancel
                    </span>
                  </div>
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default DoubleCheckAlert