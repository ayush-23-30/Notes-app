import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import ConnectionWithDb from "./config.js";
import router from "./router/User.router.js";
import NoteRouter from "./router/addNotes.routes.js";
import path from 'path';
configDotenv();


const app = express(); 

app.use(express.json()); 

// app.use(cors({
//   origin: "*", // Update this to specific domains in production
//  }));

 const __dirname = path.resolve(); 

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


ConnectionWithDb(); 

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req,res)=>{
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
});


// routing 

app.use(router); 
app.use(NoteRouter); 

// app.use("/api/v1/",router); 
// app.use("/api/v1/",NoteRouter); 

app.listen(process.env.PORT , ()=>{
  console.log("The server is running Fine");
})

// Cors - middleware package for node and express that enables Cross-Origin Resourcess Sharing. it is a secuity feature implemented in web broswer to restict how a web page can interact with different origin(domain , port).. 