import React, { useContext } from 'react';
import './homePageCss/navBarDropDown.css'
import AuthContext from '../../context/AuthContext';
import { Link, nav } from 'react-router-dom';

const NavbarDropDown = (
  {setOpenDropDown}
) => {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='flex flex-col'>
      <ul className='text-white navBarDropDown flex flex-col'>
        <nav>
          <Link to='userprofile' className='no-underline'>
            <li onClick={()=> setOpenDropDown ((prev) => !prev)} className='cursor-pointer bg-[#802b56] rounded-2xl shadow-md py-2 my-2 text-white'>{user.username}</li>
          </Link>
        </nav>
          <li onClick={logoutUser} className='cursor-pointer bg-[#802b56] rounded-2xl my-2 shadow-md py-2 text-white'>Logout</li>
      </ul>
    </div>
  )
}

export default NavbarDropDown