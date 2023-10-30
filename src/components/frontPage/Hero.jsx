import React, {useEffect, useState} from 'react';
import backBroundImg from '../../images/frontPage/img01.jpg';
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
<div>
  <div className='w-full h-screen relative overflow-hidden'>
    <img
      className='w-full h-full object-cover object-right'
      src={backBroundImg}
      alt=""
    />
    <div className='max-w-screen-xl mx-auto flex items-center justify-center h-full'>
      <div className='absolute top-0 left-0 md:left-1/3 w-full md:w-1/3 h-full flex flex-col text-[#ffffff] p-4'>
        <div className='w-full h-auto absolute z-10'>

          {renderComponent()}
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default Hero



