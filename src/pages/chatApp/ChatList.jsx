import React from 'react'
import { Link } from 'react-router-dom'

const ChatList = (
    {
        users
    }
) => {
    
  return (
    <div className="max-w-sm mx-auto h-96 overflow-y-auto">
        {
            users.map((user)=>{
                return(
                    <Link className=' no-underline' to={`/home/chatpage/${user.id}`} onClick={() => console.log('button clicked!!!!!')} >
                        <div className="p-3 flex items-center justify-between cursor-pointer rounded-md bg-[#c7dcff] shadow-md hover:bg-[#aac8fc] mt-2 border border-gray-300">
                            <div className="flex items-center h-7">
                                <img 
                                    className="rounded-full h-10 w-10" 
                                    src={user?.profile_img ? `http://127.0.0.1:8000${user?.profile_img}`:'https://i.pravatar.cc/150?img=32'}
                                    alt="User" 
                                />
                                <div className="ml-2 flex flex-col">
                                    <div className="leading-snug text-sm text-gray-900 font-bold mx-3">{user.username}</div>
                                    <div className="leading-snug text-xs text-gray-600 mx-1">message</div>
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