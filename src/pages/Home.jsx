import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../context/AuthContext';
import HomeNavbar from '../components/homePage/HomeNavbar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../alerts/UserAuthentication';


function Home() {

  const [showPassword, setShowPassword] = useState(false);
  let {handleAdminLogin,authTokens } = useContext(AuthContext)
  let navigate = useNavigate()

  const checkUserIsAdmin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/adminpanel/check_user_is_admin/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        if (data.check === 'is_admin'){
          navigate('/adminpanel/admindashboard')
        }else if (data.check === 'is_normal_user'){
          console.log('user is normal user')
        }else{
          console.log('user is not authenticated');
        }
      } else {
        alert('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  useEffect(()=>{
    checkUserIsAdmin()
  }, []) 
  return (
      <>
        <HomeNavbar />
        <Outlet />
      </>
  )
}

export default Home