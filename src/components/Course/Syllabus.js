import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../Header'
import Courses from '../Course/Courses';
import JoditEditor from 'jodit-react';
import Cookies from 'js-cookie'
import astro  from '../../assets/astronaut-1.svg'

const Syllabus = (props) => {
    // const location = useLocation();
    const token = Cookies.get('token')
    const userRole = Cookies.get('userRole')
    // const auth = useAuth()
    // const token = auth.token
    // const userRole = auth.user
    const editor = useRef(null)
    const [content, setContent] = useState('')
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER

    useEffect(() => {
        axios.get(`${URL}/course/syllabus/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                setContent(res.data)
            }
        }).catch(err => console.log(err))
    }, [])


    const handleSubmission = () => {
        const data = {
            'syllabus': content
        }
        console.log(content)
        // console.log(id,selectedFile,content,Title)
        axios.post(`${URL}/course/syllabus/${slug}`, data, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            toast.success("Syllabus added!")
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
                    {/* <Sidenav /> */}
                    <div className='flex -mt-6 '>
                        <Courses courseId={slug} />
                    </div>
                    <div className='flex flex-col w-full'>
                        <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            syllabus
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />

                        <div
                            className='mx-auto text-2xl mb-8'
                            dangerouslySetInnerHTML={{ __html: content }}
                        />

                        {
                            (userRole === "Admin" || userRole==="Educator") ? (
                                <div className='w-4/5 mt-4 mb-8 mx-auto'>
                                <JoditEditor 
                                    style={{height:"200px"}}
                                    ref={editor}
                                    value={content}
                                    onChange={newContent=>{
                                                setContent(newContent)
                                            }}
                                 />
                                <div>
                                    <button className="appearance-none w-36 block mx-auto bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none   ease-linear transition-all duration-150" id="update" type="submit" onClick={handleSubmission}>Submit</button>
                                </div>
                            </div>):(
                                <div>
                                    <h1 className='mt-6 mb-4 capitalize text-4xl text-gray-600 mx-auto font-semibold' style={{ textAlign: "center" }}>
                                        no syllabus uploaded
                                    </h1>
                                    <img className='w-80 h-80 mx-auto' src={astro} />
                                </div>
                            )
                        }
                        
                    </div>

                </aside>


            </div>
        </>
    )
}

export default Syllabus;