import React from 'react'
import Sidenav from "./Layout/Sidenav";
import {FcComments, FcCallback}  from 'react-icons/fc'
import Header from './Header'
import {Link} from 'react-router-dom'




function Help() {
    return (
        <div className='relative'>
            <div className='sticky top-0 z-10 '>
                <Header />
            </div>
            <aside className="flex flex-row ">
                {/* <Sidenav /> */}
                <div className='flex flex-col w-full'>
                    <h1 className='select-none capitalize text-3xl text-black font-semibold py-6 mx-auto'>
                        Help
                    </h1>
                    <hr className="w-2/5 mx-auto h-2 mb-6" />
                    <div className="text-xl mt-12 mx-auto text-black font-semibold py-2 px-4">
                        <h1>Reach out to the Edu-Nation Team and let us know how we can help you. We’ll respond as soon as we can.</h1>
                    </div>
                    <hr className='w-4/5 mx-auto'/>

                    <div className='flex flex-col w-1/3 mt-12 mx-auto '>
                       <a href="mailto:enquiry@threatguardians.com" className='animate-bounce flex flex-row rounded-full w-full mb-3 h-20 bg-gray-800'>
                            <FcComments 
                               className='ml-4 mt-4'
                               size={48}
                            />
                             <p className='text-white text-xl font-semibold mx-auto mt-6'>
                               support@edunation.com
                            </p>
                        </a> 
                        <a href="tel:+919616619764" className='animate-bounce flex flex-row rounded-full w-full mb-3 h-20 bg-gray-800'>
                            <FcCallback 
                               className='ml-4 mt-4'
                               size={48}
                            />
                             <p className='text-white text-xl font-semibold mx-auto mt-6'>
                                +919616619764
                            </p>
                        </a> 



                        {/* <Link to="support@threatguardians.com" className='animate-bounce flex flex-row rounded-full w-full mb-3 h-20 bg-gray-800' >
                            <FcComments 
                               className='ml-8 mt-4'
                               size={48}
                            />
                            <p className='text-white text-xl font-semibold ml-12 mt-6'>
                               support@threatguardians.com
                            </p>
                        </Link> */}

                        {/* <Link to="+919616619764" className='animate-bounce flex flex-row rounded-full w-full mt-3 h-20 bg-gray-800'>
                            <FcCallback 
                                className='ml-8 mt-4'
                                size={48}
                            />
                            <p className='text-white text-2xl font-semibold ml-20 mt-6'>
                                +919616619764
                            </p>
                        </Link> */}
                    </div>


                    {/* <Row className="text-black font-bold py-7 px-4 rounded-full">
                        <Col><FcSms  /><a href="mailto:enquiry@threatguardians.com" target="_blank_" className='border-gray-200 rounded py-3 px-4 mb-3'>enquiry@threatguardians.com</a></Col>
                        <Col><FcCallback  /><a href="tel:+919616619764" target="_blank_" className='border-gray-200 rounded py-3 px-4 mb-3'>+919616619764</a></Col>
                    </Row>     */}
                </div>
            </aside>
        </div>
    )
}

export default Help;
