import React from 'react';
import hobies from '../../images/frontPage/fontPageImg01.jpg';
import find from '../../images/frontPage/frontPageImage02.jpg';
import wedding from '../../images/frontPage/frontPageImage03.png';

const IntroAdds = () => {
  return (
    <div className='max-w-[1340px] m-auto w-full md:flex mt-[-75px]'>
      <div className='relative p-4'>
        {/* <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-red-70 text-2xl font-bold'>Resorts</h3> */}
        <img
        className='w-full h-full object-cover relative border-4 border-white shadow-lg'
          src={wedding}
          alt='/'
        />
      </div>
      <div className='relative p-4'>
        <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Elite Matrimony</h3>
        <img
        className='w-full h-full object-cover relative border-4 border-white shadow-lg'
          src={hobies}
          alt='/'
        />
      </div>
      <div className='relative p-4'>
        <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Elite Matrimony</h3>
        <img
        className='w-full h-full object-cover relative border-4 border-white shadow-lg'
          src={find}
          alt='/'
        />
      </div>
    </div>

  )
}

export default IntroAdds