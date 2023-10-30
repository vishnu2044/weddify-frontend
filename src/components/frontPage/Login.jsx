import React, {useEffect, useContext} from 'react';
import logo from '../../images/weddidfy_logo.png';
import AuthContext from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({setActiveComponent}) => {
    let{loginUser} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')

        if (token){
            navigate('/home')
        }
      })
  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col ">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-[#621a40]  px-6 py-8 rounded shadow-md text-black w-full">
                        <img  src={logo} alt="" />
                        <h1 class="mb-8 text-3xl text-center text-white">Login</h1>

                        <form onSubmit={loginUser}>
                            <input 
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                type='username' 
                                name='username'
                                
                                placeholder="Username" />

        
                            <input 
                                
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='password' type='password'
                                
                                placeholder="Password" />

        
                            <button
                                type='submit'
                                class="w-full text-center py-3 rounded bg-black  hover:bg-green-dark focus:outline-none my-1"
                            >Login</button>
                        </form>

                            <br />
                            <p className='text-white' >don't have an account ?</p>
                            <button
                                type='submit'
                                onClick={() => setActiveComponent('SignUp')}
                                class="w-full text-center py-3 rounded bg-black  hover:bg-green-dark focus:outline-none my-1">
                                    Create Account
                            </button>
                            <button
                                type='submit'
                                onClick={() => setActiveComponent('FrontMenu')}
                                class="w-full text-center py-3 rounded bg-black  hover:bg-green-dark focus:outline-none my-1">
                                    Home
                            </button>
                    </div>
    
                </div>
            </div>
  )
}

export default Login