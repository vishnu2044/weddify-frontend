import React, { useContext, useEffect, useState } from 'react';
import AdminNavBar from '../../components/admin/AdminNavBar';
import AdminDashBoard from '../../components/admin/AdminDashBoard';
import { Outlet, useNavigate } from 'react-router-dom';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import AuthContext from '../../context/AuthContext';


const AdminPanel = () => {
  let [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  let {authTokens} = useContext(AuthContext)


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
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
      <AdminNavBar />
      <Outlet />
    </>

  );
};

export default AdminPanel;
