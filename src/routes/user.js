import express from 'express';
import * as authController from '../controller/userController.js';
import auth from '../middlewares/auth.js'

const authRoutes = express.Router();
authRoutes.post('/register', authController.registerUser);
authRoutes.post('/login', authController.loginUser);
authRoutes.put('/update', auth(['Admin', 'PM', 'Member']), authController.updateUser);
authRoutes.get('/all', auth(['Admin', 'PM', 'Member']), authController.getUser);
export default authRoutes;
