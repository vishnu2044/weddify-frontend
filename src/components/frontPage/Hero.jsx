import React, {useEffect, useState} from 'react';
import backBroundImg from '../../images/frontPage/fontPageImg01.jpg';
import Login from './Login';
import Signup from './Signup';
import FrontMenu from './FrontMenu';


const Hero = () => {
  const [activeComponent, setActiveComponent] = useState('FrontMenu')

  const renderComponent = () =>{
    if (activeComponent === 'FrontMenu'){
      return <FrontMenu setActiveComponent={setActiveComponent} />
    }else if (activeComponent === 'Login'){
      return <Login setActiveComponent={setActiveComponent} />
    }else if (activeComponent === 'SignUp'){
      return <Signup setActiveComponent={setActiveComponent} />
    }
  }
  return (
    <>
    <div class="bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backBroundImg})` }}>
    <div class="h-screen flex justify-center items-center">
    {renderComponent()}
    </div>
</div>
    </>


  )
}

export default Hero



