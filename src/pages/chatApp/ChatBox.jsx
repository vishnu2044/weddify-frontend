import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaUser } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import axios from 'axios';
import { baseUrl, wsBaseUrl } from '../../Configure/urls';
import AuthContext from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';


const ChatBox = () => {
  const {user} = useContext(AuthContext)
  const {username} = useParams()
  const [clientState, setClientState] = useState('')
  const [recipientid, setRecipientid] = useState(null)
  const [recipientDetails, setRecipientDetails] = useState({})
  const [senderDetails, setSenderDetails] = useState({})
  const [senderId, setSenderId] = useState(null)
  const [messages, setMessages] = useState([])
  const [thread, setThread] = useState([])

  const navigate = useNavigate()
  const messageRef = useRef()

  useEffect(()=>{
    return ()=>{
      console.log('chat closing funciton')
    }
  }, [username, senderId, recipientid ])

  const setUserProfileDetails = async () => {

    if (username) {
      axios.get(`${baseUrl}/chat_app/get-userdetails/${username}`).then((response) => {
        if (response.status === 200) {
          setSenderDetails(response.data); 
          
        }
      });
    } else {
      console.log('<<<<<<<<<<<<<<<<<<< username is null >>>>>>>>>>>>>>>');
    }
  };
  


  const setSenderProfile = async () =>{

    axios.get(`${baseUrl}/chat_app/get-userdetails/${user?.user_id}`).then((response)=>{
      if (response.status === 200 ){
        console.log(":::::::::::::::: current user >>>>>>>", response.data)  
        setRecipientDetails(response.data)


      }
    }) 

  }

  useEffect(()=>{
    setSenderProfile()
    setUserProfileDetails()
  }, [username])

  const setUpChat = () =>{
    console.log('set up chat is working>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    if (clientState){
      clientState.close()
      console.log("wob socket already connected now closed :::")

    }else{
      console.log("client state is null")
    }

    if (  senderId !== null && recipientid !== null && recipientid === user?.user_id && senderId === username){
      axios.get(`${baseUrl}/chat_app/user-previous-chats/${senderId}/${recipientid}`).then((response) =>{
        if (response.status === 200){

          setMessages(response.data)
        }
      }).catch((error) => {

        console.error('error whil axiios user previews chats  :::::::::::: Error:', error);
      });

      const client = new W3CWebSocket(`${wsBaseUrl}/ws/chat/${senderId}/?${recipientid}`)
      console.log("client data get")

      setClientState(client)
      client.onopen = () => {
        console.log('WebSocket Client Connected successfully');
      };

      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        const currentDate = new Date();
        const isoString = currentDate.toISOString();
        if (dataFromServer) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {

              message: dataFromServer.message,
              sender_username: dataFromServer.senderUsername,
              send_at:isoString,

            },
          ]);
          
          console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<messages ::::::::::::::', messages)
        }
      };
        client.onclose = () =>{
          console.log("websocket discconnected")
        }
    }
  }
  
    useEffect(()=>{
      setRecipientid(user?.user_id)
      setSenderId(username)
      let thread_name = user.user_id > username ?  `${user.user_id}_${username}` : `${username}_${user.user_id}`
      setThread(thread_name)
    }, [username])

  useEffect(()=>{
    if (senderId !== null && recipientid !== null){
      setUpChat()
    }
  }, [senderId, recipientid, username])

  const onButtonSendMessage = () =>{
    if (messageRef.current.value.trim() == ''){
      return
    }else{

      console.log("sender details :::::",senderDetails, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log("recipient details :::::::",recipientDetails, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      clientState.send(
        
        JSON.stringify({
          message : messageRef.current.value,
          senderUsername: senderDetails.username,
          receiver_username : recipientDetails.username
        })
      );
      messageRef.current.value = ''
      console.log("client state >>>>>>>>>>>>>>>>>>", clientState)
    }
  };

  const chatContainerRef = useRef();
  useEffect(() => {
    if (messages.length > 0) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, senderDetails?.username]);
  
  

  return (
<div >
  {console.log("chat details >>>>>>>>>>>>", messages)}
  {messages.length > 0 ? (
    <>
        <div className='w-full h-auto px-3 py-3 bg-[#edf4ff] shadow-md rounded-xl my-1 flex justify-between'>
          <div className='flex'>
            <img
              className="rounded-full h-10 w-10"
              src={senderDetails?.profile_img ? `${baseUrl}${senderDetails?.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
              alt="User"
            />
            <div className="my-2 flex flex-col">
              <div className="leading-snug text-sm text-gray-900 font-bold mx-3">{senderDetails?.username}</div>
            </div>
          </div>
          <div className='flex mt-2'>
            <FaUser className='m-1 text-lg mx-3' />
            <IoVideocam className='m-1 text-lg mx-3' />
          </div>
        </div>
      <div  className="h-96 overflow-y-auto bg-white rounded-lg" ref={chatContainerRef} >
        <div className="flex flex-col gap-4 py-4 px-2"  >
          {messages.map((message, idx) => {
            if (message.sender === user.user_id) {
              return (
                <div className='flex' key={idx}>
                  <img
                    className="rounded-full h-10 w-10 mx-1 shadow-md"
                    src={senderDetails?.profile_img ? `${baseUrl}${senderDetails?.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
                    alt="User"
                  />
                  <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-4 py-1 shadow-md max-w-[80%]">
                          <p className="text-gray-900 text-sm mb-0 py-1">{message.message}</p>
                          <p className="text-gray-400 text-xs my-0 text-left">{message.send_at}</p>
                      </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex justify-end" key={idx}>
                  <div className="bg-blue-500 rounded-lg px-4 py-1 shadow-md max-w-[80%]">
                    <p className="text-white text-sm mb-0 py-1">{message.message}</p>
                    <p className="text-gray-300 text-xs my-0 text-left">{message.send_at}</p>
                  </div>
                  <img
                    className="rounded-full h-10 w-10 mx-1 shadow-md"
                    src={recipientDetails?.profile_img ? `${baseUrl}${recipientDetails?.profile_img}` : 'https://i.pravatar.cc/150?img=32'}
                    alt="User"
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex justify-center w-full items-center h-16 bg-[#EDF4FF]">
        <input
          type="text"
          ref={messageRef}
          className="border border-gray-300 rounded-lg py-2 px-4 w-full mx-2 mr-4"
          placeholder="Type a message..."
        />
        <button
          type='submit'
          onClick={onButtonSendMessage}
          className="bg-[#326bc8] hover:bg-[#518be9] text-white font-bold py-2 px-4 mx-3 rounded"
        >
          Send
        </button>
      </div>
    </>
  ) : (
    <div className='w-full h-auto mx-4 my-1'>
      <div className='w-full h-auto py-3 my-1 flex justify-between'>
        <div className='flex'>
          <div className="my-2 flex flex-col">
            <div className="leading-snug text-sm text-gray-900 font-bold mx-3"></div>
          </div>
        </div>
      </div>
      <div className="h-96 rounded-lg">
        <div className="flex flex-col py-1 ">
          <section className="text-gray-600 body-font h-auto flex bg-svg-constellation-gray-100 relative">
            <div className="container flex items-center justify-center flex-col">
              <div className="w-full animate-fade-in-down">
                <h1 className="md:text-3xl text-3xl mt-24 pt-4 font-bold tracking-tight leading-tight">
                  Hello, {user?.username}.
                </h1>
                <p className="mt-8 mb-16 md:leading-relaxed leading-normal tracking-tight text-xl">
                  Please select a chat to start a conversation.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )}
</div>


  )
}

export default ChatBox