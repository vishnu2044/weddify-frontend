import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/AuthContext';
import getUserProfile from '../../pages/userProflile/UserProfile';
import EditProfile from './EditProfile';


const UserProfileDetails = ({userProfile, user, setCurrentComponent}) => {
    const {logoutUser} = useContext(AuthContext)


  return (
    <>

        <div class="bg-gray-100">
            <div class="container mx-auto py-8">
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-1 sm:col-span-3">
                        <div class="bg-white shadow rounded-lg p-6">
                            <div class="flex flex-col items-center">
                                <img src={userProfile?.profile_img ? `http://127.0.0.1:8000/${userProfile.profile_img}` : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" } class="w-32 h-32 bg-gray-300 rounded-3xl mb-3" alt="" />
                                <p>{userProfile?.unique_user_id ? userProfile?.unique_user_id : "user unique id "}</p>
                                <h1 class="text-xl font-bold">{user?.username}</h1>
                                <br />
                                <br />
                                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                    <p onClick={() => setCurrentComponent('editUser')} class="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white py-2 px-3 rounded-lg">Update</p>
                                    <p class="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white py-2 px-3 rounded-lg">Preferences</p>
                                </div>
                                <div class="mt-2 flex flex-wrap gap-4 justify-center">
                                    <p class="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white py-2 px-3 rounded">Premium</p>
                                    <p class="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white py-2 px-4 rounded">Logout</p>
                                </div>
                                
                            </div>
                            <hr class="my-6 border-t border-gray-300" />
                        </div>
                    </div>

                    <div class="col-span-1 sm:col-span-9">
                        <div class="bg-white shadow rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-center">User Profile</h1>
                        <br />
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#a43f75]">About me</h3>
                            <p className="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">
                                Edit
                            </p>
                        </div>

                            <p class="text-gray-700">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. 
                                Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante id euismod. 
                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
                                Aliquam erat volutpat. Nulla vulputate pharetra tellus, in luctus risus rhoncus id.
                            </p>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>
  )
}

export default UserProfileDetails