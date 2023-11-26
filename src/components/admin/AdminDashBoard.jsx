import React,{ useContext,useEffect,useState } from 'react'
import InfoCardsAdmin from './InfoCardsAdmin'
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';

const AdminDashBoard = () => {
  let [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  let {authTokens, logoutUser } = useContext(AuthContext)
  let [adminPanelData, setAdminPanelData] = useState('')

  let getAdminPanelData = async() =>{
    try{
      let response = await fetch("http://127.0.0.1:8000/adminpanel/get_admin_panel_data/",{
          method: "GET",
          headers :{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authTokens.access, 
          }
      });
      if (response.status=== 200){
          let data = await response.json();
          setAdminPanelData(data)
      }else if (response.status === 401){
          ErrorMessge({message:"unauthorized : not success"})
          logoutUser()
          console.log(response.status);
      }else if (response.status === 400){
          ErrorMessge({message:"complete your profile"})

      }else{
          ErrorMessge({message: "and error comes!!"})
          console.log(response.status)
      }
      
    }catch (error) {
      console.error("An error occurred:", error);
    } 
  }

  useEffect(()=>{
    getAdminPanelData()
  }, [])

  return (
    <div className='mt-28 px-4'>
      <InfoCardsAdmin adminPanelData={adminPanelData}/>

      
      <div class="m-6">
            <div class="flex flex-wrap -mx-6">
                
                <div class="w-full px-6 ">
                    <div class="flex items-center px-3 py-6 shadow-md rounded-md bg-[#a6c9e8]">
                      
                    </div>
                </div>


            </div>
        </div>
      <div class="m-6">
            <div class="flex flex-wrap -mx-6">
                
                <div class="w-full px-6 sm:w-1/2 xl:w-1/2">
                    <div class="flex items-center px-3 py-3 shadow-md rounded-md bg-[#C9F0C9]">
                  
                    <table class="min-w-full divide-y bg-[#e7f9e7] divide-gray-200 rounded-md">
                      <thead>
                          <tr>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">user id  </th>
                              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                      </thead>
                      <tbody class=" divide-y divide-gray-200">
                        {
                          adminPanelData?.men?.slice(0,4).map((user)=>(
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="relative">
                                  <img class="h-12 w-12 rounded-full object-cover" src={user?.profile_img ? `http://127.0.0.1:8000${user.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="Avatar" />
                                  <div class="absolute inset-0 rounded-full shadow-inner"></div>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">{user?.first_name} {user?.last_name}</td>
                              <td class="px-6 py-4 whitespace-nowrap">{user.id}</td>
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

                <div class="w-full px-6 sm:w-1/2 xl:w-1/2">
                    <div class="flex items-center px-3 py-3 shadow-md rounded-md bg-[#F0C9C9]">

                    <table class="min-w-full divide-y bg-[#fff0f0] divide-gray-200 rounded-md">
                      <thead>
                          <tr>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">user id</th>
                              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                      </thead>
                      <tbody class=" divide-y divide-gray-200">
                        {
                          adminPanelData?.women?.slice(0,4).map((user)=>(
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="relative">
                                  <img class="h-12 w-12 rounded-full object-cover" src={user?.profile_img ? `http://127.0.0.1:8000${user.profile_img}`:'https://i.pravatar.cc/150?img=32'} alt="Avatar" />
                                  <div class="absolute inset-0 rounded-full shadow-inner"></div>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">{user?.first_name} {user?.last_name}</td>
                              <td class="px-6 py-4 whitespace-nowrap">{user.id}</td>
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

export default AdminDashBoard