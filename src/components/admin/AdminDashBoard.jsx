import React,{ useContext,useEffect,useState } from 'react'
import InfoCardsAdmin from './InfoCardsAdmin'
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';
import UsersChat from './charts/UsersChat';
import PremiumChart from './charts/PremiumChart';
import { baseUrl } from '../../Configure/urls';

const AdminDashBoard = () => {
  let [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  let {authTokens, logoutUser } = useContext(AuthContext)
  let [adminPanelData, setAdminPanelData] = useState('')

  const getAdminPanelData = async() =>{
    console.log('admin panel function is workin!!!')
    try{
      let response = await fetch(`${baseUrl}/adminpanel/get_admin_panel_data/`,{
          method: "GET",
          headers :{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authTokens.access, 
          }
      });
      if (response.status=== 200){
          let data = await response.json();
          setAdminPanelData(data)
          console.log(data)
      }else if (response.status === 401){
          logoutUser()
          ErrorMessge({message:"unauthorized : not success"})
          console.log(response.status);
      }else if (response.status === 400){
          ErrorMessge({message:"complete your profile"})

      }else{
          ErrorMessge({message: "and error comes while getAdminPanelData!!"})
          console.log(response.status)
      }
      
    }catch (error) {
      console.error("An error occurred while getAdminPanelData:", error);
    } 
  }

  useEffect(()=>{
    
    getAdminPanelData()
    
  },[])

  return (
    <div className='mt-28 px-4'>
      <InfoCardsAdmin adminPanelData={adminPanelData}/>

      <div class="mx-4 my-2">
        <div class="shadow-md rounded-md bg-[#c5e0f7]">
          <div class="flex flex-wrap -mx-6">
            <div class="w-full">
                <div class="flex items-center px-5 py-2 ">
                  <p className='font-semibold m-0 text-xl'>Graph analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className='flex flex-col md:flex-row'>
        <UsersChat adminPanelData={adminPanelData}/>
        <PremiumChart adminPanelData={adminPanelData}/>
      </div>

      
      <div class="mx-4 my-2">
        <div class="shadow-md rounded-md bg-[#c5e0f7]">
          <div class="flex flex-wrap -mx-6">
            <div class="w-full">
                <div class="flex items-center px-5 py-2 ">
                  <p className='font-semibold m-0 text-xl'>All users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-4 mb-4'>
    <div className='flex flex-wrap -mx-2'>

        {/* Men Table */}
        <div className='w-full sm:w-1/2 xl:w-1/2 px-2 mb-4'>
            <div className='flex items-center px-3 py-3 border border-solid border-gray-300 shadow-md rounded-md'>
                <table className='min-w-full divide-y divide-gray-200 rounded-md'>
                    <thead>
                        <tr>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'></th>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User ID</th>
                            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {adminPanelData?.men?.slice(0, 4).map((user) => (
                            <tr key={user.id}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='relative'>
                                        <img className='h-12 w-12 rounded-full object-cover' src={user?.profile_img ? `${baseUrl}${user.profile_img}` : 'https://i.pravatar.cc/150?img=32'} alt='Avatar' />
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{`${user?.first_name} ${user?.last_name}`}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {user?.is_active === true ? (
                                        <span className='px-3 inline-flex leading-5 text-sm rounded-full bg-green-700 text-white'>Active</span>
                                    ) : (
                                        <span className='px-3 inline-flex leading-5 text-sm rounded-full bg-red-700 text-white'>Not Active</span>
                                    )}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => navigate('/adminpanel/adminuserprofile', { state: { userId: user.id } })}
                                        className='py-1.5 px-3 text-center bg-[#6471b1] rounded-lg text-white dark:bg-[#6471b1]'
                                        type='submit'
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Women Table */}
        <div className='w-full sm:w-1/2 xl:w-1/2 px-2 mb-4'>
            <div className='flex items-center px-3 py-3 border border-solid border-gray-300 shadow-md rounded-md'>
                <table className='min-w-full divide-y divide-gray-200 rounded-md'>
                    <thead>
                        <tr>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'></th>
                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User ID</th>
                            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                            <th className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {adminPanelData?.women?.slice(0, 4).map((user) => (
                            <tr key={user.id}>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='relative'>
                                        <img className='h-12 w-12 rounded-full object-cover' src={user?.profile_img ? `${baseUrl}${user.profile_img}` : 'https://i.pravatar.cc/150?img=32'} alt='Avatar' />
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>{`${user?.first_name} ${user?.last_name}`}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.id}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    {user?.is_active === true ? (
                                        <span className='px-3 inline-flex leading-5 text-sm rounded-full bg-green-700 text-white'>Active</span>
                                    ) : (
                                        <span className='px-3 inline-flex leading-5 text-sm rounded-full bg-red-700 text-white'>Not Active</span>
                                    )}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => navigate('/adminpanel/adminuserprofile', { state: { userId: user.id } })}
                                        className='py-1.5 px-3 text-center bg-[#6471b1] rounded-lg text-white dark:bg-[#6471b1]'
                                        type='submit'
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>


        
    </div>
  )
}

export default AdminDashBoard