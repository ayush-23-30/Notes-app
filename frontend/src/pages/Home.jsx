// Home component
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosIntance from "../utils/axiosIntance";
import moment from "moment";
import { toast } from "react-toastify";



function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [AllNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const [isSerach , setIsSearch] = useState(false)

  const updateLocalNote = (updatedNote) => {
    setAllNotes((prevNotes) => 
      prevNotes.map((note) => 
        note._id === updatedNote._id ? updatedNote : note // Replace edited note
      )
    );
  };


  const closeModel = () => {
    setOpenAddEditModal({
      ...openAddEditModal,
      isShown: false, // Ensure modal is hidden
      data: null,     // Reset the note data in modal
      type: "add",    // Reset type to "add" after update
    });
  };
  
  const handleEdit = (noteDetails) => {
    // console.log("Editing note:", noteDetails);
    setOpenAddEditModal({
      isShown: true,
      data: noteDetails, // Set the selected note data for editing
      type: "edit",
    });
  };
  

  const getUserInfo = async () => {
    try {
      const response = await axiosIntance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosIntance.get("/getNotes");
      if (response.data && response.data.getNote) {
        setAllNotes(response.data.getNote);
      }
    } catch (error) {
      console.log("An unexpected error occurred, please check again");
    }
  };

  const deleteNote = async (data) => {
    const noteID = data._id;

    try {
      const response = await axiosIntance.delete(`/note-delete/${noteID}`); // Ensure /api is added if your routes are prefixed
      if (response.data && response.data.message) {
        toast.error("Note is deleted");
        getAllNotes(); // Refresh notes after deletion
      }
    } catch (error) {
      console.error("Error deleting note:", error); // Log full error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Unexpected error in Delete API:", error.response.data.message);
      }
    }
  };
  
  const SearchNote = async (query)=> {
   try {
     const response = await axiosIntance.get("/search-note", {params : {query} })
 
     if(response.data && response.data.matchingNotes){
       setIsSearch(true);
       setAllNotes(response.data.matchingNotes)
     }
   } catch (error) {
    console.log("there is an unexpected error",error.message);
   }
  }

  const updateIsPinned = async (note) => {
    const noteID = note._id; // Get the note's ID from the passed note object
    const newIsPinnedValue = !note.isPinned; // Toggle the pinned state locally
  
    try {
      // Make the PUT request to update the pin status on the backend
      const response = await axiosIntance.put(`/isPinned/${noteID}`, {
        isPinned: newIsPinnedValue, // Send the new value to backend
      });
  
      if (response.data && response.data.success) {
        // Refresh notes or update the UI to reflect the new state
        getAllNotes(); // This will fetch the latest notes and update the UI
        toast.info(newIsPinnedValue ? "Note Pinned" : "Note Unpinned"); // Show the correct message
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Display the error message
      }
    }
  };
  

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} SearchNote = {SearchNote} getAllNotes = {getAllNotes}/>
      <div className="container newbg ">

    {  AllNotes.length > 0 ? ( <div className="items-center justify-center flex md:gap-5 gap-3 flex-wrap">
          {AllNotes.map((items) => (
            <NoteCard 
              key={items._id}
              title={items.title}
              date={moment(items.createdAt).format("Do MMM YYYY")}
              content={items.content}
              tags={items.tags}
              isPinned={items.isPinned}
              onEdit={() => handleEdit(items)}
              onDelete={ ()=> deleteNote(items)}
              onPinNote={() => updateIsPinned(items)}
            />
          ))}
        </div>) :(<div 
  className="h-[80vh] flex items-center justify-center flex-col text-2xl font-semibold gap-2 w-full"
>
  <h2 className="text-center">There is No Note Created!</h2>
  <p>Please Create a Note</p>
</div>
 )}
      </div>

      <div
        className="fixed right-8 bottom-8"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 shadow-lg"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className="text-4xl text-white" />
        </button>

        {showTooltip && (
          <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-700 rounded">
            ADD new Notes
          </span>
        )}
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={closeModel}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        className=" md:w-[65vw] w-[85vw] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll relative top-12"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={closeModel}
          getAllNotes={getAllNotes}
          updateLocalNote = {updateLocalNote}
        />
      </Modal>

    </>
  );
}

export default Home;
// react model is a third party library for react.. 
// this is use to handle models in react to make our work easy and we don't do need to make them from scratches 
// model means :- it refers to a popup or a dialog box 
