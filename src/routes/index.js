import express from 'express'
import authRoutes from '../routes/user.js'
import projectRoutes from './project.js';
import activityRoutes from './activity.js';
import taskRoutes from './task.js';

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/project', projectRoutes);
routes.use('/activity', activityRoutes);
routes.use('/tasks', taskRoutes);
export default routes