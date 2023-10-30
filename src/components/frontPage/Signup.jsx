import React, { useContext } from 'react'
import logo from '../../images/weddidfy_logo.png';
import AuthContext from '../../context/AuthContext';

const Signup = ({setActiveComponent}) => {
    const {signupUser} = useContext(AuthContext)
  return (
    <div class="bg-grey-lighter min-h-screen flex flex-col ">
                <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-[#621a40] px-6 py-2 rounded shadow-md text-black w-full">
                    <img  src={logo} alt="" />
                        <h1 class="mb-8 text-3xl text-center text-white">Sign Up</h1>
                        <form onSubmit={signupUser}>

                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='username'
                                placeholder="Username" />
   
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='email' 
                                placeholder="Email" />
   
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='firstName'
                                placeholder="First Name" />
   
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='lastName' 
                                placeholder="Last Name (optional)" />
   
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='password' 
                                placeholder="Password" />
   
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='confirmPassword'
                                placeholder="Confirm Password" />
   
                      

                            <button
                                type='submit'
                                class="w-full text-center py-2 rounded bg-black  hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>

                        </form>
                        <label className='text-white'>Already have an account ?</label>
                        <button
                            type="submit"
                            class="w-full text-center py-2 rounded bg-black  hover:bg-green-dark focus:outline-none my-1"
                            onClick={() => setActiveComponent('Login')}
                        >Login</button>

                    </div>
                </div>
            </div>

  )
}

export default Signup