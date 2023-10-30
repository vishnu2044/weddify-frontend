import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/weddidfy_logo.png';

const FrontMenu = ({setActiveComponent}) => {
  return (
<div class="bg-grey-lighter min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-[#621a40]  px-6 py-8 rounded shadow-md text-black w-full">
            <img src={logo} alt="" />
            <p class="mb-8 text-lg text-center text-white">We bring soulmates together</p>
            <button
                type="submit"
                class="w-full text-center py-3 rounded bg-black hover:bg-green-dark focus:outline-none my-1"
                onClick={() => setActiveComponent('Login')}
            >
                Login
            </button>

            <button
                type="submit" 
                class="w-full text-center py-3 rounded bg-black hover:bg-green-dark focus:outline-none my-1"
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