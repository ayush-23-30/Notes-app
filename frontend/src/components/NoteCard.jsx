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
  onPinNote,
}) {
  return (
    <>
      <div className="border rounded w-[90vw] mb-4 sm:w-[70%] md:w-[30vw] p-4 bg-white hover:shadow-xl transition-all ease-out">
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <div className="flex justify-end">
        <TbPinnedFilled
          className={`btn-icon  ${isPinned ? "text-primary" : "text-slate-500"}`}
          onClick={onPinNote}
        />

        </div>
        <p className="text-xs text-slate-600 mt-2">
          {content.slice(0, 60)}...
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">{tags}</div>
          <div className="flex items-center justify-end gap-2">
            <MdCreate onClick={onEdit}
            className="hover:text-green-400 btn-icon" />
            <MdDelete onClick={onDelete} className="hover:text-red-500 btn-icon" />
          </div>
        </div>
      </div>
      
  
    </>
  );
}

export default NoteCard;
