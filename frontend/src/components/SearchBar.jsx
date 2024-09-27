import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

function SearchBar({value , name , onChange , handleSearch , onClearSearch}) {
  return (
  <>
   <div className="w-80 md:w-96 flex mx-2  bg-gradient-to-r from-cyan-500 justify-between to-blue-200 items-center px-4 rounded-md ">
    <input type="text" 
    placeholder='Search Notes'
    className='md:w-full w-[80%] placeholder:text-white text-sm bg-transparent py-[11px] outline-none  '
    onChange={onChange}
    value={value}
    name={name}
     />

    
     { value &&  <IoMdCloseCircle className = "text-xl text-slate-200 cursor-pointer  hover:text-black " onClick={onClearSearch}/>}

    {<FaMagnifyingGlass className='text-slate-700 hover:text-black relative left-2 ' onClick={handleSearch} />} 
    </div>
  </>
  )
}

export default SearchBar
