import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { ValidateEmail } from "../utils/helper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

 

  const handleLogin = async (e)=>{
    e.preventDefault(); 


    if(!ValidateEmail(email)  ){
      setEmailError("Please enter a valid email address.")
      return;
    }
    setEmailError("")
  

    if(!password){
      setPasswordError("Please enter the password...")
      return;
    }
   setPasswordError("")
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex mt-28 justify-center items-center ">
        <div className="flex justify-center  bg-slate-50 shadow-lg w-72 sm:w-80 md:w-96">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center mt-2 font-semibold">
              {" "}
              Login{" "}
            </h4>
            <div className="flex flex-col ">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="input-box "
                />
                {emailError && <p className="text-red-500 text-xs pb-1 "> {emailError} </p>}
              <PasswordInput value={password} onChange={(e) =>{setPassword(e.target.value)}} />

              {passwordError && <p className="text-red-500 text-xs pb-1 "> {passwordError} </p>}


              <button className="btn-primary "> Login</button>
            </div>

            <p className="text-sm text-center mb-3 mt-4">
              Not registered yet?
              <Link
                to="/signup"
                className="cursor-pointer underline font-medium text-primary"
              >
                {" "}
                Create an Account{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

// we use text-primary and primary is defined in tailwinds config
