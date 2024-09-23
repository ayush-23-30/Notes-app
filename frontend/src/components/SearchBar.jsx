import React from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

function SearchBar({value , name , onChange , handleSearch , onClearSearch}) {
  return (
  <>
  <div className="w-80 flex mx-2 items-center px-4 bg-slate-100 rounded-md ">
    <input type="text" 
    placeholder='Search Notes'
    className='md:w-full w-[80%] text-sm bg-transparent py-[11px] outline-none  '
    onChange={onChange}
    value={value}
    name={name}
     />

     { value &&  <IoMdCloseCircle className = "text-xl text-slate-500 cursor-pointer mr-3  hover:text-black " onClick={onClearSearch}/>}

    {<FaMagnifyingGlass className='text-slate-400 hover:text-black relative  left-3 ' onClick={handleSearch} />}

  </div>
  </>
  )
}

export default SearchBar
