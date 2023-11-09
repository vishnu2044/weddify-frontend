import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import NavbarDropDown from './NavbarDropDown';
import { BiLocationPlus } from 'react-icons/bi';


const HomeNavbar = () => {
  const {user} = useContext(AuthContext)
  const [nav, setNav] = useState(false)
  const [openDropDown, setOpenDropDown] = useState(false)
  const location = useLocation
  const [activeNav, setActiveNav] = useState(null)

  const handleNav = () =>{
      setNav(!nav)
  }

  const handleNavClick = (nav)=>{
    setActiveNav(nav);  
  }

  useEffect(()=>{
    const currentPath = location.pathname;
    setActiveNav(currentPath)
    handleNavClick(currentPath)
    console.log(currentPath);
  }, [location.pathname])

  return (
    <>
    <div className= 'flex justify-between items-center h-19  max-w-[1240px] px-5 mx-auto mt-3 rounded-lg bg-[#621a40]  text-[#ffffff] shadow-md'>
        <h1 className='w-full text-3xl font-bold text-[#ffffff]'>Weddify</h1>
        <ul className='hidden md:flex '>
        <nav className="flex">
            <Link onClick={()=> handleNavClick('homefield')} to="homefield" 
            className={`${activeNav === 'homefield' ? 'bg-[#772750] rounded-lg shadow-md ' : 'hover:bg-opacity-30 '} p-2 px-3 py-2 pt-1 mt-3 text-white no-underline`}>
                Home
            </Link>
            <Link to="userprofile" 
                onClick={()=> handleNavClick('userprofile')} 
                className={`${activeNav === 'userprofile' ? 'bg-[#772750] rounded-lg shadow-md ' : 'hover:bg-opacity-30 '} p-2 px-3 py-2 pt-1 mt-3 text-white no-underline` }>
                    UserProfile
            </Link>
            <Link to="/home/matches" 
                onClick={()=> handleNavClick('/home/matches')} 
                className={`${activeNav === '/home/matches' ? 'bg-[#772750] rounded-lg shadow-md ' : 'hover:bg-opacity-30 '} p-2 px-3 py-2 pt-1 mt-3 text-white no-underline` }>
                    Matches
            </Link>
            <Link to=""                 
                onClick={()=> handleNavClick('notification')} 
                className={`${activeNav === 'notification' ? 'bg-[#772750] rounded-lg shadow-md ' : 'hover:bg-opacity-30 '} p-2 px-3 py-2 pt-1 mt-3 text-white no-underline` }>
                Notificaiton
            </Link>
            <Link to="userprofile"                
                onClick={()=> handleNavClick('chat')} 
                className={`${activeNav === 'chat' ? 'bg-[#772750] rounded-lg shadow-md ' : 'hover:bg-opacity-30 '} p-2 px-3 py-2 pt-1 mt-3 text-white no-underline` }>
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
        <p className='bg-[#46132d] rounded-md cursor-pointer mt-2 py-1 px-3 mx-3' onClick={()=> setOpenDropDown ((prev) => !prev)}>{user.username}</p>
        <div onClick={handleNav} className='block md:hidden'>
            { !nav ? <AiOutlineMenu size={20} /> : < AiOutlineClose size={20} />}
            
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#621a40] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#ffffff] m-4'>Weddify</h1>
        

            <ul className=' uppercase '>
                <li className='p-4 border-b border-gray-600'>            
                    <Link to="homefield" className=" text-white no-underline">
                        Home
                    </Link>
                </li>
                <li className='p-4 border-b border-gray-600'>
                    <Link to="userprofile" className=" text-white no-underline">
                        UserProfile
                    </Link>
                </li>
                <li className='p-4 border-b border-gray-600'>
                    <Link to="matches" className=" text-white no-underline">
                        Matches
                    </Link>
                </li>
                <li className='p-4'>Notificaiton</li>
                
                    
            </ul>
        </div>
    </div>
    </>
  )
}

export default HomeNavbar