import React, { useState } from 'react'
import { FcList } from "react-icons/fc";
import { FiPower } from "react-icons/fi";
import { useAuth } from "../Auth/auth";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import user from '../assets/user.png'
import image from '../assets/logo.png'


const NavBar = () => {
  let menus = [
    { name: "Dashboard", link: "/", role: "both" },
    { name: "Users", link: "/users", role: "Admin" },
    { name: "My Courses", link: "/courses", role: "Student" },
    { name: "Help", link: "/help", role: "both" },
    { name: "Profile", link: "/profile", role: "both" },
  ];

  const Logout = { name: "Logout", link: "/Login", role: "both" }

  const Lgout = () => {
    auth.logout()

    toast.success("logged out")
  }

  let [open, setOpen] = useState(false);

  const auth = useAuth()
  const userRole = auth.user
  const Navigate = useNavigate()

  const handleClick = () => {
    Navigate('/')
  }


  return (
    <div className='shadow-md w-full sticky mb-3 top-0 left-0'>
      <div className='md:flex items-center justify-between bg-gradient-to-r from-cyan-100 via-purple-100 to-red-100 py-2 md:px-10 px-10'>
        <a href='/'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
          text-black'>
          <span className='text-3xl flex-shrink-0 -ml-6 pt-1'>
            <img className="w-36 mb-1 select-none" src={image} alt="Threat Guardian" />
          </span>
          <h1 className='text-3xl select-none invisible lg:visible
          flex ml-3 capitalize'>Edu-Nation</h1> 
        </div>
        </a>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-8 cursor-pointer md:hidden'>
          <FcList name={open ? 'close' : 'menu'}

          />
        </div>
          <ul className={`md:flex space-x-6  md:items-center select-none md:pb-0 pb-6  md:justify-end absolute md:static backdrop:blur-2xl bg-gradient-to-r from-purple-100 to bg-red-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
            
          {menus.map((menu, key) => {
            return (
              <div className=' bg-transparent'>
                {
                  ((menu.role === "both") || (menu.role === userRole)) &&

                  <li className=" nav-item">
                    <Link
                      className=" py-3  flex items-center text-md leading-snug text-gray-700 hover:opacity-85"
                      to={menu.link}
                      key={key}
                    >
                      <button className="text-lg  font-semibold text-gray-700 hover:animate-pulse hover:underline underline-offset-8  decoration-black w-24 h-12 ">{menu.name}</button>
                    </Link>
                    
                    
                  </li>
                }
              </div>
            )
          })}

          {
            <li className="ml-1  md:ml-2">
              <Link
                className=" py-1 flex items-center   font-semibold leading-snug text-white hover:opacity-85"
                onClick={Lgout}
                to="/Login"
              >
                <button className="px-2 select-none hover:animate-pulse hover:bg-red-700 bg-red-600 rounded-lg py-2 flex items-center text-lg  text-white " ><FiPower className='mr-1' />{Logout.name}</button>
              </Link>
            </li>
          }

        </ul>
      </div>
    </div>
    
  )
}

export default NavBar