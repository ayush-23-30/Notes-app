import React from "react";
import  {getInitials}  from "../utils/helper";

function ProfileInfo({ userInfo ,  onLogout}) {

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center bg-gradient-to-r from-cyan-500 to-blue-300 text-white justify-center rounded-full font-medium bg-slate-100  ">
        {getInitials (userInfo?.fullName)}
        </div>
        <div className="">
          <p className="text-sm text-white  font-medium"> {userInfo?.fullName} </p>
          <button
            className="text-sm underline text-slate-700  "
            onClick={onLogout}
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
