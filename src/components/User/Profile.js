import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../Auth/auth'
import Header from '../Header'
import { toast } from 'react-hot-toast'
import Avatar from 'react-avatar'
import pic from './programmer.png'
import {MutatingDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'

function Profile() {
    const auth = useAuth()
    const token = Cookies.get('token')
    // const [token, setToken] = useState(auth.token)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [phone, setphone] = useState("")
    const [file, setfile] = useState()
    const [userId,setUserId] = useState()
    const URL = process.env.REACT_APP_SERVER
    const [Avatarpath,setAvatar] = useState(`${URL}/avatar/${token}`)
    const [loader,setloader]  = useState(true)
    const [image, setImage] = useState(null)
    

    useEffect(() => {
        
        console.log(token)
        axios.get(`${URL}/profile`, {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                console.log(res)
                let data = res.data
                // setfile(data.file)
                setloader(false)
                setUserId(data._id)
                setname(data.name)
                setemail(data.email)
                setphone(data.phone)
                setaddress(data.address)
            }).catch(err=>{
                toast.error(err.message)
                setloader(false)
            })
    }, [])

    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setfile(event.target.files[0])
            setImage(window.URL.createObjectURL(event.target.files[0]));
            }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pic', file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('phone', phone);

        axios.put(`${URL}/profile`, formData, {
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
        <div className='relative '>
            
            <div className='sticky top-0 z-50 '>
                <Header />
            </div>
            
            <aside className="flex mb-16">

                <div className='flex flex-col w-4/5 mx-auto'>
                
                    <h1 className='mt-2 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                           profile settings
                    </h1>
                    <hr className="w-3/5 mx-auto h-2 mb-5" />

                    {loader?
                    <div className="mx-auto">
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
                    </div>:
                    <form className="mt-6 ml-16 w-4/5 justify-center">
                        <div className="flex  flex-col xs:flex-row mb-4" >
                            {/* <label className="block text-sm font-medium text-gray-700">Photo</label> */}
                            <div className="mt-3 flex items-center  mb-5">

                                <Avatar
                                    className='rounded-full'
                                    sx={{ width: 24, height: 24 }}
                                    src={Avatarpath}
                                    alt={pic}
                                /> 
                                {/* <img src={} /> */}


                                {/* <button type="file-upload" className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" /> */}
                                <input className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="file" accept='image/*' onChange={handleChange} />
                            </div>
                            <div className="mx-auto xs:ml-4 mt-4 ml-3">
                                {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" onClick={upload}>
                                Upload
                            </button> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-Name">
                                    Full  Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-Name" type="text" value={name} onChange={e => setname(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                    Email id
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="text" value={email} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contact">
                                    Contact
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contact" type="int" value={phone} maxLength="14" onChange={e => setphone(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-Name">
                                Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-Name" type="text" value={address} onChange={e => setaddress(e.target.value)} />
                        </div>

                        <div>
                            <div className='mt-8'>
                                <button className="appearance-none w-36 block mx-auto bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 text-black active:bg-lime-600 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-full shadow hover:shadow-lg outline-none   ease-linear transition-all duration-150" id="update" type="submit" onClick={handleSubmit}>Update</button>
                            </div>
                        </div>
                    </form>
                }
                </div>
            </aside>

        </div >

    )
}

export default Profile;
