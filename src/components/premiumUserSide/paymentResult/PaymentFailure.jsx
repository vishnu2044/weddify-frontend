import React from 'react'
import { Link } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";

const PaymentFailure = () => {
  return (
    <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6 md:mx-auto h-screen mt-9">

            <IoIosCloseCircle className='text-red-600 w-16 h-16 mx-auto my-6' />
            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                <p className="text-gray-600 my-2">Please check your credentials and payment details</p>
                <p> </p>
                <div className="py-10 text-center ">
                    <Link   className="px-12 no-underline mx-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    Contact Us
                    </Link>
                    <Link to='/home/homefield' className="px-12 no-underline mx-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentFailure