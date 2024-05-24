import React from 'react'
import Header from '../Header'
import Courses from '../Course/Courses'
import {AiOutlineArrowRight, AiOutlineArrowLeft}  from "react-icons/ai";

function QuizView() {

    return (
        <div className='relative'>
            <div className='sticky top-0'>
                <Header />
            </div>
            <aside className="flex">
                {/* <Sidenav /> */}
                <div className='flex -mt-6 '>
                    <Courses />
                </div>
                <div className='flex flex-col w-full '>
                    <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                        Quizzes
                    </h1>

                    <hr className="w-3/5 mx-auto h-2 mb-5" />
                    <h2 className='mt-5 mb-2 capitalize text-2xl ml-20 font-semibold select-none'>
                        Active Quizzes
                    </h2>
                    <hr className='w-1/4 ml-20 h-3' />

                    <div className="py-4 px-4 rounded-xl max-h-max mt-5 select-none flex border w-4/5 mx-auto justify-center items-center bg-gray-50">
 
                        <div className="w-full mx-6">
                            <div className="flex mt-2">
                                <p className="text-lg font-semibold text-black">Q.- Who is bigger gandu?</p>
                            </div>
                            <div className="md:grid grid-cols-12 gap-3 mx-auto pb-4 w-4/5">
                                <div className="col-span-6">
                                    <div className="w-full">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" className="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                                        <label for="default-radio-1" className="flex cursor-pointer  bg-gray-200 justify-center rounded-md items-center h-10 w-full peer-checked:bg-green-600 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 ">Shubhjeet</label>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="w-full">
                                        <input id="default-radio-2" type="radio" value="" name="default-radio" className="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                                        <label for="default-radio-2" className="flex cursor-pointer  bg-gray-200 justify-center rounded-md items-center h-10 w-full peer-checked:bg-green-600 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 ">Ashvani</label>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="w-full">
                                        <input id="default-radio-3" type="radio" value="" name="default-radio" className="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                                        <label for="default-radio-3" className="flex cursor-pointer  bg-gray-200 justify-center rounded-md items-center h-10 w-full peer-checked:bg-green-600 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 ">Vaibhav</label>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="w-full">
                                        <input id="default-radio-4" type="radio" value="" name="default-radio" className="peer opacity-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 " />
                                        <label for="default-radio-4" className="flex cursor-pointer bg-gray-200 justify-center rounded-md items-center h-10 w-full peer-checked:bg-green-600 peer-checked:text-white text-[17px] text-sm font-medium text-gray-900 ">Tanmay</label>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex flex-row mx-auto mb-3 mt-10 space-x-4 justify-center'>
                                <div>
                                    <button className='text-md flex flex-row bg-purple-600 capitalize font-semibold w-28 hover:bg-purple-700 shadow-xl py-2 rounded-md text-white px-2 mr-2'>
                                    <span className='mt-1 mr-1'>
                                        < AiOutlineArrowLeft size={20}/>
                                    </span>
                                        previous
                                    </button>
                                </div>
                                <div>
                                    <button className='text-md flex  flex-row bg-purple-600 capitalize font-semibold w-32 hover:bg-purple-700 shadow-xl py-2 rounded-md text-white px-2 mr-2'>
                                        save & next
                                    <span className='mt-1 ml-1 -mr-2'>
                                        < AiOutlineArrowRight size={20}/>
                                    </span>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </aside>
        </div>


    )
    
}

export default QuizView;
