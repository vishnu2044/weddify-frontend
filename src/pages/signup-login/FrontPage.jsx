import React, {useEffect} from 'react';

import RegDirectory from '../../components/frontPage/RegDirectory';
import { useNavigate } from 'react-router-dom';

import IntroAdds from '../../components/frontPage/IntroAdds';
import Hero from '../../components/frontPage/Hero';
import Testimonials from '../../components/frontPage/Testimonials';



function FrontPage() {

  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('authTokens')

    if (token){
        navigate('/home')

    }else{

    }
  })

  return (
    <div>
      <Hero />
      <Testimonials />
      <RegDirectory />
      <IntroAdds />
    
    </div>


  )
}

export default FrontPage





