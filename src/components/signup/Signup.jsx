import React, {useContext} from 'react';
import logo from '../../images/weddidfy_logo.png';

import './signup.css';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';

import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Signup = () => {
    const {signup} = useContext(AuthContext)
  return (
    <>
        <MDBContainer className='back' fluid>
            <MDBRow className='back d-flex justify-content-center align-items-center h-100'>
                <MDBCol className='back' col='12'>
                    <MDBCard className='back col-6 bg-white my-5 mx-auto'>
                        <form onSubmit={signup}>
                            <MDBCardBody className='signupbody px-5 d-flex flex-column align-items-center mx-auto w-100'>
                                <Link to='/'>
                                    <img className='signupLogo' src={logo} alt='' />
                                </Link>
                                
                                <h2 className='fw-bold mb-2 text-uppercase'>signup</h2>
                                <p className='mb-5'>Create your account </p>
                            </MDBCardBody>

                            <MDBCardBody className=' px-5  flex-column align-items-center mx-auto w-100'>
                                <MDBRow className='' col='12'>
                                <MDBCol col='6'>
                                    <strong>username</strong>
                                    <MDBInput 
                                        className='signupInput ' 
                                        name='username'
                                        placeholder='Enter username' 
                                        wrapperClass='mb-4' 
                                        type='text' 
                                    />
                                    </MDBCol>

                                    <MDBCol col='6'>
                                        <strong>Email</strong>
                                        <MDBInput 
                                            className='signupInput' 
                                            name='email' 
                                            placeholder='Enter your email' 
                                            wrapperClass='mb-4'  
                                            type='text' 
                                        />
                                    </MDBCol>
                                    
                                </MDBRow>
                                
                                <MDBRow>
                                    <MDBCol col='6'>
                                        <strong>First Name</strong>
                                        <MDBInput 
                                            className='signupInput' 
                                            name='firstName'
                                            placeholder='Enter first name' 
                                            wrapperClass='mb-4'  
                                            type='text' 
                                        />
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <strong>Last name(optional)</strong>
                                        <MDBInput 
                                            className='signupInput' 
                                            name='lastName'                                         
                                            placeholder='Enter last name'   
                                            type='text' 
                                        />
                                    </MDBCol>
                                </MDBRow>
                                
                                <MDBRow>

                                </MDBRow>
                            
                                
                                <MDBRow>
                                    <MDBCol col='6'>
                                        <strong>password</strong>
                                        <MDBInput 
                                            className='signupInput' 
                                            name='password'                                            
                                            placeholder='Enter password' 
                                            wrapperClass='mb-4'  
                                            type='password' 
                                        />
                                    </MDBCol>
                                    <MDBCol col='6'>
                                        <strong>Confirm password</strong>
                                        <MDBInput 
                                            className='signupInput' 
                                            name='confirmPassword'                                         
                                            placeholder='Confirm your password ' 
                                            wrapperClass='mb-4'  
                                            type='password' 
                                        />
                                    </MDBCol>
                                </MDBRow>
                               
                               
                                <button type='submit' className='loginBtn col-12'>Create</button>

                            </MDBCardBody>
                        </form>
                        <MDBCardBody className='signupbody mb-4 mb-5 d-flex flex-column align-items-center mx-auto w-100'>
                            <p className='mb-0'>Already have an account?</p>
                            <div className='d-flex col-11'>
                                <Link to='/login' className='loginBtn col-6'>Login</Link>
                                <Link to='/' className='loginBtn col-6'>Home</Link>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

    </>
  )
}

export default Signup










