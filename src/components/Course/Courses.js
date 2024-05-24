import React, { useState } from "react";
import { FcGenericSortingDesc } from "react-icons/fc";
import { FcHome, FcIdea, FcQuestions, FcCollaboration, FcNews, FcBullish, FcSpeaker, FcSms, FcDocument, FcConferenceCall, FcPlanner} from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/auth";
import Cookies from 'js-cookie'


const Courses = ({courseId}) => {

    // const auth = useAuth()
    // const userRole = auth.user
    // const token = Cookies.get('token')
    const userRole = Cookies.get('userRole')
    const menus = [
        { name: "Home ", link: "/", icon: FcHome , role:["Admin","Educator","Student"]},
        { name: "Announcements", link: `/announcement/${courseId}`, icon: FcSpeaker , role:["Admin","Educator","Student"]},
        { name: "Assignments", link: `/assignment/${courseId}`, icon: FcNews, role:["Admin","Educator","Student"]},
        { name: "Discussion", link: `/discussion/${courseId}`, icon: FcCollaboration , role:["Admin","Educator","Student"]},
        { name: "Grades", link: `/Grades/${courseId}`, icon:  FcBullish ,role:["Student"]},
        { name: "Students", link: `/Students/${courseId}`, icon: FcConferenceCall, margin: true ,role:["Admin","Educator"]},
        { name: "Pages", link: `/course/${courseId}`, icon: FcDocument ,role:["Admin","Educator","Student"]},
        { name: "Quizzes", link: `/quiz/${courseId}`, icon: FcQuestions ,role:["Admin","Educator","Student"]},
        { name: "Syllabus", link: `/syllabus/${courseId}`, icon: FcPlanner, role:["Admin","Educator","Student"]},
        { name: "Labs", link: `/labs/${courseId}`, icon: FcIdea, role:["Admin","Educator","Student"]},
    ];
    const [open,setOpen] = useState(false);


    
  return ( 
    
      <section className="flex min-h-screen  ">
             <div
                className={` bg-[#10102a] min-h-fit ${open ? "w-52" : "w-16"
                    } duration-500 text-gray-300 px-1`}
            >
                <div className=" mt-3 pt-3 pb-2 flex justify-end mr-2 ">
                    <FcGenericSortingDesc
                        size={36}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                    
                </div>

              <hr className=" h-1 -mx-1 bg-slate-300"/>
                <div className="mt-4 select-none flex flex-col gap-5 px-2">
                    {menus?.map((menu, i) => {
                        return(
                            <>
                        {(menu.role.includes(userRole)) ?
                         <Link
                            to={menu.link}
                            key={i}
                            className={` ${menu?.margin && ""
                                } group flex items-center text-md  gap-5 font-semibold p-2 hover:bg-blue-800 rounded-md`}
                        >

                            <div>{React.createElement(menu.icon, { size: "25" })}</div>
                            <h2
                                
                                className={`whitespace-pre duration-1000 ${!open && "opacity-0 translate-x-30 overflow-hidden"
                                    }`}
                            >
                                {menu.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"
                                    } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-gray-300 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu.name}
                            </h2>
                        </Link>
                        :null}
                        </>     
                    )})}
                </div>
            </div>
        </section>
   
  )
}

export default Courses;
