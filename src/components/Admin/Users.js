import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../Auth/auth'
import Header from '../Header'
import Sidenav from '../Layout/Sidenav'
import { toast } from 'react-hot-toast'
import Cookies from 'js-cookie'
import {MutatingDots} from 'react-loader-spinner'

function Users() {
    
    const URL = process.env.REACT_APP_SERVER
    // const auth = useAuth()
    const token = Cookies.get('token')
    const [user, setUser] = useState([])
    const [loader,setloader] = useState(true)
    useEffect(() => {
        console.log(token)
        axios.get(`${URL}/user`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            setUser(res.data)
            setloader(false)
            // console.log(res.data)
        }).catch(err=>{
            // toast.error("Hello")
            console.log(err)
            if(err.response.status === 401){

                toast.error( err.response.data)
            }else{
                toast.error(err.message)
            }
        })
    }, [])


    const UpdateRole = (e, key) => {
        let usrArr = [...user]

        usrArr[key].role = e.target.value
        setUser(usrArr)

    }

    const SubmitRole = (e, key) => {
        e.preventDefault()
        const usr = user[key]
        axios.patch(`${URL}/profile`, usr, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            toast.success(res.data)
        })
    }


    const RemoveUser = (e, userId) => {
        e.preventDefault()

        var payload = {
            userId: userId
        }
        axios.delete(`${URL}/user`, {
            headers: {
                'Authorization': token
            },
            data: payload
        }).then(res => {
            if (res.status === 200) {
                toast.success("User Deleted")
                axios.get(`${URL}/user`, {
                    Authentication: token
                }).then(res => {
                    setUser(res.data)
                })
                // console.log(res)
                console.log(res)
            }
        }).catch(err => {
            toast.error(err.message)
            console.log(err)
        })
    }


    return (
        <div className='relative mb-8'>
            <div className='sticky top-0'>
                <Header />
            </div>
            <aside className="flex">
                {/* <Sidenav /> */}
                <div className='flex flex-col w-full'>

                    <h1 className='mt-2 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                        users
                    </h1>
                    <hr className="w-3/5 mx-auto h-2 mb-5" />


                    <h2 className='mt-5 mb-2 capitalize text-2xl ml-20 font-bold'>
                        Permissions
                    </h2>
                    <hr className='w-1/4 ml-20 h-3' />


                    {loader?<div className="mx-auto">
                        <MutatingDots 
                            height="100"
                            width="100"
                            color="#482f2d"
                            secondaryColor= '#423982'
                            radius='12.5'
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                    </div>:user.map((user, key) => {

                        return (
                            <form>

                                <div className='flex flex-row ml-20 '>
                                    <div className='w-4/6'>
                                        <ul className="items-center w-full border text-gray-900 bg-white  border-gray-600 flex " key={key}>
                                            <li className="w-4/5 border-gray-800 ">
                                                <div className="flex flex-col items-center bg-gray-800 py-2 pl-3">
                                                    <label htmlFor="Name" className=" pl-3 w-full text-lg font-semibold capitalize text-gray-100 ">{user.name}</label>
                                                    <label htmlFor="Name" className=" ml-16 w-full text-sm  text-gray-400 ">({user.email})</label>
                                                </div>
                                            </li>

                                            <li className="w-4/5 border-gray-600 border-r-2 ">
                                                <div className="flex items-center pl-5">
                                                    <input
                                                        id="Admin"
                                                        type="radio"
                                                        value="Admin"
                                                        name={user._id}
                                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                                        // checked ={user.role === "Admin"}
                                                        defaultChecked={user.role === "Admin"}
                                                        onChange={e => UpdateRole(e, key)}
                                                    />
                                                    <label htmlFor={user._id} className="py-3 ml-2 w-full text-md font-medium text-gray-900 " >Admin</label>
                                                </div>
                                            </li>
                                            <li className="w-4/5 border-gray-600 border-r-2 ">
                                                <div className="flex items-center pl-5">
                                                    <input
                                                        id="Educator"
                                                        type="radio"
                                                        value="Educator"
                                                        name={user._id}
                                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                                        // checked = {user.role === "Educator"}
                                                        defaultChecked={user.role === "Educator"}
                                                        onChange={e => UpdateRole(e, key)}
                                                    />
                                                    <label htmlFor={user._id} className="py-3 ml-2 w-full text-md font-medium text-gray-900 ">Educator</label>
                                                </div>
                                            </li>
                                            <li className="w-4/5 border-gray-600 mb-0">
                                                <div className="flex items-center pl-5">
                                                    <input
                                                        id="Student"
                                                        type="radio"
                                                        value="Student"
                                                        name={user._id}
                                                        defaultChecked={user.role === "Student"}
                                                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                                        onChange={e => UpdateRole(e, key)}
                                                    />
                                                    <label htmlFor={user._id} className="py-3 ml-2 w-full text-md font-medium text-gray-900 ">Student</label>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className='ml-16 -mt-2'>
                                        <button className="bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="Submit"
                                            onClick={(e) => SubmitRole(e, key)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <div className='ml-4 -mt-2'>
                                        <button className="bg-gradient-to-r from-red-700 via-red-500 to-red-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-400 text-black active:bg-red-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none  mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="Submit"
                                            onClick={(e) => RemoveUser(e, user._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                </div>

                            </form>
                        )
                    })

                    }


                </div>
            </aside>
        </div>
    )
}

export default Users
