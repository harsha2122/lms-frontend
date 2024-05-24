import React from 'react'
import { RiErrorWarningFill } from "react-icons/ri";
 
function ConfirmBox({Delete,setShowModal,content,id}) {
    return (
        <div className='w-full z-50 backdrop-blur-sm  justify-center items-center flex overflow-x-hidden overflow-y-scroll scrollbar-hide fixed inset-0 outline-none focus:outline-none'>
            <div className='flex flex-col my-10 py-2 rounded-xl shadow-2xl relative bg-white outline-none focus:outline-none w-2/5'>
                <div className="flex items-start justify-between p-2  rounded-t">
                    <div className='flex text-black mx-auto'>
                        <RiErrorWarningFill size={40} />
                    </div>
                </div>
                <div className='flex px-3 py-2'>
                    <p className='text-black font-semibold mx-auto text-xl'>
                        {content}
                    </p>
                </div>
                <div className='flex w-full border-t border-solid border-slate-600 mt-3'>
                    <div className='flex flex-row pb-3 pt-1  mx-auto space-x-6 justify-center'>
                        <button className='flex capitalize font-semibold text-white px-3 mt-3 py-2 rounded-md bg-red-600' onClick={() => Delete(id)}>
                            delete
                        </button>
                        <button className='flex capitalize font-semibold text-white px-3 mt-3 py-2 rounded-md bg-blue-600' onClick={() => setShowModal(false)}>
                            cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-black opacity-50 fixed inset-0 -z-10 "></div>
        </div>
    )
}

export default ConfirmBox
