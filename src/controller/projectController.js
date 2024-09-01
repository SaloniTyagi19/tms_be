import httpStatus from 'http-status';
import * as projectService from '../services/projectServices.js';
import createResponse from './../utils/response.js';
import message from './../utils/messages.js';

export const createProject = async (req, res, next) => {
    try {
        const projectCreate = await projectService.createProject(req?.loggedUserDetails, req.body);
        return await createResponse(res, httpStatus.CREATED, message.ACTION.replace('#', 'Project').replace('*', 'created'), projectCreate)
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

export const updateProject = async (req, res, next) => {
    try {
       const projectUpdate = await projectService.updateProject(req.params.id, req?.loggedUserDetails, req.body, true);
       return await createResponse(res, httpStatus.OK, message.ACTION.replace('#', 'Project').replace('*', 'updated'), projectUpdate)
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

export const deleteProject = async (req, res, next) => {
    try {
       const projectdelete = await projectService.updateProject(req.params.id, req?.loggedUserDetails, req.body, false);
       return await createResponse(res, httpStatus.OK, message.ACTION.replace('#', 'Project').replace('*', 'deleted'), projectdelete)
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

export const getProject = async (req, res, next) => {
    try {
        const getProjects = await projectService.getProjects(req.query, req?.loggedUserDetails.id);
        if (getProjects.length <= 0) {
            return await createResponse(res, httpStatus.NOT_FOUND, message.NOT_FOUND.replace('#', 'Projects'), {});
        }
        return await createResponse(res, httpStatus.OK, getProjects.total, getProjects);
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}