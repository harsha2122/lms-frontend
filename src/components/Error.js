import React from 'react'
import Header from './Header'
// import { FcList } from "react-icons/fc";
import Image from '../assets/404.png'
import {Link} from 'react-router-dom'

const Error = () =>{
    return(
        <div className='relative'>
            {/* <div className='sticky top-0 z-20'>
                <Header />
            </div> */}
            <div className='flex flex-col w-4/5 mx-auto'>
                <h1 className='mt-2 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                    404 Error Page
                </h1>
                <img src={Image} className='mx-auto' height="30%" width="30%"/>
                <Link
                className="bg-green-600 text-white active:bg-green-400 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                type="button"
                to='./'
                >
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default Error