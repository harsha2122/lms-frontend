import React, { useEffect, useState } from 'react'
// import Sidenav from "../../../../Layout/Sidenav"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import NewModule from './NewModule';
import toast from 'react-hot-toast';
import { useAuth } from '../../../../../Auth/auth';
import DropFileInput from '../../Drag_Drop/DropFileInput';
import Header from '../../../../Header'
import Courses from '../../../../Course/Courses';
import { ImageConfig } from '../../../../ImageConfig';
import '../.././Drag_Drop/drop-file-input.css';
import { AiOutlineClose } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import ConfirmBox from '../../../../ConfirmBox';
import { InfinitySpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import cc from '../../../../../assets/bg2.jpg'

const Module = (props) => {
    
    // const auth = useAuth()
    const token = Cookies.get('token')
    const userRole = Cookies.get('userRole')
    // const token = auth.token
    // const userRole = auth.user
    const Navigate = useNavigate();
    // Slug is the course id
    const { slug } = useParams();
    const URL = process.env.REACT_APP_SERVER
    const [showModal, setShowModal] = React.useState(false);
    const [modules, setModules] = useState([])
    const [Enroll, setEnroll] = useState(false)
    const [publish, setPublish] = useState()
    const [Title, setTitle] = useState()
    const [loader,setloader] = useState(true)
    const [image, setImage] = useState(null)
    const [file, setfile] = useState()
    const [Avatarpath,setAvatar] = useState(`${URL}/course/image/${slug}`)

    const createNewModule = ({ a }) => {

        axios.post(`${URL}/course/addModule/${slug}`, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    if (res.data.modules.length > 0) {
                        setModules(res.data.modules)
                        // console.log(res.data.modules)
                    }
                }).catch(err => console.log("error"))

                toast.success("Module Created");
            } else {
                toast.error("Unable to create Module")
            }
        }).catch(err => {
            toast.error("Unable to create Module")
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get(`${URL}/course/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(res)
            setloader(false)
            setPublish(res.data.published)
            setEnroll(res.data.enrolled)
            setTitle(res.data.name)
            setModules(res.data.modules)

        }).catch(err => {
            toast.error(err.message)
            setloader(false)
        })
    }, [])

    const handleSubmission = (id, selectedFile, content, Title) => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('Title', Title);
        formData.append('content', content);
        // console.log(selectedFile)
        // console.log(id,selectedFile,content,Title)

        if (id && (Title.length > 0) && (selectedFile || content.length > 0)) {
            // ${Lecture}/${id}
            console.log("post reques us bfibrib")
            axios.post(`${URL}/upload/${slug}/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                // console.log("This is response data", res.data);
                toast.success("Lecture added!")

                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    if (res.data.modules.length > 0) {
                        setModules(res.data.modules)
                        // console.log(res.data.modules)
                    }
                }).catch(err => console.log("error"))


            })
                .catch((error) => {
                    toast.error("There are some problem in network")
                    console.error('Error:', error);
                });
        } else {
            toast.error("Lecture must have a title and a content or file")
        }
    };

    const fileRemove = (ModuleId, LectureID) => {
        console.log("course id", slug, "id", ModuleId, "key", LectureID)
        var payload = {
            courseId: slug,
            moduleId: ModuleId,
            lecId: LectureID
        }
        axios.delete(`${URL}/lecture`, {
            headers: {
                'Authorization': token
            },
            data: payload
        }).then(res => {
            if (res.status === 200) {
                toast.success("Lecture Deleted")
                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    setModules(res.data.modules)

                }).catch(err => console.log("error"))
            }
            // console.log(res)
        }).catch(err => {
            toast.error(err.message)
        })
    }


    const onPublish = () => {
        axios.patch(`${URL}/course/publish`, {
            courseId: slug
        }, {
            headers: {
                'Authorization': token
            },
        }).then(res => {
            // console.log(res)
            setPublish(!publish)
        }).catch(err => {
            console.log(err)
            toast.error(err.message)
        })
        // console.log(slug)
    }

    const EnrolCourse = () => {
        // e.preventDefault()
        axios.patch(`${URL}/user/purchase`, {
            courseId: slug
        }, {
            headers: {
                'Authorization': token
            },
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                setEnroll(true)
                toast.success(res.data)
            }
            // console.log(res)
        }).catch(err => {
            toast.error(err.response.data)
            // console.log(err)
        })

    }

    const onPageOpen = (moduleItem, lecItems) => {
        if (Enroll || userRole === "Admin" || userRole==="Educator") {
            Navigate(`/Page`, {
                state: {
                    type: lecItems.type.split('/')[1],
                    lectures: modules,
                    lectureId: lecItems._id,
                    courseId: slug,
                    moduleId: moduleItem._id,
                    Title: lecItems.name
                }
            })
        } else {
            toast.error("Please Enroll the course")
        }
    }

    const DeleteModule = (ModuleId) => {
        // console.log("course id",slug,"id",ModuleId)
        var payload = {
            courseId: slug,
            moduleId: ModuleId
        }
        axios.delete(`${URL}/course/deleteModule`, {
            headers: {
                'Authorization': token
            },
            data: payload
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                console.log(res)
                toast.success("Module Deleted")
                axios.get(`${URL}/course/${slug}`, {
                    headers: {
                        'Authorization': token
                    }
                }).then(res => {
                    console.log(res)
                    setModules(res.data.modules)

                }).catch(err => console.log(err))
            }
            // console.log(res)
        }).catch(err => {
            toast.error(err.message)
        })
    }

    const DeleteCourse = () => {


        axios.delete(`${URL}/course/${slug}`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                toast.success('Course Deleted')
                Navigate('/')
            }

        }
        )
        setShowModal(!showModal)
    }

    const handleimageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setfile(event.target.files[0])
            setImage(window.URL.createObjectURL(event.target.files[0]));
            }
    }

    const handleImageSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        
        axios.post(`${URL}/course/image/${slug}`, formData, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            toast.success(res.data)
            setAvatar(image)
            setfile(null)
            // console.log(image)
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

    }


    return (
        <>

            <div className='relative overflow-x-hidden'>
            <div className='sticky top-0 z-50'>
                <Header />
                </div>
                <aside className="flex flex-row w-full">
                    {/* <Sidenav /> */}

                    {
                        (!loader && (Enroll || userRole === "Admin" || userRole==="Educator")) ? (
                            <div className='flex flex-row sticky top-24 z-20 left-0 -mt-6 '>
                                <Courses courseId={slug} />
                            </div>) : null
                    }

                    {loader?
                        <div className="mx-auto">
                            <InfinitySpin 
                            width='200'
                            color="#4fa94d"
                            />
                        </div>:
                        <div className='flex flex-col mb-32 w-4/5 mx-auto'>
                        <div className=" select-none capitalize text-3xl text-black font-semibold py-6 mx-auto">
                            {Title}
                        </div>
                        <hr className="w-3/5 mx-auto h-2 mb-6" />
                        {
                            (userRole === "Admin"|| userRole === "Educator") ?
                                (<div className='flex select-none flex-col md:pl-40 lg:flex-row md:space-x-8 w-full justify-center mx-auto '>
                                    <div className='w-1/4  px-2 h-40 sm:h-64 flex-shrink-0 border-r-2 border-gray-500 mb-20 relative '>
                                        <div className='w-64  h-40 sm:w-96 sm:h-64 mx-auto md:-ml-32 group justify-items-end relative'>
                                            <div className='absolute invisible group-hover:visible group-hover:delay-100 duration-200 transition-all group-hover:backdrop-blur-sm w-96 h-64 rounded-xl '>
                                                <MdAddAPhoto size={60} className="sm:ml-40 sm:mt-24 ml-20 mt-12 absolute text-white z-20" />
                                                <input className="opacity-0 w-64  h-40 sm:w-96 sm:h-64 " type="file" accept='image/*' onChange={handleimageChange}/> 
                                                <div className="bg-black h-64 opacity-50 fixed inset-0 -z-10 rounded-xl "></div>
                                            </div>
                                            <img className="sm:w-96 h-full w-64 mx-auto  rounded-xl" src={cc} alt="course image" />
                                            
                                        </div>
                                        
                                        {/* <img className="w-full h-full  rounded-xl" src={Avatarpath} alt="course image" /> */}
                                        
                                        <button className="bg-blue-600 my-4 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md" onClick={handleImageSubmit}>
                                            Upload
                                        </button>
                                    </div>
                                    <div className='flex flex-col justify-start space-y-8 '>
                                        <div className='w-64 flex ml-20'>
                                            <button
                                                className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500  focus:outline-none text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-2 rounded-md shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={onPublish}>{publish ? "UnPublish" : "Publish"}
                                            </button>
                                        </div>
                                        <div className='w-64 ml-20 flex'>
                                        {(userRole === "Admin")?<button
                                                className="bg-gradient-to-r from-red-500 to-red-600  focus:ring-red-4 focus:outline-none transition duration-150 ease-out text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none  mr-1 mb-10"
                                                type="button"
                                                onClick={() => setShowModal(true)}
                                            >delete course
                                            </button>:null}
                                        </div>
                                        <div className=''>
                                            <NewModule createNewCourse={createNewModule} />
                                        </div>
                                    </div>
                                </div>) : null
                        }

                        {showModal ? (
                            <ConfirmBox Delete={DeleteCourse} setShowModal={setShowModal} content={"Are you sure you want to delete this Course?"}/>
                        )
                         : null}

                        {modules.length>0 ? (modules.map((item, key) => {

                            return (

                                <div className="container flex flex-col px-1 md:px-6 mx-auto p-4 border-blue-500">
                                    <details className="w-3/4 mx-auto py-2 bg-gray-50 hover:bg-gray-100 border-l-4 rounded-r-xl transition ease-in-out max-h-max duration-300 border-blue-700">

                                        <summary className="item__preview__mod select-none px-10 capitalize text-xl text-black font-semibold py-5">
                                            ➤ &ensp;  {item.name}
                                            {(userRole === "Admin" || userRole==="Educator") && <button className='item__preview__mod__del  float-right bg-red-500 pt-1 pl-1 text-white font-bold text-lg -mt-1 h-8 w-8  rounded-full' onClick={() => DeleteModule(item._id)}>
                                                <span>
                                                    <AiOutlineClose size={20} className="ml-0.5 mb-1 text-white" />
                                                </span>
                                            </button>}
                                        </summary>



                                        {
                                            item.lectures.map((items, key) => {
                                                return (
                                                    <React.Fragment key={key}>
                                                        <button className="drop-file-preview__item text-lg font-light capitalize mx-auto" style={{ width: "60%" }} >

                                                            <div className="flex flex-row drop-file-preview__item__details mx-auto mr-12 ml-4"
                                                                style={{ width: "100%" }}
                                                                onClick={() => onPageOpen(item, items)
                                                                }>
                                                                <img className="opacity-70 w-16" src={ImageConfig[items.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                                                <div className="drop-file-preview__item__info invisible sm:visible " >
                                                                    <h2>{items.name}</h2>
                                                                    {/* <p>{items.size}B</p> */}
                                                                </div>
                                                            </div>
                                                            {(userRole === "Admin" || userRole==="Educator") && <span className="drop-file-preview__item__del" onClick={() => fileRemove(item._id, items._id)}><AiOutlineClose /></span>}
                                                        </button>
                                                    </React.Fragment>
                                                )
                                            })
                                        }



                                        {
                                            (userRole === "Admin" || userRole==="Educator") &&
                                            <div className='flex flex-col'>
                                                <hr className='bg-black my-4'/>
                                                <DropFileInput handleSubmission={handleSubmission} id={item._id} file={true} />
                                            </div>
                                        }
                                    </details>
                                </div>
                            )
                        })) : (
                            <div>
                                <h1 className='px-6 select-none capitalize text-3xl text-gray-700 font-semibold py-6 mx-auto' style={{ textAlign: "center" }}>
                                    There are no modules
                                </h1>
                            </div>
                        )
                        }

                        {((userRole === "Student") && (!Enroll)) ? (<div className='w-56 mx-auto'>
                            <button
                                className="bg-gradient-to-r mb-9 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none  mr-1  ease-linear transition-all duration-150"
                                type="button"
                                onClick={EnrolCourse}>Enroll Now
                            </button>
                        </div>) : null}

                    </div>}

                </aside>

            </div>
        </>
    )
}

export default Module;