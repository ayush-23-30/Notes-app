import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { ValidateEmail } from "../utils/helper";
import axiosIntance from "../utils/axiosIntance";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Validate email
    if (!ValidateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError(null); // Clear previous error

    // Validate password
    if (!password) {
      setPasswordError("Please enter the password.");
      return;
    }
    setPasswordError(null); // Clear previous error

    // Call the login API
    await loginApi();
  };

  // Login API call
  const loginApi = async () => {
    try {
      const response = await axiosIntance.post("/login", {
        email: email, 
        password: password, 
      });
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful")
        navigate('/home'); // Redirect to home
      }
   } catch (error) {
    console.error("Login API error:", error);
    toast.reject("login failed")
    
    if (error.response) {
      // Server responded with a status other than 2xx
      const errorMessage = error.response.data.message || error.response.statusText || "An unexpected error occurred.";
      setError(errorMessage);
    } else if (error.request) {
      // Request was made but no response was received
      setError("No response from the server. Please try again.");
    } else {
      // Something happened in setting up the request
      setError("Request setup error: " + error.message);
    }
  }

 }
 

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center newbg">
        <div className="flex justify-center TopNav rounded-lg bg-slate-50 shadow-lg w-[300px] sm:w-80 md:w-96">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center mt-2 font-semibold">Login</h4>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box text-white placeholder:text-white"
              />
              {emailError && <p className="text-red-500 text-xs pb-1">{emailError}</p>}
              
              <PasswordInput 
                value={password} 
                className = "placeholder:text-white"
                onChange={(e) => setPassword(e.target.value)} 
              />
              {passwordError && <p className="text-red-500 text-xs pb-1">{passwordError}</p>}
              
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              <button type="submit" className="btn-primary">Login</button>
            </div>

            <p className="text-sm text-center mb-3 mt-4">
              Not registered yet? 
              <Link
                to="/signup"
                className="cursor-pointer underline pl-[4px] font-medium text-slate-200"
              >
                 Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
