import React, {useContext, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import HomeNavbar from '../components/homePage/HomeNavbar';
import UserProfile from './userProflile/UserProfile';
import HomeField from './userProflile/HomeField';
import { Outlet } from 'react-router-dom';
function Home() {



  return (
      <>
        <HomeNavbar />
        <Outlet />
      </>
  )
}

export default Home