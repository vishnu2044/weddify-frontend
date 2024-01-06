import { createContext, useState, useEffect } from "react";
import { ErrorMessge } from "../alerts/UserAuthentication";
import { validateEmail, isInputEmptyOrSpaces, containsOnlyAlphabets } from "./FormValidation";
import { baseUrl } from "../Configure/urls";
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


    let handleAdminLogin = async (e) => {
        e.preventDefault();
        if (isInputEmptyOrSpaces(e.target.username)){
            ErrorMessge({message:"please enter user name"})
        }
        if (isInputEmptyOrSpaces(e.target.password)){
            ErrorMessge({message:"please enter password"})
        }
        const response = await fetch(`${baseUrl}/adminpanel/admin_login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            'username':e.target.username.value, 
            'password':e.target.password.value 
            }),

        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(jwt_decode(data.access))
          localStorage.setItem('authTokens', JSON.stringify(data))
          navigate('adminpanel/admindashboard')
        } else {
          console.error('Login failed');
        }
    };

    let loginUser = async (event) =>{
        event.preventDefault();

        console.log({message:'form submited'});
        if (isInputEmptyOrSpaces(event.target.username)){
            ErrorMessge({message:"please enter user name"})
        }
        if (isInputEmptyOrSpaces(event.target.password)){
            ErrorMessge({message:"please enter password"})
        }else{

            let response = await fetch(`${baseUrl}/userauth/token/`,{
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
                navigate('home/homefield', { replace: true })
    
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

                if(user === null){
                    console.log("dfsa")
                }
                
            }else if (response.status === 400) {
                ErrorMessge({message:"this user is blocked by admin please contact admin"})
            }else if (response.status === 404) {
                ErrorMessge({message:"username incorrect "})
            }else if (response.status === 403) {
                ErrorMessge({message:"password incorrect "})
            }else{
                console.log("OOPS!! Something went wrong!!")
            }
    
            console.log("data : ", data)
            console.log("response : ", response)    
        }
        
    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async () =>{
        console.log('update token calledd!!!')
        let response = await fetch(`${baseUrl}/userauth/token/refresh/`,{
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
                    ErrorMessge({message : "account created successfully"})  
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

    
    let getUserProfile = async () => {
        try {
            let response = await fetch(`${baseUrl}/userprofile/userdetails/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access,
                }
            });
    
            if (response.status === 200) {
                let data = await response.json();
                setUser(data);
            } else if (response.status === 401) {
                alert("Unauthorized: not success!!!");
            } else {
                alert("An error occurred"); 
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
        handleAdminLogin:handleAdminLogin,
        
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
