import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { ValidateEmail } from "../utils/helper"; // Assuming this exists in your helper file
import { Link } from "react-router-dom";

function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    nameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setError({
      nameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
    });

    let hasError = false;

    // Name validation
    if (!data.name) {
      setError((prevError) => ({
        ...prevError,
        nameError: "Please enter a name...",
      }));
      hasError = true;
    }

    // Email validation
    if (!ValidateEmail(data.email)) {
      setError((prevError) => ({
        ...prevError,
        emailError: "Please enter a valid email address.",
      }));
      hasError = true;
    }

    // Password validation
    if (data.password.length < 6) {
      setError((prevError) => ({
        ...prevError,
        passwordError: "Please enter a valid Password",
      }));
      hasError = true;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPasswordError: "Passwords do not match.",
      }));
      hasError = true;
    }

    // If any validation error exists, return without submitting
    if (hasError) {
      return;
    }

    // If validation passes, submit the data
    console.log("Form submitted", data);
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex mt-28 justify-center items-center">
        <div className="flex justify-center pb-3 bg-slate-50 shadow-lg w-72 sm:w-80 md:w-96 relative"> {/* Added relative for absolute positioning */}
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center mt-2 font-semibold">
              Sign-Up
            </h4>

            <div className="flex flex-col space-y-4">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={data.name}
                  onChange={changeHandler}
                  className="input-box md:w-[300px] border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                {error.nameError && (
                  <p className="absolute text-red-500 text-xs mt-1 left-0 -bottom-4">
                    {error.nameError}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  className="input-box w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                {error.emailError && (
                  <p className="absolute text-red-500 text-xs mt-1 left-0 -bottom-4">
                    {error.emailError}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <PasswordInput
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  className="w-full"
                />
                {error.passwordError && (
                  <p className="absolute text-red-500 text-xs mt-1 left-0 -bottom-4">
                    {error.passwordError}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <PasswordInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={changeHandler}
                  className="w-full"
                />
                {error.confirmPasswordError && (
                  <p className="absolute text-red-500 text-xs mt-1 left-0 -bottom-4">
                    {error.confirmPasswordError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button className="btn-primary w-full bg-blue-500 text-white rounded-md py-2 mt-4">
                Create Account
              </button>

              {/* Login Link */}
              <p className="text-sm text-center mt-4">
                Already have an account?
                <Link
                  to="/login"
                  className="cursor-pointer pl-1 underline font-medium text-primary"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
