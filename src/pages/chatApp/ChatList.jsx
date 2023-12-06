import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { baseUrl } from '../../Configure/urls'
import { ErrorMessge } from '../../alerts/UserAuthentication'

const ChatList = (
    {
        users,
        getUser
    }
) => {
    let {user} = useContext(AuthContext)



    
  return (
    <div className="max-w-sm mx-auto h-96 overflow-y-auto">
        {
            users.map((usr)=>{
                return(
                    <Link 
                        className='no-underline' 
                        to={`/home/chatpage/${usr.id}`} 
                        onClick={ async ()=>{
                            let formData = new FormData();
                            formData.append('user_id', user.user_id);
                            formData.append('sender_id', usr.id)
                            console.log("current user  :::::::::::::", user.user_id, 'message user ::::::::', usr.id)
                            const response = await fetch(`${baseUrl}/chat_app/update-message-status/`,{
                                method : "POST",
                                body : formData
                            });
                            if (response.ok){
                                getUser()
                            }else{
                                ErrorMessge({message : 'message view updation failed!!'})
                            }
                        }   
                        } 
                         
                    >   
                        <div 
                            className="p-3 flex items-center justify-between cursor-pointer rounded-md bg-[#c7dcff] shadow-md hover:bg-[#aac8fc] mt-2 border border-gray-300"
                            
                        >

                            <div className="flex items-center h-7">

                                <img 
                                    className="rounded-full h-10 w-10" 
                                    src={usr?.profile_img ? `${baseUrl}${usr?.profile_img}`:'https://i.pravatar.cc/150?img=32'}
                                    alt="User" 
                                />
                                <div className="ml-2 flex justify-between">
                                    <div className="leading-snug text-sm text-gray-900 font-bold mx-3">{usr.username}</div>
                                    {usr?.unread ? 
                                    <p className="leading-snug bg-green-600 px-1 text-xs font-semibold  rounded-full text-white mx-1">{usr.unread}</p>
                                    :
                                    <p></p>
                                    
                                    }
                                </div>
                            </div>
                        </div>

                    </Link>

                )
            }
            )
        
        }
    </div>
  )
}

export default ChatList