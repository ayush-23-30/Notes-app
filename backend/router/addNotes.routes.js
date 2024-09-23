import e from "express";
import authenticateToken from "../utils.js";
import {addNotesController , deleteNoteController, editNotes, getAllNotesController } from "../controller/addNotes.controller.js";


const NoteRouter = e.Router(); 

NoteRouter.post("/addNotes", authenticateToken, addNotesController); 
NoteRouter.put("/editNotes/:id", authenticateToken, editNotes);
NoteRouter.get("/getNotes", authenticateToken, getAllNotesController);
NoteRouter.delete("/note-delete/:id", authenticateToken, deleteNoteController)

export default NoteRouter; 
