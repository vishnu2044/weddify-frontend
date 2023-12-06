import React from 'react'
import { Link } from 'react-router-dom'

const MatchesInvite = () => {
  return (
    <>

        <div class="mx-auto w-7xl sm:px-6 lg:px-8 ">

            <div
                class="relative isolate overflow-hidden bg-white px-6 py-20 text-center sm:rounded-3xl sm:border sm:border-gray-500 sm:px-16 smshadow-sm">

                <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Connect with compatible singles and start your love story
                </h2>

                <h3 class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-500">
                Find your soulmate with us
                </h3>

                <div class="mt-8 flex items-center justify-center gap-x-6">
                    <Link to='/home/matches' class="inline-flex no-underline items-center justify-center gap-2 rounded-xl bg-[#375779] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#913967] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                        Get Started Now - It's free
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </Link>
                </div>


                <svg viewBox="0 0 1024 1024"
                    class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                    aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fill-opacity="0.7">
                    </circle>
                    <defs>
                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                            <stop stop-color="#3b82f6"></stop>
                            <stop offset="1" stop-color="#1d4ed8"></stop>
                        </radialGradient>
                    </defs>
                </svg>

            </div>
            
        </div>
    </>
  )
}

export default MatchesInvite