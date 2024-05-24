import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from '../Card/Card'
// import Sidenav from '../Layout/Sidenav'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/auth';
import Header from '../Header'
import image from '../../assets/bg1.jpg'
import {InfinitySpin} from 'react-loader-spinner'

function Dashboard() {
    const auth = useAuth()
    const [token, setToken] = useState(auth.token)
    const Navigate = useNavigate()
    const backendServer = `${process.env.REACT_APP_SERVER}/course/all`
    const [course,setCourse] = useState([])
    const [loader,setloader] = useState(true)

    useEffect(()=>{
        auth.isAuthenticate()
    },[])
    
    useEffect(() => {
        axios.get(backendServer, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(res)
            setloader(false)
            if (res.data) {
                setCourse(res.data)
                console.log(res.data)
            }
            // console.log(res.data) 
        }).catch(err=>{
            setloader(false)
        })
    }, [])


    const Purchase = (item) => {
        // e.preventdefault()
        const id = item._id
        Navigate(`/course/${id}`)
        
    }

    return (
        <div className='relative '>
            <div className='sticky top-0 z-50 '>
                <Header />
            </div>
            
            <div className="flex flex-row ">
                <div className='flex flex-col w-full'>
                     <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            Popular courses
                     </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        {loader?
                            <div className="mx-auto">
                                <InfinitySpin 
                                width='200'
                                color="#4fa94d"
                                />
                            </div>:
                            <div className=" flex-shrink-0 flex  grid-flow-col justify-items-center px-4 w-full">
                                <div className="mx-auto md:w-full  grid grid-col-1 shrink-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:mx-auto w-full py-6">
                                {course.map((item, key) => {

                                    return (
                                        <Card item={item} key={key} Button="Purchase" onPublish={Purchase} />
                                    )
                                })
                                }
                                </div>
                            </div>
                        }
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            recommended courses
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        {loader?
                        <div className="mx-auto">
                            <InfinitySpin 
                            width='200'
                            color="#4fa94d"
                            />
                        </div>:
                        <div className=" flex-shrink-0 flex  grid-flow-col justify-items-center px-4 w-full">
                            <div className="mx-auto md:w-full  grid grid-col-1 shrink-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:mx-auto w-full py-6">
                            {course.map((item, key) => {
                                const button = item.enrolled?"Purchase":"open"
                                return (
                                    <Card item={item} key={key} Button={button} onPublish={Purchase} />
                                )
                            })}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;