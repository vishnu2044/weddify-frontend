import React, {useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

const FilterBar = () => {
    let [open, setOpen] = useState(false)
    
  return (
    <>
        <div className='bg-[#ffffff] shadow-md w-full mt-3 left-0'>
            <div className='md:flex  py-0 md:px-4 items-center cursor-pointer justify-between'>
                    <div onClick={()=>setOpen(!open)} className='text-3xl ml-5 absolute right-8  md:hidden'>
                        {
                            open?  < AiOutlineClose className='mb-4'  /> : < AiOutlineMenu />
                        }
                        
                    </div>
                <ul className={`md:flex md:items-center transition-all duration-500 ease-in ${open ? '':'hidden'}`}>
                    <li className='bg-[#6471b1] md:my-0 my-3 md:mx-4 mx-20 hover-bg-[#a43f75] cursor-pointer text-white py-2  px-3 mt-2 rounded '>Basic Details</li>
                    <li className='bg-[#6471b1] md:my-0 my-3 md:mx-4 mx-20 hover-bg-[#a43f75] cursor-pointer text-white py-2 px-3 mt-2 rounded '>Religious Details</li>
                    <li className='bg-[#6471b1] md:my-0 my-3 md:mx-4 mx-20 hover-bg-[#a43f75] cursor-pointer text-white py-2 px-3 mt-2 rounded '>Professional Details</li>

                </ul>
            </div>

            
        </div>
    </>

  )
}

export default FilterBar;