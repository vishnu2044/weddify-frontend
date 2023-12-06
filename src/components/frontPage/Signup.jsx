import React, { useContext } from 'react';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import { validateEmail, containsOnlyAlphabets, isInputEmptyOrSpaces } from '../../context/FormValidation';
import { baseUrl } from '../../Configure/urls';
import Swal from 'sweetalert2';


const Signup = ({setActiveComponent}) => {

    let signupUser = async (e) =>{
        e.preventDefault()
        try{
            if (e.target.password.value !== e.target.confirmPassword.value){
                ErrorMessge({message:'password missmatch'})
            }else if ( validateEmail(e.target.email.value) ){
                ErrorMessge({message:'your email is not valid'})
            }else if (isInputEmptyOrSpaces(e.target.username)){
                ErrorMessge({message:'username is empty!'})
            }else if (isInputEmptyOrSpaces(e.target.firstName)){
                ErrorMessge({message:'please enter your first name!'})
            }else if (containsOnlyAlphabets(e.target.firstName)){
                ErrorMessge({message:'First name can only contain alphabets!'})
            }else if (containsOnlyAlphabets(e.target.lastName)){
                ErrorMessge({message:'Last name can only contain alphabets!'})
            }else if (e.target.password.value.length < 5 ){
                ErrorMessge({message:'passwrod must me minimum 5 characters'})
            }else{
                let response = await fetch(`${baseUrl}/signup/`,{
                    method :'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        'username':e.target.username.value,
                        'password': e.target.password.value,
                        'first_name': e.target.firstName.value,
                        'last_name': e.target.lastName.value,   
                        'email': e.target.email.value,
                    })        
                });
                console.log("signin response :::", response)
                let data = await response.json()
                console.log(data)
                if(response.status === 200){
                    setActiveComponent('FrontMenu')
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: 'Account created successfully'
                      })
                }else if(response.status === 400){
                    ErrorMessge({message: "username already excists"})      
                }else if(response.status === 403){
                    ErrorMessge({message: "email already excists"})       
                }else if (data){
                    console.log(data)
                }else{
                    alert('somethingwrong')
                }
            } 
        }catch(errors){
            ErrorMessge(errors.response.data)
        }
    }

      
  return (
    <>
    
    <div class=" min-h-screen flex mt-0">
                <div class="container w-md flex-1 flex flex-col items-center justify-center px-2">
                    <div class="bg-[#6d91b8] px-6 py-3 rounded shadow-md text-black w-full">
                        <p className='text-white text-center font-extrabold text-3xl md:text-7xl mx-12'>Weddify</p>
                        <h1 class="mb-8 text-xl text-center text-white">Sign Up</h1>
                        <form onSubmit={signupUser}>

                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='username'
                                placeholder="Username" />
   
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='email' 
                                placeholder="Email" />
   
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='firstName'
                                placeholder="First Name" />
   
                            <input 
                                type="text"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='lastName' 
                                placeholder="Last Name (optional)" />
   
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='password' 
                                placeholder="Password" />
   
                            <input 
                                type="password"
                                class="block border border-grey-light w-full p-2 rounded mb-3"
                                name='confirmPassword'
                                placeholder="Confirm Password" />
   
                      

                            <button
                                type='submit'
                                class="w-full text-center py-3 rounded bg-[#294460]  hover:bg-green-dark focus:outline-none my-1"
                            >Create Account</button>

                        </form>
                            <label className='text-white'>Already have an account ?</label>
                        <div className='flex'>

                        <button
                            type="submit"
                            class="w-full text-center py-3 mr-2 rounded bg-[#294460]  hover:bg-green-dark focus:outline-none my-1"
                            onClick={() => setActiveComponent('Login')}
                        >Login</button>
                        <button
                            type="submit"
                            class="w-full text-center py-3 ml-2 rounded bg-[#294460]  hover:bg-green-dark focus:outline-none my-1"
                            onClick={() => setActiveComponent('FrontMenu')}
                        >Home</button>
                        </div>

                    </div>
                </div>
            </div>

    </>

  )
}

export default Signup