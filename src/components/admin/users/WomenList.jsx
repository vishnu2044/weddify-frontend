import React from 'react'
import { useNavigate } from 'react-router-dom'

const WomenList = ({adminPanelData, userBlockManagement}) => {
    const navigate = useNavigate()
  return (
    <div>
        <div class="mx-6  rounded-md shadow-md border border-solid border-gray-200 mb-3">
        <div class="mx-4 pt-2">
                <div class="flex flex-wrap -mx-6">
                    <div class="w-full px-6 ">
                    <div class="flex items-center px-5 py-3 shadow-md rounded-md ">
                            <p className='font-semibold m-0 text-xl'>Women</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap">
                <div class="w-full px-6">
                    <div class="flex items-center px-3 py-3 ">
                        <table class="min-w-full divide-y  divide-gray-200 rounded-md">
                            <thead>
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">username</th>
                                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique id</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                {
                                    adminPanelData?.women?.map((user)=>(
                                        <tr>
                                            <td class="px-2 py-4 whitespace-nowrap">
                                                <div class="relative">
                                                    <img class="h-12 w-12 rounded-full object-cover" src={user?.profile_img ? `http://127.0.0.1:8000${user.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="Avatar" />
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">{user?.username}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">{user.first_name} {user.last_name}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">{user?.unique_id ? user?.unique_id : 'not added'}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                {
                                                    user?.is_active === true ?
                                                    <span class="px-3 inline-flex leading-5 text-sm  rounded-full bg-green-700 text-white">Active</span>
                                                    :
                                                    <span class="px-3 inline-flex leading-5 text-sm  rounded-full bg-red-700 text-white">not-Active</span>
                                                }
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                            <button
                                                    onClick={()=> userBlockManagement(user?.id)}
                                                    className="py-1.5 px-3 text-center bg-[#6471b1] rounded-lg text-white dark:bg-[#6471b1]"
                                                    type="submit"
                                                >
                                                    {user?.is_active === true? 'Block': 'Unblock'}
                                                </button>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={()=>navigate('/adminpanel/adminuserprofile', {state : {userId : user.id }})}
                                                    className="py-1.5 px-3 text-center bg-[#6471b1] rounded-lg text-white dark:bg-[#6471b1]"
                                                    type="submit"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WomenList