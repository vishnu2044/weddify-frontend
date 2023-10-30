import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../images/weddidfy_logo.png';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import NavbarDropDown from './NavbarDropDown';


const HomeNavbar = () => {
  const {user, logoutUser} = useContext(AuthContext)
  const [nav, setNav] = useState(false)
  const [openDropDown, setOpenDropDown] = useState(false)

  const handleNav = () =>{
      setNav(!nav)
  }

  return (
    <>
    <div className= 'flex justify-between items-center h-19  max-w-[1240px] px-5 mx-auto mt-3 rounded-lg bg-[#621a40]  text-[#ffffff] shadow-md'>
        <h1 className='w-full text-3xl font-bold text-[#ffffff]'>Weddify</h1>
        <ul className='hidden md:flex '>
        <nav className="flex">
            <Link to="homefield" className="px-3 py-2 pt-3 text-white no-underline">
                Home
            </Link>
            <Link to="userprofile" className="px-3 py-2 pt-3 text-white no-underline">
                UserProfile
            </Link>
            <Link to="userprofile" className="px-3 py-2 pt-3 text-white no-underline">
                Matches
            </Link>
            <Link to="userprofile" className="px-3 py-2 pt-3 text-white no-underline">
                Notificaiton
            </Link>
            <Link to="userprofile" className="px-3 py-2 pt-3 text-white no-underline">
                chat
            </Link>
        </nav>

            
            
            <li className='pt-3 px-3'></li>
            <li className='pt-3 px-3'></li>
            <li className='pt-3 px-3'></li>
        </ul>
        
        {
                openDropDown && <NavbarDropDown />
            }
        <Button className='btn-dark rounded-lg  mt-2 pt-0 px-3 mx-3' onClick={()=> setOpenDropDown ((prev) => !prev)}>{user.username}</Button>
        <div onClick={handleNav} className='block md:hidden'>
            { !nav ? <AiOutlineMenu size={20} /> : < AiOutlineClose size={20} />}
            
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#621a40] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#ffffff] m-4'>Weddify</h1>
        

            <ul className=' uppercase '>
                <li className='p-4 border-b border-gray-600'>Home</li>
                <li className='p-4 border-b border-gray-600'>Matches</li>
                <li className='p-4 border-b border-gray-600'>chat</li>
                <li className='p-4'>Notificaiton</li>
                
                    
            </ul>
        </div>
    </div>
    </>
  )
}

export default HomeNavbar