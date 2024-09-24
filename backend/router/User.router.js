import express from 'express'
import { createAccount, getAllUser, loginController } from '../controller/createAccont.controller.js';
import authenticateToken from "../utils.js"

const router = express.Router(); 

router.post ("/sign-up", createAccount);
router.post ("/login", loginController);
router.get("/get-user",authenticateToken,getAllUser)

export default router;