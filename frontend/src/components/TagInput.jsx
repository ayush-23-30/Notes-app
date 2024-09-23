import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  // Handle input value change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add new tags
  const addNewTags = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  // Handle the "Enter" key press for adding tags
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTags();
    }
  };

  // Handle removing tags
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-2 text-sm uppercase text-slate-900 bg-slate-100 px-3 py-1 rounded ">
              # {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-red-500"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 justify-center flex items-center rounded-full border border-blue-400 hover:bg-blue-500"
          onClick={addNewTags}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
