import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useAuth } from '../Auth/auth';
import toast from 'react-hot-toast';

function Login() {

  const auth = useAuth()
  const Navigate = useNavigate();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const URL = process.env.REACT_APP_SERVER
  const [loading,setloading] = useState(false)

  const mystyle = {
    opacity : loading ? 0.5 : 1
  };
  const NavigateToRegister = () => {
    Navigate('/register');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true)
    const data = {
      email: email,
      password: password,
    }

    axios.post(`${URL}/login`, data).then(res => {
      console.log(res)
      setloading(false) 
      if (res.data.status === "Authorised") {
        auth.login(res.data)
        Navigate('/');
      }

      else {
        toast.error("Invalid credentials")
      }
    }).catch(err => {
      setloading(false) 
      if (err.response.status === 401) {
        toast.error(err.response.data)
      } else {
        toast.error(err.message)
      }
    });
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
            <h1 className="text-4xl w-auto md:w-80 mx-auto font-bold text-center mb-12 cursor-pointer" >
              Login
            </h1>
            <hr className='mb-8 -mt-4' />
            <p className=" text-center mx-auto text-md mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Welcome Back
            </p>
          </div>
          <form action=''>
            <div className="space-y-4">
              <input 
                    type="email"
                    autoComplete='off' 
                    placeholder="Email Address" 
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" 
                    value={email} 
                    onChange={(e) => setemail(e.target.value)} />
              <input 
                    type="password" 
                    autoComplete='off' 
                    placeholder="Password" 
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" 
                    value={password} onChange={(e) => setpassword(e.target.value)} />
            </div>
          </form>
          <div className="text-center mt-6">
            <button 
                  onClick={handleSubmit} 
                  className="py-3 w-48 text-xl text-white bg-green-500 rounded-2xl hover:bg-green-600 active:bg-green-600"
                  disabled={loading}
                  style={mystyle}
                  >
              Sign in
            </button>
            
            <p className="mt-4 text-sm">Need An Account? <span><button onClick={NavigateToRegister} className="py-3 w-50px text-l text-gray-700 bg-gray-100 rounded-2xl">Sign up</button></span>
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Login;
