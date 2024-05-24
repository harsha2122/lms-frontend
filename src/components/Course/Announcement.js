import React, { useEffect, useState } from 'react'
import Sidenav from "../Layout/Sidenav"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Auth/auth';
import DropFileInput from '../Admin/AdminDashboard/Drag_Drop/DropFileInput';
import Header from '../Header'
import Courses from '../Course/Courses';
import { ImageConfig } from '../ImageConfig';
import { useLocation } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai"; 
import {MutatingDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'

const Announcement = () => {
    const [showModal, setShowModal] = React.useState(false);
    const token = Cookies.get('token')
    const userRole = Cookies.get('userRole')
    // const auth = useAuth()
    // const token = auth.token
    // const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER
    const [loader,setloader] = useState(true)
    const [AnnouncementList, setAnnouncementList] = useState([])


    useEffect(() => {

        axios.get(`${URL}/announcement/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                setAnnouncementList(res.data)
                setloader(false)
            }
        }).catch(err => {
            setloader(false)
            toast.error(err.message)
        })
    }, [])


    const handleSubmission = (id, content, Title) => {

        const data = {
            'title': Title,
            'content': content,
            'courseId': slug
        }

        axios.post(`${URL}/announcement`, data, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            toast.success("Announcement added!")
            console.log(res)
            axios.get(`${URL}/announcement/${slug}`, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    setAnnouncementList(res.data)
                }
            }).catch(err => console.log(err))


        }).catch((err) => {
            toast.error(err.message)
            console.error('Error:', err);
        });
        setShowModal(!showModal)

    };

    const fileRemove = (AnnouncementId) => {

        axios.delete(`${URL}/announcement/${AnnouncementId}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if (res.status === 200) {
                toast.success("Announcement Deleted")
                axios.get(`${URL}/announcement/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        setAnnouncementList(res.data)
                    }
                }).catch(err => console.log(err))

            }
            console.log(res)
        }).catch(err => {
            toast.error(err.message)
        })
    }

    return (
        <>
            <div className='relative'>

                <div className='sticky top-0 z-10 '>
                    <Header />
                </div>
                <aside className="flex">
                    <div className='flex -mt-6 '>
                        <Courses courseId={slug} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            announcement
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        <div className='flex flex-row w-4/5 px-10 mx-auto justify-between'>
                            <div className='flex flex-col '>
                                <h2 className='mt-5 mb-2 text-xl  capitalize'>
                                    Genral News and Announcement
                                </h2>
                                <hr className='w-full  h-3' />
                            </div>
                            
                            {(!loader && (userRole === "Admin" || userRole==="Educator")) ?
                                <div className='flex '>
                                    <button className='bg-blue-600 text-white active:bg-blue-400 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150' onClick={() => setShowModal(true)}>Announce</button>
                                </div> : null}
                            {showModal ? (
                                <div className='w-full z-50 backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-scroll scrollbar-hide fixed inset-0 outline-none focus:outline-none'>
                                    <div className='flex flex-col my-10 pb-4  rounded-3xl  shadow-2xl relative bg-gray-100 outline-none focus:outline-none w-2/3'>
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-600 rounded-t">
                                            <h3 className="capitalize select-none text-4xl text-black font-semibold  mx-auto">
                                               New announcement
                                            </h3>
                                            <span className='flex items-center justify-end '>
                                                <button
                                                    className="text-white rounded-md bg-red-500 font-bold uppercase px-4 py-2 text-md outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}>
                                                    <AiOutlineClose size={23} />
                                                </button>
                                            </span>

                                        </div>
                                        <DropFileInput handleSubmission={handleSubmission} id={slug} />                                        
                                    </div>
                                    <div className="bg-black opacity-50 fixed inset-0 -z-10 "></div>
                                </div>
                                
                            ) : null}
                        </div>

                        {loader?
                            <div className="mx-auto">
                                <MutatingDots 
                                height="100"
                                width="100"
                                color="#4fa94d"
                                secondaryColor= '#4fa94d'
                                radius='12.5'
                                ariaLabel="mutating-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                           </div>:
                        (AnnouncementList.length > 0 ? (AnnouncementList.map((item, key) => {

                            return (

                                <div className="container flex flex-col  px-5 mx-auto p-4">
                                    <div className='flex w-4/5 group mx-auto select-none h-max py-6 px-6 mb-10 flex-col rounded-lg bg-[linear-gradient(135deg,_#ffe4e1_50%,_#f5f5dc_40%)] text-black'>
                                        <div className='flex flex-row'>
                                            <h1 className=' select-none px-7 mb-3 underline underline-offset-8 capitalize text-3xl text-black font-semibold mx-auto'>
                                                {item.title}
                                            </h1>
                                            {(userRole === "Admin" || userRole==="Educator") ?
                                                <span className=" float-right ease-in-out transition-all duration-200 delay-150 invisible group-hover:visible bg-red-500 rounded-full w-8 h-8  text-white" onClick={() => fileRemove(item._id)}>
                                                    <AiOutlineClose size={23} className="mx-auto mt-1" />
                                                </span> : null}

                                        </div>

                                        <div
                                            className='ml-12 mr-12 mb-8 text-lg mt-4 '
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    </div>
                                </div>
                            )
                        })) : (
                            <div>
                                <h1 className='mt-6 mb-4 capitalize text-3xl mx-auto font-semibold text-gray-500' style={{ textAlign: "center" }}>
                                    There are no Announcements
                                </h1>
                            </div>
                        )
                        )
                    }

                    </div>

                </aside>


            </div>
        </>
    )
}

export default Announcement;