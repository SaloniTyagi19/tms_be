import express from 'express';
import * as activityController from '../controller/activityController.js';
import auth from '../middlewares/auth.js'

const activityRoutes = express.Router();
activityRoutes.get('/:id', auth(['Admin', 'PM', 'Member']), activityController.getActivity);
export default activityRoutes;
