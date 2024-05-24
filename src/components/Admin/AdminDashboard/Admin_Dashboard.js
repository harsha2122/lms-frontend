import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../Auth/auth"
import Card from "../../Card/Card"
import Sidenav from "../../Layout/Sidenav"
import classes from "./Admin_Dashboard.module.css"
import Create_Course from "./CreateCourse/Create_Course"
import Header from '../../Header'
import { InfinitySpin } from 'react-loader-spinner'

const Admin_Dashboard = () => {

    const auth = useAuth()
    const backendServer = process.env.REACT_APP_SERVER
    const [Course, setCourse] = useState([])
    const token = auth.token
    const userRole = auth.user
    const Navigate = useNavigate();
    const [loader,setloader] = useState(true)

    useEffect(() => {
        // console.log(token)
        axios.get(`${backendServer}/course/all`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            setCourse(res.data)
            setloader(false)
        }).catch(err=>{
            toast.error(err.message)
            setloader(false)
        })
    }, [])


    const onPublish = (item) => {
        // e.preventdefault()
        const id = item._id
        // const publish = item.published
        Navigate(`/course/${id}`)
        // ,{state:{Publish:publish,item:item}}
        // console.log({id},"Clicked")
    }



    const createNewCourse = async ({ a }) => {

        // console.log(a)
        // const fd = new FormData();
        // fd.append('image',a)

        await axios.post(`${backendServer}/course`, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(a)
            // setCourse(Course => [...Course, a]);
            toast.success("Course created")
            axios.get(`${backendServer}/course/all`, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res.data)
                setCourse(res.data)
                // console.log(Course) 
            })
        }).catch(err => {
            toast.error("Course not created")
            console.log("err")
        })
        // console.log(unpublished_course)    
    }


    // const [CourseToggle, setCourseToggle] = useState(false)

    return (
        <div className='relative '>
           
            <div className='sticky top-0 z-50'>
                <Header />
                </div>
                <aside className="flex flex-row ">
                        {/* <Sidenav /> */}
                    <div className='flex flex-col w-full'>
                        {userRole==="Admin"?
                            <Create_Course createNewCourse={createNewCourse} className="float-right"/>:null
                        }
                        <hr className="w-1/3 mx-auto h-1  bg-black mt-5 drop-shadow-2xl"/>
                        <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            published courses
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
                                {Course.length>0?(Course.filter(item => {
                                    return item.published === true
                                }).map((item,key) => {
                                    return (
                                        <Card key={key} item={item} Button="Edit" onPublish={onPublish} />
                                    )
                                })):null}
                            </div>
                        </div>
                        }

                        <h1 className='mt-6 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                           unpublished courses
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        
                        {loader?
                        <div className="mx-auto">
                            <InfinitySpin 
                            width='200'
                            color="#4fa94d"
                            />
                        </div>:
                        <div className=" flex-shrink-0 flex grid-flow-col justify-items-center px-4 w-full">
                            <div className="mx-auto md:w-full justify-center grid grid-col-1 shrink-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl lg:mx-auto w-full py-6">
                                {Course.filter(item => {
                                    return item.published === false
                                }).map((item,key) => {

                                    return (
                                        <Card item={item} Button="Edit" key={key} onPublish={onPublish} />
                                    )
                                })}
                            </div>
                        </div>
                        }
                    </div>
                </aside>
            </div>
        
    )
}

export default Admin_Dashboard;