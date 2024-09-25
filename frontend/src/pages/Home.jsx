import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../utils/axiosIntance";

function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const onEdit = () => {};
  const onDelete = () => {};
  const onPinNote = () => {};

  // this state controls the modal structure 
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false, 
    type: "add",
    data: null,
  });

  const closeModel = ()=>{
    setOpenAddEditModal({...openAddEditModal, isShown : false})
  }

  const [userInfo , setUserInfo] = useState(null); 
   const navigate = useNavigate();

   // get user info from backend; 
   const getUserInfo = async () => {
    try {
      const response = await axiosIntance.get("/get-user");
      if (response.data && response.data.user) { // Change here
        setUserInfo(response.data.user); // Change here
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  
  useEffect(()=>{
    getUserInfo(); 
    return () =>{}
  },[]); 
  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mt-6 ">
        <div className="  items-center justify-center flex md:gap-5 gap-3 flex-wrap">
          <NoteCard
            title={"Meeting on 16th september"}
            date="12-sept-2024"
            content="You have a meeting on 16th september with The CEO of TCS. "
            tags="#Meeting"
            isPinned={true}
            onEdit={onEdit}
            onDelete={onDelete}
            onPinNote={onPinNote}
          />
        </div>
      </div>

      <div
        className="fixed right-8 bottom-8" // Make the container fixed as well
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 shadow-lg"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
            // when i click on this the model properties change to showm : true, type : text 
          }}
        >
          <MdAdd className="text-4xl text-white"/>
        </button>

        {showTooltip && (
          <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-700 rounded">
            ADD new Notes
          </span>
        )}
      </div>
     
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose= {closeModel}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className=" md:w-[65vw] w-[85vw]  max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scrll  relative top-12 "
      >
        <AddEditNotes 
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={()=> {
          setOpenAddEditModal( { isShown : false , type : "add" , data : null} )
        }
        }/>
      </Modal>

    </>
  );
}

export default Home;

// react model is a third party library for react.. 
// this is use to handle models in react to make our work easy and we don't do need to make them from scratches 
// model means :- it refers to a popup or a dialog box 
