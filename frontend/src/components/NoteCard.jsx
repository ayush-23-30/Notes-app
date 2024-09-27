import React from "react";
import { TbPinnedFilled } from "react-icons/tb";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,  // Assuming you're passing a function that handles pinning
}) {
  return (
    <div className="rounded w-[90vw] mt-4 sm:w-[70%] md:w-[30vw] p-4 bg-white hover:shadow-xl transition-all ease-out bg-gradient-to-r from-cyan-500 to-blue-400">
      <div className="flex items-center justify-between">
        <h6 className="text-sm font-medium capitalize">{title}</h6>
        <span className="text-xs text-slate-100">{date}</span>
      </div>

      {/* Pin button */}
      <div className="flex justify-end">
        <TbPinnedFilled
          className={`btn-icon hover:text-[#001f3f] ${
            isPinned ? "text-yellow-600" : "text-slate-100"
          }`}
          onClick={onPinNote} // Trigger the pin/unpin logic when clicked
        />
      </div>

      {/* Display note content */}
      <p className="text-sm text-slate-100 mt-2">{content.slice(0, 60)}</p>

      {/* Tags and Edit/Delete options */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-900">
          <p>{tags.map((item) => ` #${item}`)}</p>
        </div>

        <div className="flex items-center justify-end gap-2">
          {/* Edit and Delete handlers */}
          <MdCreate onClick={onEdit} className="hover:text-green-400 btn-icon" />
          <MdDelete onClick={onDelete} className="hover:text-red-500 btn-icon" />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
