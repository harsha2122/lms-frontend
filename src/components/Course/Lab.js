import React, { useEffect, useState } from "react";
import Header from "../Header";
import Courses from "../Course/Courses";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Auth/auth";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import vlimage from "../../assets/VLi.png";

const Labs = () => {
  const { slug } = useParams();
  const token = Cookies.get("token");
  const userRole = Cookies.get("userRole");
  const [loading, setloading] = useState(false);
  
  useEffect(()=>{
    if(Cookies.get("kasm_id")){
      setloading(false)
    }else{
      setloading(true)
    }
  },[])

  const startStyle = {
    opacity : !loading ? 0.3 : 1
  };
  const killStyle = {
    opacity : loading ? 0.3 : 1
  };

  const openInNewTab = (url) => {
    // setloading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER}/machine/`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);

        if (res.data.error_message) {
          toast.error(res.data.error_message);
          // setloading(!loading);
        } else {
          const ur = `https://labs.megaproject.live${res.data.kasm_url}?disable_control_panel=1`;
          window.open(ur, "_blank", "noreferrer");
          Cookies.set("kasm_id", res.data.kasm_id, {
            expires: 3600,
            secure: false,
          });
          Cookies.set("kasm_url", res.data.kasm_url, {
            expires: 3600,
            secure: false,
          });
          Cookies.set("session_token", res.data.session_token, {
            expires: 3600,
            secure: false,
          });
          Cookies.set("user_id", res.data.user_id, {
            expires: 3600,
            secure: false,
          });
          setloading(!loading)
          console.log();
        }
      })
      .catch((err) => {
        // setloading(false);
        console.log(err);
      });
  };

  const killSession = () => {
    console.log("hello");
    const data = {
      kasm_id: Cookies.get("kasm_id"),
      user_id: Cookies.get("user_id"),
    };
    axios
      .post(`${process.env.REACT_APP_SERVER}/machine/destroy`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        Cookies.remove("kasm_id");
        Cookies.remove("kasm_url");
        Cookies.remove("session_token");
        Cookies.remove("user_id");
        setloading(!loading);
      })
      .catch((err) => {
        // setloading(false);
        if (err.response.status === 401) {
          toast.error(err.response.data);
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <>
      <div className="relative select-none">
        <div className="sticky top-0 z-10 ">
          <Header />
        </div>
        <aside className="flex">
          {/* <Sidenav /> */}
          <div className="flex -mt-6 ">
            <Courses courseId={slug} />
          </div>
          <div className="flex flex-col w-full">
            <h1 className="mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto">
              Virtual Lab
            </h1>
            <hr className="w-3/5 mx-auto h-2 mb-5" />
            <div className="flex flex-row w-3/5 mx-auto">
              <img
                className="relative h-72 w-72 mb-2 "
                src={vlimage}
                alt="product image"
              />
              <p className="text-md w-1/2 mt-8 ml-4">
                A Virtual Machine (VM) is a compute resource that uses software
                instead of a physical computer to run programs and deploy apps.
                One or more virtual “guest” machines run on a physical “host”
                machine. Each virtual machine runs its own operating system and
                functions separately from the other VMs, even when they are all
                running on the same host. This means that, for example, a
                virtual MacOS virtual machine can run on a physical PC.{" "}
              </p>
            </div>
            <div className="w-3/5 mt-12 justify-evenly mx-auto flex flex-row">
              <button className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block mx-auto" 
              disabled={!loading}
              style={startStyle}
              onClick={() =>
                  openInNewTab("https://labs.megaproject.live/#/cast/lab")
                }>
                <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                <span className="relative">Start Machine</span>
              </button>
              <button
                className="relative inline-flex items-center mx-auto justify-start px-5 py-2 h-12 overflow-hidden  font-medium text-lg transition-all bg-red-500 rounded-xl group"
                disabled={loading}
                onClick={() => killSession()}
                style={killStyle}
              >
                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                  <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  Kill Session
                </span>
              </button>

              {/* <button
                className="bg-blue-600 text-white h-16 active:bg-blue-400 font-bold uppercase text-sm px-6 py-3 mt-4 rounded-md shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                type="button"
                // disabled={loading}
                onClick={() => killSession()}
              >
                Kill Session
              </button> */}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Labs;
