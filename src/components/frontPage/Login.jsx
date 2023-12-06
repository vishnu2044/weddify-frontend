import React, {useEffect, useContext, useState} from 'react';
import logo from '../../images/weddidfy_logo.png';
import AuthContext from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({setActiveComponent}) => {
    let{loginUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        if (showPassword === false){
          setShowPassword(true);
        }else{{
          setShowPassword(false)
        }}
      };

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if (token){
            navigate('/home')
        }
      })
  return (
    <>
        <div class="bg-[#6D91B8] mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
            <p className='text-white text-center font-extrabold text-3xl md:text-7xl mx-12'>Weddify</p>
            <h1 class="text-2xl mb-8 text-center text-white">Login</h1>
            <form onSubmit={loginUser}>
                <div class="mb-4">
                    <label class="block font-semibold text-white mb-2" for="email">
                        Username
                    </label>
                    <input
                        class="border rounded w-full py-2 px-3 shadow-sm leading-tight focus:outline-none focus:shadow-outline"
                        type='username' 
                        name='username'
                        
                        placeholder="Username" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold text-white mb-2" >
                        Password
                    </label>
                    <div className='relative'>

                    <input
                        class="border rounded w-full py-2 px-3 shadow-sm text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name='password' type={showPassword ? 'text' : 'password'}   
                        placeholder="enter your Password" />
                                      <p
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 cursor-pointer right-0 px-3 py-2"
                        >
                            {showPassword ? '🙂' : '😌'}
                        </p>
                    </div>

                </div>
                <div class="mb-6 flex justify-center">
                    <button
                        class="bg-[#294460] py-3 w-full mx-2 hover:bg-[#1f364f] text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                            Login
                    </button>
                </div>
                <div class="mb-6 mx-2 flex justify-center">
                    <button
                        class="bg-[#294460] w-1/2 mr-2 hover:bg-[#1f364f] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setActiveComponent('FrontMenu')}>
                            Home
                    </button>
                    <button
                        class="bg-[#294460] w-1/2 ml-2 hover:bg-[#1f364f] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setActiveComponent('SignUp')}>
                            SignUp
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Login