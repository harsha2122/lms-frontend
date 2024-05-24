import './App.css';
import { useAuth } from './Auth/auth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './Dashboard'
import Profile from './components/User/Profile';
import {Routes, Route } from "react-router-dom";
import Admin_Dashboard from './components/Admin/AdminDashboard/Admin_Dashboard';
import CourseModule from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/CourseModules';
import Courses from './components/Course/Courses';
import {Toaster} from 'react-hot-toast';
import { useEffect } from 'react';
import Protected from './components/Layout/Protected';
import Page from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/Page/Page';
import DropFileInput from './components/Admin/AdminDashboard/Drag_Drop/DropFileInput';
import Calendar from "./components/Layout/Calendar/Calendar";
import Help from "./components/Help"
import Users from './components/Admin/Users';
import Students from './components/Course/Students';
import Announcement from './components/Course/Announcement';
import Quiz from "../src/components/Course/Quiz/Quiz";
import Assignment from "./components/Course/Assignment";
import Mycourses from './components/User/MyCourses';
import Syllabus from './components/Course/Syllabus';
import AssignmentPage from './components/Course/AssignmentPage'
import Discussion from './components/Course/Discussion';
import Grades from './components/Course/Grades'
import QuizPage from './components/Course/Quiz/QuizPage'
import QuizView from './components/User/QuizView'
import Error from './components/Error'
import Labs from './components/Course/Lab';


const App = () => {

  const auth = useAuth()
  useEffect(()=>{
    auth.isAuthenticate()
  },[])

  
  return (
    <div className='App'>
      <div><Toaster
            position="top-right"
            reverseOrder={false}        
          />
    </div>
    
        <Routes>
            
              {/* <Route path="/AdminDashboard" element={
              // <Protected isLoggedIn={auth.user==="Admin"} replace="Login">
                <Admin_Dashboard />
              // </Protected> 
            }
              /> */}
              
              
              <Route index path="/" element={
              <Protected isLoggedIn={auth.user} replace="Login">
                <Dashboard/>
              </Protected> 
            }
             />
              

              <Route index path="/Page" element={
              // <Protected isLoggedIn={auth.user} replace="Login">
                  <Page />
              // {/* </Protected>  */}
            }
             />

              
                <Route path="/Login" element={
                <Protected isLoggedIn={!auth.user} replace="">
                  <Login />
                </Protected>
              } 
                />
              

              
                <Route path="/register" element={
                <Protected isLoggedIn={!auth.user} replace="">
                  <Register />
                </Protected>
                } />
              

              {/* {auth.user && */}
                <Route path="/profile" element={<Profile />} />

                <Route path="/courses" element={<Mycourses />} />
              

              {/* {auth.user && */}
                <Route path="/DropFileInput" element={<DropFileInput />} />
              {/* } */}
              
              {/* <Route path="/users" element={<Users />} /> */}
              {/* <Route path="/Students" element={<Students />} /> */}

              {/* {auth.user &&
                <Route path="/courses" element={<Courses />} />
              } */}

              {/* {auth.user && */}
                <Route path="/calendar" element={<Calendar />} />

                <Route path="/quizview" element={<QuizView />} />

              
                

              {/* {auth.user && */}
                <Route path="/help" element={<Help />} />

                <Route path="/users" element={<Users />} />

                <Route path="/Students/:slug" element={<Students />} />

                <Route path="/announcement/:slug" element={<Announcement />} />

                <Route path="/assignment/:slug" element={<Assignment />} />

                <Route path="/assignment/page/:assignmentId" element={<AssignmentPage />} />

                <Route path="/discussion/:slug" element={<Discussion />} />

                <Route path="/quiz/:slug" element={<Quiz />} />
                
                <Route path="/QuizPage/" element={<QuizPage />} />

                <Route path="/Grades/:slug" element={<Grades />} />

                <Route path="/syllabus/:slug" element={<Syllabus />} />

                <Route path="/labs/:slug" element={<Labs />} />
              
              
                <Route path="/course/:slug" element={
                // <Protected isLoggedIn={auth.user==="Admin"} replace="Login">
                  <CourseModule />
                // </Protected>
              }/> 
              <Route path="*" element={<Error />} />

              
          </Routes>
    </div>
  )
}

export default App;
