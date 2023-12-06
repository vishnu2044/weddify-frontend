import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/weddify-official-logo.png'


const FrontMenu = ({setActiveComponent}) => {
  return (
<div class="bg-grey-lighter mxa-h-screen flex mt-28">
    <div class="container max-w-sm mx-12 flex items-center justify-center px-2 ">
        <div class="bg-[#6d91b8] px-6 py-8 rounded shadow-md text-black w-auto">
            <div>
            <p className='text-white text-center font-extrabold text-xl md:text-7xl mx-12 mt-12 mb-10'>Weddify</p>

            </div>
            <p class="mb-8 text-lg text-center text-white">We bring soulmates together</p>
            <button
                type="submit"
                class="w-full text-center py-3 rounded bg-[#294460] shadow-md  focus:outline-none my-1"
                onClick={() => setActiveComponent('Login')}
            >
                Login
            </button>

            <button
                type="submit" 
                class="w-full text-center py-3 rounded bg-[#294460] shadow-md  focus:outline-none my-1"
                onClick={() => setActiveComponent('SignUp')}
            >
                signup
            </button>
        </div>
    </div>
</div>

  )
}

export default FrontMenu