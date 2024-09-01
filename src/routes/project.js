import express from 'express';
import * as projectController from '../controller/projectController.js';
import auth from '../middlewares/auth.js'

const projectRoutes = express.Router();
projectRoutes.post('/create', auth(['Admin', 'PM']), projectController.createProject);
projectRoutes.put('/update/:id', auth(['Admin', 'PM']), projectController.updateProject);
projectRoutes.delete('/update/:id', auth(['Admin', 'PM']), projectController.deleteProject);
projectRoutes.get('/all', auth(['Admin', 'PM', 'Member']), projectController.getProject);
export default projectRoutes;
