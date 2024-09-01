import httpStatus from 'http-status';
import * as taskServices from '../services/taskServices.js';
import createResponse from './../utils/response.js';
import message from './../utils/messages.js';

export const taskCreate = async (req, res, next) => {
    try {
        const taskCreate = await taskServices.createtask(req?.loggedUserDetails, req.body);
        return await createResponse(res, httpStatus.CREATED, message.ACTION.replace('#', 'Task').replace('*', 'created'), taskCreate)
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

export const updateTask = async (req, res, next) => {
    try {
       const updateTask = await taskServices.updatetask(req.params.id, req?.loggedUserDetails, req.body, true);
       return await createResponse(res, httpStatus.OK, message.ACTION.replace('#', 'Task').replace('*', 'updated'), updateTask)
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

export const deleteTask = async (req, res, next) => {
    try {
       const taskDelete = await taskServices.updatetask(req.params.id, req?.loggedUserDetails, req.body, false);
       return await createResponse(res, httpStatus.OK, message.ACTION.replace('#', 'Task').replace('*', 'deleted'), taskDelete)
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

export const getTask = async (req, res, next) => {
    try {
        const getTasks = await taskServices.gettasks(req.query, req.params.id);
        if (getTasks.length <= 0) {
            return await createResponse(res, httpStatus.NOT_FOUND, message.NOT_FOUND.replace('#', 'Tasks'), {});
        }
        return await createResponse(res, httpStatus.OK, getTasks.total, getTasks);
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}