import express from 'express'
import { createAccount, loginController } from '../controller/createAccont.controller.js';

const router = express.Router(); 

router.post ("/sign-up", createAccount);
router.post ("/login", loginController);

export default router;