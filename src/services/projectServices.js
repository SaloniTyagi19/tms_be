import projectModel from '../models/projectModel.js';
import appError from '../utils/appError.js';
import { createActivity } from './activityServices.js';
import getQueryOptions from '../utils/queryParams.js';


export const createProject = async (user, body) => {
    try {
        const projectCreate = await projectModel.create({...body, createdBy: user.id, updatedBy: user.id })
        const params = {
            description: `${user.firstName} has created ${projectCreate.name} project`,
            projectId: projectCreate._id,
            commentBy: user.id
        }
        await createActivity(params)
        return await projectCreate
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const updateProject = async (id, user, body, update=true) => {
    try {
        let projectUpdate
        let params = {
            commentBy: user.id
        }
        if(!update) {
            projectUpdate = await projectModel.findByIdAndUpdate(id, {isDeleted: true })
            params.description = `${user.firstName} has deleted the ${projectUpdate.name}`
        }else{
            projectUpdate = await projectModel.findByIdAndUpdate(id, {...body})
            params.description = `${user.firstName} has updated the ${projectUpdate.name}`
        }
        await createActivity(params)
        return await projectUpdate
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const getProjects = async (query, id) => {
    try {
        const { page, limit, sort, skip } = getQueryOptions(query);
        const total = await projectModel.countDocuments({ isDeleted: false });
        const projects = await projectModel.aggregate([
            { $match: { isDeleted: false }},
            {
                $addFields: {
                    totalMembers: { $size: "$users" }
                }
            },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit }
        ]).exec();        
        const totalPages = Math.ceil(total / limit)
        return { projects, total, totalPages };
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}