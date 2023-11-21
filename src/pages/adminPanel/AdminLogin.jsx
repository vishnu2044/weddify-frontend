import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ErrorMessge } from '../../alerts/UserAuthentication';


const AdminLogin = () => {

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
          alert("error::::", data.check)
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
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(()=>{
    checkUserIsAdmin()
  }, [])

  return (
    <section className="bg-[#ffffff] min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#7d2753] rounded-2xl flex max-w-3xl p-5 items-center">
        <div className=" px-8 mx-5">
          <h2 className="font-bold text-3xl text-center text-[#ffffff]">Weddify Admin Panel </h2>
          <br />
          <h2 className="font-bold text-xl text-[#ffffff]">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleAdminLogin}>
            <input
              className="p-2 mt-8  rounded-xl border  w-full"
              type="username"
              name="username"
              

              placeholder="username"
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full "
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                
                placeholder="Password"
              />

              
            </div>
            <button
              className="bg-[#000000] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#0d161f] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
