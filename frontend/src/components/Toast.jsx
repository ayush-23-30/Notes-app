import React from 'react'
import {LuCheck} from 'react-icons/lu'

function Toast({isShown , message , type , onClose}) {
  return (
    <div className=''>
      <div className="flex items-center gap-3 py-2 px-4  ">
      <LuCheck className= "text-xl text-green-500"></LuCheck>
      </div>
      <p className='text-sm text-slate-800'> Note Add successfully  </p>
      
    </div>
  )
}

export default Toast;
