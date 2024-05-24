import React from 'react'
import Header from '../Header'
import Sidenav from '../Layout/Sidenav'
import Courses from './Courses'
import {useState, useEffect} from 'react'
import { useAuth } from '../../Auth/auth'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'


function Students() {
    const URL = process.env.REACT_APP_SERVER
    // const auth = useAuth()
    // const token = auth.token
    // const userRole = auth.user
    const token = Cookies.get('token')
    const userRole = Cookies.get('userRole')
    const {slug} = useParams()
    const [stud,setStud] = useState([]);

    useEffect(()=>{
        
        axios.get(`${URL}/course/students/${slug}`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            setStud(res.data)
            // console.log(res.data)
        }).catch(e=>console.log(e))
    },[])
    

    const DeleteStud = (id) =>{
        
        axios.patch(`${URL}/user/unenroll/${slug}/${id}`,{
            headers: {
                'Authorization': token
            }}).then(res=>{
                console.log(res)
                if(res.status === 200){
                    toast.success('Student Removed')
                    axios.get(`${URL}/course/students/${slug}`,{
                        headers: {
                            'Authorization': token
                        }
                    }).then(res=>{
                        setStud(res.data)
                        // console.log(res.data)
                    }).catch(e=>console.log(e))
                }

                }
        )
    }



    return (
        <div className='relative'>
            <div className='sticky top-0 z-10 '>
                <Header />
            </div>
            <aside className="flex flex-row ">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                        <Courses courseId={slug}/>
                    </div>
                {(userRole === "Admin" || userRole==="Educator")?
                    <div className='flex flex-col w-full'>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            enrolled students
                    </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                    <ul className='w-2/3 mt-12 mx-auto border-2 border-gray-900 divide-y divide-gray-900'>
                        
                        
                        {stud.map((user,key)=>{
                            return(
                                <li className='mb-2'>
                                <div className='flex ml-5 items-center'>
                                    <div className='flex mt-2'>
                                        <img className='w-16 h-16 rounded-full' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg">
                                        </img>
                                    </div>
                                    <div className="flex-1 ml-4 ">
                                        <p className="text-lg font-medium text-gray-900 truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-md text-gray-600">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex mr-6 text-lg font-semibold text-gray-900">
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg" 
                                        onClick={() => DeleteStud(user._id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                            )
                        })}
                        
                        {/* <li className='mt-2 mb-2'>
                            <div className='flex ml-3 items-center'>
                                <div className='flex'>
                                    <img className='w-16 h-16 rounded-full' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg">
                                    </img>
                                </div>
                                <div class="flex-1 ml-4 ">
                                    <p class="text-lg font-medium text-gray-900 truncate">
                                        Tanmay Singh
                                    </p>
                                    <p class="text-md text-gray-600">
                                        tanmay@.com
                                    </p>
                                </div>
                                <div class="inline-flex mr-6 text-xl font-semibold text-gray-900">
                                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li> */}

                        

                    </ul>
                </div>
               :null}
            </aside>
        </div>
    )
}

export default Students
