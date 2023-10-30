import { createContext, useState, useEffect } from "react";
import { ErrorMessge } from "../alerts/UserAuthentication";
import { validateEmail, isInputEmptyOrSpaces, containsOnlyAlphabets } from "./FormValidation";


import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{


    const navigate = useNavigate()

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)


    let loginUser = async (event) =>{

        event.preventDefault();

        console.log({message:'form submited'});
        if (isInputEmptyOrSpaces(event.target.username)){
            ErrorMessge({message:"please enter user name"})
        }
        if (isInputEmptyOrSpaces(event.target.password)){
            ErrorMessge({message:"please enter password"})
        }
        
        let response = await fetch('http://127.0.0.1:8000/userauth/token/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':event.target.username.value, 'password':event.target.password.value})
            
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('home', { replace: true })

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
                title: 'Signed in successfully'
              })
            
        }else{
            console.log("OOPS!! Something went wrong!!")
        }

        console.log("data : ", data)
        console.log("response : ", response)
        
        
    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async () =>{
        console.log('update token calledd!!!')
        let response = await fetch('http://127.0.0.1:8000/userauth/token/refresh/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
        }else{
            loginUser()
        }
        if(loading){
            setLoading(false)
        }
    }


    let signupUser = async (e) =>{
        e.preventDefault()
        
        // Form Validation.
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
                let response = await fetch('http://127.0.0.1:8000/signup/',{
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

                if (data){
                    navigate('/')
    
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
                        title: 'Your account created successfully'
                      })
    
                }else if(data.username){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'username is already taken'
                    })
                    
                }else if(data.email){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email is already taken'
                    })
                }else{
                    alert('somethingwrong')
                }
            }
            
        }catch(errors){
            ErrorMessge(errors.response.data)
            
        }
       
    }

    let getUserProfile = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/userprofile/userdetails/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Correct header field name
                    'Authorization': 'Bearer ' + authTokens.access, // No need to wrap authTokens.access in String
                }
            });
    
            if (response.status === 200) {
                let data = await response.json();
                setUser(data);
            } else if (response.status === 401) { // Correct status code for Unauthorized
                alert("Unauthorized: not success!!!");
            } else {
                alert("An error occurred"); // Handle other status codes as needed
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }


    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        signupUser:signupUser,
        getUserProfile: getUserProfile,
        
    }

    useEffect(()=>{



        let fourMinutes = 1000 * 60 *  4
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes )
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
