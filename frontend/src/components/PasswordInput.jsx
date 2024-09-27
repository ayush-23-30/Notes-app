import React, { useState } from "react";
import { FaEyeSlash , FaRegEye} from "react-icons/fa";

function PasswordInput({ name,  value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
    // agar true ho toh false kardo false ho toh true;
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3 ">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder || "Password"}
        onChange={onChange}
        name = {name}
        className="w-full text-sm bg-transparent placeholder:text-white py-3 mr-3 outline-none rounded"
      />
     { isShowPassword ? (<FaRegEye size={20} 
      className="text-white cursor-pointer "
      onClick={ toggleShowPassword} /> ): (<FaEyeSlash size={20} 
        className=" text-slate-200  cursor-pointer "
        onClick={ toggleShowPassword} />)}
    </div>
  );
}

export default PasswordInput;
