import React from "react";
import  {getInitials}  from "../utils/helper";

function ProfileInfo({onLogout}) {

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100  ">
        {getInitials ("Ayush kumar")}
        </div>
        <div className="">
          <p className="text-sm font-medium"> Ayush </p>
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
