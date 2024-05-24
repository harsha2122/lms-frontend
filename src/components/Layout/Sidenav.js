import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcList } from "react-icons/fc";
import { FcServices, FcOpenedFolder, FcVoicePresentation, FcCalendar, FcExport, FcDatabase, FcConferenceCall } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/auth";
 
const Sidenav = () => {
    const auth = useAuth()
    const menus = [
        { name: "Dashboard", link: "/", icon: FcDatabase , role:"both"},
        { name: "Users", link: "/users", icon: FcConferenceCall , role:"Admin"},
        { name: "My Courses", link: "/courses", icon: FcOpenedFolder ,role:"Student"},
        { name: "Profile", link: "/profile", icon: FcServices ,role:"both"},
        { name: "Calendar", link: "/calendar", icon: FcCalendar ,role:"both"},
        { name: "Help", link: "/help", icon: FcVoicePresentation ,role:"both"},
        { name: "Lab", link: "/help", icon: FcVoicePresentation ,role:"both"},
   ];
    const userRole = auth.user
    const Logout = { name: "Logout", link: "/Login", icon: FcExport, role:"User" }

    const [open,setOpen] = useState(false);

    const Lgout = () =>{
        auth.logout()
        toast.success("logged out")
        // History.push('/Login')
    }

    
    return (
        <section className="flex min-h-screen gap-6 ">
            <div
                className={`bg-[#0e0e31] min-h-fit ${open ? "w-64" : "w-20"
                    } duration-500 text-gray-100 px-3`}
            >
                <div className="pt-3 pb-2 flex justify-end mr-2 ">
                    <FcList
                        size={36}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                    
                </div>
                <hr className="w-full h-1 rounded-full bg-gray-200"/>
                <div className="mt-4 flex flex-col gap-7 ">
                    {menus.map((menu,key) => {
                        
                            return(
                                <>
                                    {
                                    ((menu.role === "both")||(menu.role===userRole))&&
                                    <Link
                                        to={menu.link}
                                        key={key}
                                        className={` ${menu.margin && "mt-5"
                                            } group flex items-center text-md  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                                        >

                                        <div>{React.createElement(menu.icon, { size: "28" })}</div>
                                        <h2
                                            
                                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                                }`}
                                        >
                                            {menu.name}
                                        </h2>
                                        <h2
                                            className={`${open && "hidden"
                                                } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-gray-100 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                        >
                                            {menu.name}
                                        </h2>
                                    </Link>}
                                </>
                            )                               
                    })}
                    {
                        <Link
                        
                        onClick={Lgout}
                        to="/Login"
                        // key={i}
                        className={` ${Logout.margin && "mt-5"
                            } group flex items-center text-md  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                        >

                        <div>{React.createElement(Logout.icon, { size: "28" })}</div>
                        <h2
                            
                            className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            {Logout.name}
                        </h2>
                        <h2
                            className={`${open && "hidden"
                                } absolute left-48 bg-gray-900 font-semibold whitespace-pre text-gray-100 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                        >
                            {Logout.name}
                        </h2>
                    </Link>
                    }


                </div>
            </div>
        </section>
    );
};

export default Sidenav;
