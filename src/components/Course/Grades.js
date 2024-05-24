import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Courses from '../Course/Courses';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Auth/auth'
import Cookies from 'js-cookie'

const Grades = () =>{
    const { slug } = useParams();
    const token = Cookies.get('token')
    // const userRole = Cookies.get('userRole')
    // const auth = useAuth()
    // const token = auth.token  
    const [quizzes,setQuizzes] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER}/grades/${slug}`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            console.log(res)
            if(res.data.quizzes){
                setQuizzes(res.data.quizzes)
            }
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return(
        <>
        <div className='relative select-none'>
            <div className='sticky top-0 z-10 '>
                <Header />
            </div>
            <aside className="flex">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                    <Courses courseId={slug}/>
                </div>
                <div className='flex flex-col w-full'>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            Grades
                    </h1>
                    <hr className="w-3/5 mx-auto h-2 mb-5" />
                    
                    <div className='w-2/3 py-3 mx-auto border-t-2 border-l border-r bg-gray-800 border-gray-900 mt-12 justify-around flex flex-row'>
                        <h1 className='font-semibold text-gray-200 text-xl capitalize'>quiz name</h1>
                        <h1 className='font-semibold text-gray-200 text-xl capitalize'>marks obt.</h1>
                        <h1 className='font-semibold text-gray-200 text-xl capitalize'>total marks</h1>
                    </div>


                    <ul className='w-2/3  mx-auto border-b border-r border-l border-gray-900 divide-y divide-gray-900'>

                            {quizzes.map((user,key)=>{
                                return(
                                    <li className='mb-2'>
                                        
                                    {/* <div className='flex ml-5 items-center'> */}
                                        <div className="flex justify-around flex-row py-1  ">
                                            <p className=" capitalize text-lg text-gray-900 truncate">
                                                {user.quizName}
                                            </p>
                                            <p className="capitalize text-lg text-gray-900 truncate">
                                            {user.obtMarks}
                                            </p>
                                            <p className=" capitalize text-lg text-gray-900 truncate">
                                            {user.totalMarks}
                                            </p>
                                        </div>
                                    {/* </div> */}
                                    </li>
                                )
                            })}

                        </ul>
                        </div>
            </aside>
        </div>
        </>
    )
}

export default Grades;