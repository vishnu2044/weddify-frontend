import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/AuthContext';
import getUserProfile from '../../pages/userProflile/UserProfile';
import EditProfile from './EditProfile';
import {AiOutlineHeart} from 'react-icons/ai';
import { baseUrl } from '../../Configure/urls';


const UserProfileDetails = ({userProfile, user, setCurrentComponent}) => {
    const {logoutUser} = useContext(AuthContext)
  return (
    <>
        <div class="bg-gray-100">
            <div class="container mx-auto py-8">
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-1 bg-white sm:col-span-3 rounded-lg shadow-md">
                        <div class=" p-6">
                            <div class="flex flex-col items-center">
                                <img src={userProfile?.profile_img ? `${baseUrl}${userProfile.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" } class="w-32 h-32 bg-gray-300 rounded-3xl mb-3" alt="" />
                                <p>{userProfile?.unique_user_id ? userProfile?.unique_user_id : "user unique id "}</p>
                                <h1 class="text-xl font-bold">{user?.username}</h1>
                            </div>
                            <div class=" flex flex-wrap gap-4 justify-center mt-8">
                                <p onClick={() => setCurrentComponent('visitedProfiles')} class="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white py-2 px-3 rounded-lg">Visited profiles</p>
                                <p onClick={logoutUser} class="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white py-2 px-4 rounded">Logout</p>
                            </div>
                            <hr class="my-6 border-t border-gray-300" />
                        </div>
                    </div>
                    <div class="col-span-1 sm:col-span-9">
                        <div class="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-center">User Profile</h1>
                        <br />
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#375779]">About me</h3>
                            <p onClick={() => setCurrentComponent('editUser')} className="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white font-bold py-2 px-4 rounded">
                                Edit
                            </p>
                        </div>
                            <div class="mt-4 grid grid-cols-2 gap-2 text-gray-600">
                                <div class="text-right pr-3">
                                    <p><strong>Full Name:</strong></p>
                                    <p><strong>Phone Number:</strong></p>
                                    <p><strong>Email:</strong></p>
                                    <p><strong>Date of Birth:</strong></p>
                                    <p><strong>Gender:</strong></p>
                                </div>
                                <div class="px-3">

                                    <p>{userProfile ? `${user?.first_name} ${user?.last_name}` : 'Not added yet'}</p>
                                    {userProfile?.phone_number ? <p>{ userProfile.phone_number}</p> :<p>not added yet</p> }
                                    {user?.email ? <p>{ user?.email }</p> :<p>not added yet</p> }
                                    {userProfile?.date_of_birth ? <p>{userProfile?.date_of_birth}</p> : <p>not added yet</p> }
                                    {userProfile?.gender ? <p>{ userProfile?.gender }</p> : <p>not added yet</p> }
                                    <br />
                                    <br />
                                </div>
                            </div>
                            <div class="mt-2 flex flex-wrap gap-4 justify-center">
                                <p onClick={() => setCurrentComponent('blockedProfiles')} class="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white py-2 px-3 rounded">Blocked matches</p>
                                <p class="bg-[#6471b1] hover:bg-[#333d6e] cursor-pointer text-white py-2 px-4 rounded">likes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserProfileDetails