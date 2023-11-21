import React, {useState, useContext, useEffect} from 'react'
import MenList from './MenList';
import AuthContext from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../../alerts/UserAuthentication';
import WomenList from './WomenList';
import AllUsers from './AllUsers';
import Swal from 'sweetalert2';


const AdminUserList = () => {

  const navigate = useNavigate()
  let {authTokens,logoutUser } = useContext(AuthContext)
  let [adminPanelData, setAdminPanelData] = useState('')
  let [currentComponent, setCurrentComponent] = useState('allUsers')

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
  

  let userBlockManagement = async(userId) =>{
    try{
      let response = await fetch(`http://127.0.0.1:8000/adminpanel/user_block_management/${userId}/`,{
          method: "GET",
          headers :{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authTokens.access, 
          }
      });
      if (response.status=== 200){
          let data = await response.json();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: data.success
          })
          getAdminPanelData()

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

  const renderComponent = () =>{
    if (currentComponent === 'allUsers'){
      return <AllUsers adminPanelData={adminPanelData} userBlockManagement={userBlockManagement} />
    }else if (currentComponent === 'mensList'){
      return <MenList adminPanelData={adminPanelData} userBlockManagement={userBlockManagement}/>
    }else if (currentComponent === 'womensList'){
      return <WomenList adminPanelData={adminPanelData} userBlockManagement={userBlockManagement}/>
    }
  }

  useEffect(()=>{
    getAdminPanelData()
    renderComponent()
  }, [])

  return (
    <div className='mt-28 px-4'>
      <div class="m-6">
        <div class="flex flex-wrap -mx-6">
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3 ">
                <div onClick={()=> setCurrentComponent("mensList")} class="flex items-center px-3 py-2 my-2 sm:mx-5 shadow-md rounded-md bg-[#C9F0C9] cursor-pointer">
                    <div class="p-3 rounded-full bg-[#252524] shadow-md">
                        <svg class="h-5 w-5 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                fill="currentColor"></path>
                            <path
                                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                fill="currentColor"></path>
                            <path
                                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                fill="currentColor"></path>
                            <path
                                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <div class="mx-3">
                        <div class="text-gray-500 text-sm">Men</div>
                    </div>
                </div>
            </div>
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3 ">
                <div onClick={()=> setCurrentComponent("allUsers")} class="flex items-center px-3 py-2 my-2 sm:mx-5 shadow-md rounded-md bg-[#a6c9e8] cursor-pointer">
                    <div class="p-3 rounded-full bg-[#252524] shadow-md">
                        <svg class="h-5 w-5 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                fill="currentColor"></path>
                            <path
                                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                fill="currentColor"></path>
                            <path
                                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                fill="currentColor"></path>
                            <path
                                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <div class="mx-3">
                        <div class="text-gray-500 text-sm">All users</div>
                    </div>
                </div>
            </div>

            <div class="w-full px-6 sm:w-1/2 xl:w-1/3 ">
                <div onClick={()=> setCurrentComponent('womensList')} class="flex items-center px-3 py-2 my-2 sm:mx-5  shadow-md rounded-md bg-[#F0C9C9] cursor-pointer">
                    <div class="p-3 rounded-full bg-[#252524] shadow-md">
                        <svg class="h-5 w-5 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                fill="currentColor"></path>
                            <path
                                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                fill="currentColor"></path>
                            <path
                                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                fill="currentColor"></path>
                            <path
                                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                fill="currentColor"></path>
                            <path
                                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    <div class="mx-3">
                        <div class="text-gray-500 text-sm">Women</div>
                        <h4 class="text-2xl font-semibold text-gray-700"></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>


    {renderComponent()}
    </div>
  )
}

export default AdminUserList