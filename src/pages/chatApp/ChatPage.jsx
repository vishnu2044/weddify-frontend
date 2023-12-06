import React, { useContext, useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import AuthContext from '../../context/AuthContext'
import { ErrorMessge } from '../../alerts/UserAuthentication'
import { baseUrl } from '../../Configure/urls'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
  const [users, setUsers] = useState([])
  const {logoutUser, authTokens, user} = useContext(AuthContext)
  const navigate = useNavigate()
  

  const getUser = async () =>{
    let response = await fetch(`${baseUrl}/chat_app/chat-list/${user?.user_id}/`, {
      method : 'GET',
      headers : {
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authTokens.access),        
      }
    })
    let data = await response.json()
    if (response.status === 200){
      console.log(data)
      setUsers(data)
    }else if (response.status === 400){
      ErrorMessge({message: "data didnt get correctly"})
    }else if (response.status === 400){
      logoutUser()
      ErrorMessge({message: "authorization failed !!!!"})
    }else{
      ErrorMessge({message : 'something went wrong'})
      console.log(response.status)
    }

  }

  const checkUserIsPremium = async() =>{
    let response = await fetch(`${baseUrl}/chat_app/check_user_is_premium/`, {
      method : 'GET',
      headers : {
        'Content-Type':'application/json',
        'Authorization' : 'Bearer '+String(authTokens.access),        
      }
    });
    if (response.status === 200){
      console.log('user is premium user');

    }else if (response.status === 400){
      navigate('/home/homefield')
      ErrorMessge({message : "user didnt have premium membership"})

    }else if (response.status === 401){
      ErrorMessge({message :'user is not authenticated'})
      logoutUser()

    }else{
      ErrorMessge({message : 'an error comes'})
      console.log("unknown error ::::::::::::::::::::")
      console.log(response.status )
    }
  }
  useEffect(()=>{
    checkUserIsPremium()
    getUser()
    console.log("users >>>>>", users)
  }, [])

  return (
<>

  <div class="bg-gray-100">
    <div class="container pt-8">
      <div class="grid grid-cols-12 gap-6 px-4 h-auto">
        <div class="col-span-1 sm:col-span-3 bg-white shadow rounded-lg  ">
          <div class=" p-6">
            <ChatList users={users} getUser={getUser} />
          </div>
        </div>

        <div class="col-span-2 sm:col-span-9">
          <div class="bg-white shadow rounded-lg">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  </div>






  

</>

  )
}

export default ChatPage