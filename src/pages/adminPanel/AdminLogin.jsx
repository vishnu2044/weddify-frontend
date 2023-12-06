import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { baseUrl } from '../../Configure/urls';


const AdminLogin = () => {

  const [showPassword, setShowPassword] = useState(false);
  let {handleAdminLogin,authTokens, logoutUser } = useContext(AuthContext)
  let navigate = useNavigate()

  const checkUserIsAdmin = async () => {
    try {
      const response = await fetch(`${baseUrl}/adminpanel/check_user_is_admin/`, {
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
          logoutUser();
        }
      } else {
        alert('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const togglePasswordVisibility = () => {
    if (showPassword === false){
      setShowPassword(true);
    }else{{
      setShowPassword(false)
    }}
  };

  useEffect(()=>{
    checkUserIsAdmin()
  }, [])

  return (
    <section className="bg-[#ffffff] min-h-screen flex box-border justify-center items-center">
      <div className="bg-[#6F859D] rounded-2xl flex max-w-3xl p-5 items-center">
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
              <p
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 cursor-pointer right-0 px-3 py-2"
              >
                {showPassword ? '🙂' : '😌'}
              </p>
            </div>

            <button
              className="bg-[#1b324b] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#152639] font-medium"
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
