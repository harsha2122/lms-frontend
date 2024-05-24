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
import {useLocation} from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";
import {MutatingDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'

const Module = (props) => {    
    
    
    const location = useLocation();
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
    const [AssignmentList, setAssignment] = useState([])    
    const [Error,setError] = useState(false)


    useEffect(() => {       
        axios.get(`${URL}/assignment/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
                console.log(res.data)
                setAssignment(res.data)
                setloader(false)
        }).catch(err => {
            toast.error(err.message)
            setloader(false)
            setError(true)
        })
    },[])


    const handleSubmission = (id,selectedFile,content,Title) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('title', Title);
        formData.append('content', content);
        formData.append('courseId', slug);
        
        // console.log(selectedFile)
        // console.log(id,selectedFile,content,Title)
        
        if (id&&(Title.length>0)&&(selectedFile||content.length>0)) {
            
            axios.post(`${URL}/assignment`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res);
                toast.success("Assignment added!")

                axios.get(`${URL}/assignment/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    // if (res.data.modules.length > 0) {
                        setAssignment(res.data)
                        // console.log(res.data.modules)
                    // }
                }).catch(err => console.log("error"))

                
            })
                .catch((error) => {
                    toast.error(error.message)
                    console.error('Error:', error);
                });
        } else {
            toast.error("Lecture must have a title and a content or file")
        }
    };

    const fileRemove = (AssignmentId) =>{

        axios.delete(`${URL}/assignment/${AssignmentId}`,{
            headers: {
                'Authorization': token
            }
        }).then(res=>{
            if(res.status === 200){
                toast.success("Assignment Deleted")
                axios.get(`${URL}/assignment/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.status===200){
                        setAssignment(res.data)
                    }
                }).catch(err => console.log(err))
                
            }
            console.log(res)
        }).catch(err=>{
            toast.error(err.message)
        })
    }


    const onPageOpen = (title,content,id,hasFile) =>{
        // if(Enroll || userRole==="Admin"){
            console.log(title,id,hasFile)
            Navigate(`/assignment/page/${id}`,{state:{
                // type:lecItems.type.split('/')[1], 
                // lectures:modules, 
                Title:title,
                content:content,
                hasFile:hasFile
            }}) 
        // }else{
        //     toast.error("Please Enroll the course")
        // }
    }


    return (
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
                           assignment
                    </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                    
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
                        (AssignmentList.length>0 ? (AssignmentList.map((item,key) => {

                            return (
                                <div className="container flex flex-col  px-5 mx-auto p-4">
                                    <div className='flex w-4/5 group mx-auto select-none h-max py-6 px-6 mb-10 flex-col rounded-lg bg-[linear-gradient(135deg,_#ffe4e1_50%,_#f5f5dc_40%)] text-black' onClick={()=>{onPageOpen(item.title,item.content,item._id,item.hasFile)}}>
                                        <div className='flex flex-row'>
                                            <h1 className=' select-none px-7 mb-3 capitalize text-3xl text-black font-semibold mx-auto'>
                                                {item.title}
                                            </h1>
                                            {(userRole === "Admin" || userRole==="Educator") ?
                                                <span className=" float-right ease-in-out transition-all duration-200 delay-150 invisible group-hover:visible bg-red-500 rounded-full w-8 h-8  text-white" onClick={() => fileRemove(item._id)}>
                                                    <AiOutlineClose size={23} className="mx-auto mt-1" />
                                                </span> : null}
                                        </div>
                                    </div>
                                </div>

                            )
                        })) : (
                            <div>
                                <h1 className='mt-6 mb-4 capitalize text-gray-500 text-4xl mx-auto font-semibold' style={{ textAlign: "center" }}>
                                    There are no Assignments
                                </h1>
                            </div>
                        ))
                    }  
                    
                    {
                        !loader && !Error && (userRole === "Admin" || userRole==="Educator")?(
                            
                        <div className='flex flex-col'>
                            <hr className='mb-4 w-4/5 mx-auto'/>
                                <DropFileInput handleSubmission={handleSubmission} id={slug} file={true}/>
                        </div>):null
                    }
                    
                
                    </div>
                    
                </aside>
                
                
                </div>
        </>
    )
}

export default Module;