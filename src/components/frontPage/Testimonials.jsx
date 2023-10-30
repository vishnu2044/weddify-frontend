import React from 'react';
import img_01 from '../../images/frontPage/testimonials/testimonial_01.png';
import img_02 from '../../images/frontPage/testimonials/testimonial_02.png';
import img_03 from '../../images/frontPage/testimonials/testimonial_03.png';

const Testimonials = () => {
  return (
<div class='font-sans bg-white'>
    <div class='text-center py-5 md:py-10'>
        <h5 class='text-heading_color'>Testimonials</h5>
        <h1 class='text-2xl md:text-4xl w-96 mx-auto leading-normal font-bold mb-4 md:mb-12'>Read what others Have to Say</h1>
    </div>
    <div class='flex flex-col md:flex-row justify-center max-w-5xl mx-auto gap-4 md:gap-8'>
        <div class='bg-[#621a40] cursor-pointer p-4 md:p-8 rounded-xl text-center'>
            <img src={img_01} alt='' class='h-16 md:h-20 mx-auto rounded-xl'/>
            <h4 class='uppercase text-white text-lg md:text-xl pt-2 font-bold'>john</h4>
            <p class='text-sm leading-6 md:leading-7 my-2 md:my-3 font-light text-slate-50'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
            <button class='bg-btn_primary shadow-sm py-2 px-4 md:py-2.5 md:px-8 rounded-full'>
                Enquire
            </button>
        </div>

        <div class='bg-[#621a40]  cursor-pointer p-4 md:p-8 rounded-xl mx-0 md:mx-4 text-center'>
            <img src={img_02} alt='' class='h-16 md:h-20 mx-auto rounded-xl'/>
            <h4 class='uppercase text-white text-lg md:text-xl pt-2 font-bold'>stella</h4>
            <p class='text-sm leading-6 md:leading-7 my-2 md:my-3 font-light text-slate-50'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
            <button class='bg-btn_primary shadow-sm py-2 px-4 md:py-2.5 md:px-8 rounded-full'>
                Enquire
            </button>
        </div>

        <div class='bg-[#621a40] cursor-pointer p-4 md:p-8 rounded-xl text-center'>
            <img src={img_03} alt='' class='h-16 md:h-20 mx-auto rounded-xl'/>
            <h4 class='uppercase text-white text-lg md:text-xl pt-2 font-bold'>steve</h4>
            <p class='text-sm leading-6 md:leading-7 my-2 md:my-3 font-light text-slate-50'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
            <button class='bg-btn_primary shadow-sm py-2 px-4 md:py-2.5 md:px-8 rounded-full'>
                Enquire
            </button>
        </div>
    </div>
</div>

  )
}

export default Testimonials