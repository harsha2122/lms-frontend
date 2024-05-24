import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from "react";
import {useState} from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import validator from 'validator'


function Register() {
    
    const Navigate = useNavigate();
    const NavigateToLogin = () => {
        Navigate('/Login');
      };
    const URL = process.env.REACT_APP_SERVER
    const [username,setusername] = useState("")
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")    
    const [Cpassword,setCpassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const [phone,setPhone] = useState("")
    const [passFlag,setPassFlag] = useState(false)
    const [loading,setloading] = useState(false)

    const mystyle = {
        opacity : loading ? 0.5 : 1
      };

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('')          
            setPassFlag(true)
        }
        else if(value==''){
            setErrorMessage('')
            setPassFlag(false)
        }
        else{
            setErrorMessage('Password is invalid')
            setPassFlag(false)
        }
        }

    function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            name:username,
            password:password,
            confirm_password:Cpassword,
            email:email,
            phone:phone
        }
        if (password !== Cpassword ){
            console.log("")
            toast.error("Password didn't match")
        }
        else if (username.length<3){
            console.log("")
            toast.error("Incorrect name")
        }
        else if(!passFlag){
            toast.error("Password must be 8 to 20 digit long and have atleast one uppercase, one lower case alphabet, one number and one special character ")
        }
        else if (!isValidEmail(email)) {
            toast.error('Email is invalid');
          } 
        else if(phone.length != 10){
            toast.error("Invalid Number")
        }
        else{
            setloading(true)
            axios.post(`${URL}/register`,data).then(
                res=>{
                    // console.log(res)
                    setloading(false)
                    if(res.status === 201){
                        toast.success("registered")
                        NavigateToLogin()
                    }
                    else{
                        toast.error(res.data._message)
                    }
                }
                ).catch(e=>{
                    toast.error(e.message)
                    setloading(false)
                })
            // console.log(data)
        }
        
    }
    return (
        <div className='overflow-hidden'>
            <div className="min-h-screen w-full flex-shrink-0 bg-white flex justify-center items-center">
                <div className='relative invisible md:visible '>
                    <div className="absolute -top-80 -left-60 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-purple-300 animate-blob rounded-full"></div>
                    <div className="absolute -top-0 -right-20 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-yellow-300 animate-blob animation-delay-2000 rounded-full"></div>
                    <div className="absolute -top-40 left-96 w-96 h-96 mix-blend-multiply filter blur-2xl opacity-80 bg-pink-300 animate-blob animation-delay-4000 rounded-full"></div>
                </div>
                <div className="px-4 py-4 md:py-12 flex flex-shrink-0 flex-col w-4/5 md:w-auto md:px-16 bg-gray-100 rounded-2xl shadow-xl opacity-90 z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Register</h1>
                        <hr className='mb-4'/>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-900 tracking-wide cursor-pointer">Register and
                            enjoy all the services</p>
                        {/* <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer" style={{color:"#FF0000"}}>{warning}</p> */}
                    </div>
                    <form method='post'>
                    <div className="space-y-4">
                        <input type="text" autoComplete='off' required placeholder="Full Name" maxLength="28" value={username.name} onChange={(e)=> setusername(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        
                        <input type="email" autoComplete='off' required placeholder="Email Address" maxLength="40" value={email.email} onChange={(e)=> setemail(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"  />
                        
                        <input type="password" 
                            autoComplete='off' 
                            placeholder="Password" 
                            maxLength="20" 
                            minLength="6" 
                            value={password.password} 
                            onChange={(e)=> {
                                validate(e.target.value)
                                setpassword(e.target.value)
                                }} 
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"  />
                            <br />
                            {errorMessage === '' ? null :
                            <span style={{
                            fontWeight:'bold',
                            color: 'red',
                            fontSize:'14px'
                            }}>{errorMessage}</span>}

                        
                        <input 
                            type="password" 
                            autoComplete='off' 
                            maxLength="20" 
                            minLength="6" 
                            placeholder="Confirm password" 
                            value={password.Cpassword} 
                            onChange={(e)=> {
                                setCpassword(e.target.value)
                                }} className="block text-sm py-3  px-4 rounded-lg w-full border outline-none"  />
                        
                        <input type="tel"  autoComplete='off' maxLength="10" placeholder="Phone" value={phone} onChange={(e)=> setPhone(e.target.value)} className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                            </div>
                    </form>
                    
                    <div className="text-center mt-6">
                        <button 
                            onClick={handleSubmit} 
                            className="py-3 w-64 text-xl text-white bg-green-500 rounded-2xl hover:bg-green-600 active:bg-green-600"
                            disabled={loading}
                            style={mystyle}
                            >
                                Submit
                        </button>
                        <p className="mt-4 text-sm">Already Have An Account? <span><button onClick={NavigateToLogin} className="py-3 w-50px text-l text-gray-900 bg-gray-100 rounded-2xl">Sign in</button></span>
                        </p>
                    </div>
                </div>
            
            </div>
            </div>
    )
}

export default Register;