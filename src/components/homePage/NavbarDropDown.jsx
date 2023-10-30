import React, { useContext } from 'react';
import './homePageCss/navBarDropDown.css'
import AuthContext from '../../context/AuthContext';
import { Link, nav } from 'react-router-dom';

const NavbarDropDown = () => {
  const {user, logoutUser} = useContext(AuthContext)
  return (
    <div className='flex flex-col'>
        <ul className='text-white navBarDropDown flex flex-col '>
          <nav>
            <Link to='/' className='no-underline'>
            <li className='cursor-pointer text-white'>{user.username}</li>
            </Link>

          </nav>
            
            <li onClick={logoutUser} className='cursor-pointer'>Logout</li>

        </ul>
        
    </div>
  )
}

export default NavbarDropDown