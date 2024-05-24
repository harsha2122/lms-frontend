import React, { useEffect, useState } from 'react';

import { useLocation,useParams } from 'react-router-dom';
import PDFViewer from '../Admin/AdminDashboard/CreateCourse/Course_Modules/Page/PDFViewer';
import axios from 'axios';
import { useAuth } from '../../Auth/auth';
import Header from '../Header'
import { Input } from 'postcss';
import Cookies from 'js-cookie'

const AssignmentPage = (props) => {

    const token = Cookies.get('token')
    const userRole = Cookies.get('userRole')
  // const auth = useAuth()
  // const userRole =  auth.user;
  // const token = auth.token
  const location = useLocation();
  // const lec = location.state.assignmentDetail
  const URL = process.env.REACT_APP_SERVER
  const {assignmentId} = useParams()

  const [hasFile, setType] = useState(location.state.hasFile)

  const [content, setContent] = useState(location.state.content)
  const [Title, setTitle] = useState(location.state.Title)
  

  return (
    <>

      <div className='sticky  top-0 z-10 '>
        <Header />
      </div>
      <div className=' flex select-none flex-col w-full overflow-x-hidden h-screen bg-white'>
        {(userRole === "Admin" || userRole==="Educator")?
          <button class="bg-green-300 hover:bg-gray-700 w-40 mx-auto text-white font-semibold py-2 px-4 rounded-lg" >
          {/* // onClick={() => DeleteStud(user._id)}> */}
            Submissions
        </button>:null
        }
        
        <div className=' flex flex-col w-full  mx-auto ' >

        <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-3 mx-auto'>
            {Title}
          </h1>
          <hr className='mt-8 w-3/5 mb-8 mx-auto' />
          
          <div 
            className='ml-12  mr-12 mb-8'
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          


          {
            (hasFile) ? (
              <div className='ml-12 mr-12'>
                <PDFViewer url={`assignment/file/${assignmentId}/${token}`}/>
              </div>) : null
          }
          {
            (userRole==="Student")?(
              <div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Upload Assignment
                  </label>
                  <input className="appearance-none block w-15 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight  " id="grid-contact" type="file" accept='.pdf, .doc, .docx' />
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <button className="appearance-none mt-4 w-36 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="update" type="file" >Upload</button>
                </div>
          
              </div>): null
          }
        </div>
      </div>
    </>
  );
};


export default AssignmentPage