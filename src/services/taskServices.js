import taskModel from '../models/taskModel.js';
import appError from '../utils/appError.js';
import { createActivity } from './activityServices.js';
import getQueryOptions from '../utils/queryParams.js';


export const createtask = async (user, body) => {
    try {
        const taskCreate = await taskModel.create({...body, createdBy: user.id })
        const params = {
            description: `${user.firstName} has created task named ${taskCreate.title}`,
            taskId: taskCreate._id,
            projectId: body.projectId,
            commentBy: user.id
        }
        await createActivity(params)
        return await taskCreate
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const updatetask = async (id, user, body, update=true) => {
    try {
        let taskUpdate
        let params = {
            commentBy: user.id
        }
        if(!update) {
            taskUpdate = await taskModel.findByIdAndUpdate(id, {isDeleted: true })
            params.description = `${user.firstName} has deleted the ${taskUpdate.title}`
        }else{
            taskUpdate = await taskModel.findByIdAndUpdate(id, {...body})
            params.description = `${user.firstName} has updated the ${taskUpdate.title}`
        }
        await createActivity(params)
        return await taskUpdate
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const gettasks = async (query, id) => {
    try {
        const { page, limit, sort, skip } = getQueryOptions(query);
        const filter = { isDeleted: false };
        if (query.dueDate) {
            filter.dueDate = { $gte: new Date(query.dueDate) };
        }
        if (query.status) {
            filter.status = query.status;
        }
        if (query.priority) {
            filter.priority = query.priority;
        }
        if(query.projectId) {
            filter.projectId = query.projectId;
        }
        const total = await taskModel.countDocuments(filter);
        const tasks = await taskModel.find(filter).populate('projectId', ['name', '_id']).sort(sort)
        .skip(skip).limit(limit).exec()      
        const totalPages = Math.ceil(total / limit)
        return { tasks, total, totalPages };
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}