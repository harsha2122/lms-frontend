import React from 'react'
import { useState } from 'react'
import { FcAcceptDatabase } from "react-icons/fc";
// import uuid from 'react-uuid';
// import FileUploader from '../../../hoc/fileHandler';

const Create_Course = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [file, setfile] = useState()
  const [a, seta] = useState({
    // _id:uuid(),
    name: "",
    author:"",
    license: "Private(CopyRight)",
    published: false,
    price: 0,
    imgFile:file
  })
 


  const CreateCourse = () => {
    props.createNewCourse({ a })
    seta({
      ...a,
      name: "",
      author:"",
      license: "Private(CopyRight)",
      published: false,
      price: 0,
      imgFile: null
    })

    setShowModal(!showModal)
  }


  return (
    <>

      <div className='relative mt-3 mx-auto'>
        <div className='absolute animate-pulse mt-4 mb-1 mr-1 bg-gradient-to-r from-red-700 to-purple-700  blur-md opacity-80  inset-0'></div>
        <div className='relative  mt-4 mx-auto'>

          <button
            className="bg-gray-700 w-56 flex flex-row text-white active:bg-gray-800 select-none px-6 py-3 mt-3 rounded-md shadow hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <span className='flex items-center'>
              <FcAcceptDatabase
                size={30}
              />
            <span className='ml-4 font-semibold text-lg'>Create Course </span> 
            </span>
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div
            className=" backdrop-blur-sm  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="  relative w-full md:w-2/5 my-10 mx-auto ">
              {/* {/content/} */}
              <div className="border-slate-200 border-0 rounded-3xl opacity-95 shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                {/* {/header/} */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-700 rounded-t">
                  <h3 className="capitalize select-none text-4xl text-black font-semibold  mx-auto">
                    Create Course
                  </h3>

                </div>
                {/* {/body/} */}
                <div className="relative p-5 flex-auto">
                  <form className="space-y-10 w-full">
                    <div>
                      <label for="Course" className="block mb-2 text-md font-medium text-gray-900">Course Name</label>
                      <input type="text" name="Course" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-500 outline-none placeholder-gray-700 text-gray-600" required value={a.name} onChange={e => seta({ ...a, name: e.target.value })} />
                    </div>
                    <div>
                      <label for="Course" className="block mb-2 text-lg font-medium text-gray-900">Price</label>
                      <input type="number" name="Price" id="text" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-500 outline-none placeholder-gray-700 text-gray-600" required value={a.price} onChange={e => seta({ ...a, price: e.target.value })} />
                    </div>
                    <div>
                      <label for="Educator" className="block mb-2 text-md font-medium text-gray-900">Educator Email</label>
                      <input type="email" name="Educator" id="email" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-500 outline-none placeholder-gray-700 text-gray-600" required value={a.author} onChange={e => seta({ ...a, author: e.target.value })} />
                    </div>
                    <div>
                      <label for="Course" className="block mb-2 text-lg font-medium text-gray-900">Content License</label>
                      <select name="cars" id="cars" className=" text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-gray-500 placeholder-gray-700 text-gray-600 focus:ring-blue-500 outline-none focus:border-blue-500" value={a.license} onChange={e => seta({ ...a, license: e.target.value })}>
                        <option selected>Choose type</option>
                        <option value="Private(CopyRight)">Private(CopyRight)</option>
                        <option value="Public">Public</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                      </select>
                    </div>
                    
                    
                      {/* <label for="Course" className="block mb-2 text-sm font-medium text-gray-300">/image</label> */}
                      {/* <input type="file" name="file" id="file" className=" text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-500 placeholder-gray-700 text-white" required value={a.file} onChange={FileSet} /> */}
                      {/* <FileUploader
                            onFileSelectSuccess={(imgFile) => seta({...a,imgFile})}
                            onFileSelectError={({ error }) => alert(error)}
                          /> */}
                    
                  </form>

                </div>
                {/* {/footer/} */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white rounded-lg bg-red-500 font-bold uppercase px-4 py-2 text-md outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={CreateCourse}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );


}

export default Create_Course