import React,{useEffect, useState} from 'react'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import axios from 'axios';
import { useAuth } from '../../../../../../Auth/auth';

const PDFViewer = ({url}) =>{

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
    const auth =useAuth()
    const token = auth.token
    const [pdf,setPdf] = useState()
    const URL = process.env.REACT_APP_SERVER
    // useEffect(()=>{
    //   axios.post(`${URL}/course/lecture/${courseId}/${moduleId}/${id}/${token}`).then(res=>{
    //     // setPdf(res.file)
    //     console.log("res",res)
    //   })
    //   // console.log(token)
    // },[])
 
    return(
        <div className='container'>

      <div className='pdf-container' >
        {/* show pdf conditionally (if we have one)  */}

        {<>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        
                <Viewer fileUrl={`${URL}/${url}`}
                    plugins={[defaultLayoutPluginInstance]} />
        
            </Worker>
        </>}

      </div>

    </div>
    )
}

export default PDFViewer