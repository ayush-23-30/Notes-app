// AddEditNotes component
import React, { useState, useEffect } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";
import axiosIntance from "../utils/axiosIntance";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

function AddEditNotes({ noteData, type, getAllNotes, onClose }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (type === "edit" && noteData) {
  //     setTitle(noteData.title || "");
  //     setContent(noteData.content || "");
  //     setTags(noteData.tags || []);
  //   }
  // }, [type, noteData]);

  const addNewNote = async () => {
    try {
      const response = await axiosIntance.post("/addNotes", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
        // Close modal after adding the note
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    try {
      const response = await axiosIntance.put(`/editNotes/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes(); // Update the notes list
        onClose(); // Close the modal after the note is updated
        toast.success("Note Edited")
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // you need to debug the edit update it is not updating directly it needs refresh 

  const handleSubmit = async () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError(null);
    
    try {
      if (type === "edit") {
        await editNote(); // Await for edit note to finish
        toast.success("Note Edited");
      } else {
        await addNewNote(); // Await for add note to finish
        toast.success("Note Added");
      }
      onClose(); // Close the modal after the note is added/edited
    } catch (err) {
      console.error(err); // Log any unexpected errors
    }
  };
  

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Add Your Notes Title"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
            setError(null);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded"
          placeholder="Enter your content"
          rows={10}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
            setError(null);
          }}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleSubmit}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>

    </div>
  );
}

export default AddEditNotes;
