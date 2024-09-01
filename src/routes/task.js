import express from 'express';
import * as taskController from '../controller/taskController.js';
import auth from '../middlewares/auth.js'

const taskRoutes = express.Router();
taskRoutes.post('/create', auth(['Admin', 'PM']), taskController.taskCreate);
taskRoutes.put('/update/:id', auth(['Admin', 'PM', 'Member']), taskController.updateTask);
taskRoutes.delete('/update/:id', auth(['Admin', 'PM', 'Member']), taskController.deleteTask);
taskRoutes.get('/all', auth(['Admin', 'PM', 'Member']), taskController.getTask);
export default taskRoutes;
