import React from 'react'

const EditBasicDetails = ({setDisplayComponent}) => {
  return (
    <div className=" rounded-lg border m-3 shadow-sm border-y-zinc-950 p-4 md:p-8 flex items-center justify-center ">
        

        <form class="w-full max-w-lg" >
        <h3 className="text-lg font-semibold text-[#a43f75] text-center">Basic Details</h3>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Mother tongue
                </label>
                <input  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"  type="text" />
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        eatiing habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value='' >Select</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non-vegetarian">Non vegetarian</option>
                        <option value="eggetarian">Eggetarian</option>
                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Drinking habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value='' >slelect</option>
                        <option value="teetotaler"> teetotaler</option>
                        <option value="social-drinkers">Social drinker</option>
                        <option value="moderate-drinker">Moderate drinker</option>
                        <option value="Heavy-drinker">Heavy drinker</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Smoking habit
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value='' >Select</option>
                        <option value="nonsmoker">Nonsmoker</option>
                        <option value="former-smoker">Former smoker</option>
                        <option value="occasionally">Occasionally</option>
                        <option value="regular-smoker">regular smoker</option>
                    </select>
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        martial status
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value='' >slelect</option>
                        <option value="Never-married">Never married</option>
                        <option value="widowed">widowed</option>
                        <option value="divorced">divorced</option>
                        
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    height (cm)
                </label>
                <input  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-1 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-800"  type="text" />
                </div>


                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        body type
                    </label>
                    <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value='' >slelect</option>
                        <option value="slim">Slim</option>
                        <option value="athletic">Athletic</option>
                        <option value="average">Average</option>
                        <option value="heavy">Heavy</option>
                        
                    </select>
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6">
                <div className='w-full  px-3 mb-6 md:mb-0'>
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                        Physical status
                </label>
                <select  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' >
                        <option value='' >slelect</option>
                        <option value="normal">normal</option>
                        <option value="physically-challenged">Physically Challenged</option>
                    </select>

                </div>

            </div>





            <div className='flex justify-between'>
                <button className='bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-1 px-4 rounded' type='submit'>Update</button>
                <p onClick={() => setDisplayComponent('userDetails')} className='bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded' >Back to user profile</p>
            </div>
        </form>


    </div>

  )
}

export default EditBasicDetails