import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../../../../Auth/auth';  
import { FcQuestions } from "react-icons/fc";
import axios from 'axios';
import toast from 'react-hot-toast';
// import uuid from 'react-uuid';
// import FileUploader from '../../../hoc/fileHandler';

const AddQuiz = (props) => {
  const [showModal, setShowModal] = React.useState(false);

  const [a, seta] = useState({
    quizname: "",
    // grades: 0,
    description: ""
  })

  const handleSubmit = () => {
    props.createNewQuiz({ a })
    seta({
      ...a,
      quizname: "",
      description: ""
    })
    setShowModal(!showModal)
  }


  return (
    <>

      <div className='relative mt-3 mx-auto'>

        <div className='relative  mt-4 mx-auto'>

          {/* <button
            className="bg-gray-700 w-56 flex flex-row text-white active:bg-gray-800 select-none px-6 py-3 mt-3 rounded-md shadow hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <span className='flex items-center'>
              <FcQuestions
                size={30}
              />
              <span className='ml-4 font-bold text-lg'>Create Quiz   </span>
            </span>
          </button> */}


          <button className="relative px-5 w-36 h-12 py-2 font-medium text-white group" onClick={() => setShowModal(true)}>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-300 group-hover:bg-purple-600 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-600 group-hover:bg-purple-300  group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-600 -rotate-12"></span>
            <span className="relative text-lg ml-1 group-hover:text-black  text-white">Create Quiz </span>
          </button>


        </div>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative z-40 w-full md:w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-800 rounded-t">
                  <h3 className="text-3xl text-gray-800 font-semibold">
                    Create Quiz
                  </h3>

                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">
                  <form className="space-y-10 w-full">
                    <div>
                      <label for="Quiz" className="block mb-2 text-sm font-medium text-gray-700">Quiz Name</label>
                      <input type="text" name="quiz" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-600 placeholder-gray-800 text-gray-800" required value={a.quizname} onChange={e => seta({ ...a, quizname: e.target.value })} />
                    </div>
                    <div>
                      <label for="Quiz" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                      <textarea name="description" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-600 placeholder-gray-800 text-gray-800" required value={a.description} onChange={e => seta({ ...a, description: e.target.value })} />
                    </div>
                  </form>

                </div>
                {/* {/footer/} */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-700 text-gray-200 active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" opacity-50 bg-black fixed inset-0 z-40"></div>
        </>
      ) : null}
    </>
  );


}

export default AddQuiz