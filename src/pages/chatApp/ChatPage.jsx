import React, { useContext, useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import ChatList from './ChatList'
import AuthContext from '../../context/AuthContext'
import { ErrorMessge } from '../../alerts/UserAuthentication'
import { baseUrl } from '../../Configure/urls'

const ChatPage = () => {
  const [users, setUsers] = useState([])
  const {logoutUser, authTokens, user} = useContext(AuthContext)
  

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
      ErrorMessge({message: "authorization failed !!!!"})
      logoutUser()
    }else{
      ErrorMessge({message : 'something went wrong'})
    }

  }
  useEffect(()=>{
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
            <ChatList users={users} />
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