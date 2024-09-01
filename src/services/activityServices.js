import activityModel from '../models/activityModel.js';
import appError from '../utils/appError.js';
import getQueryOptions from '../utils/queryParams.js';

export const createActivity = async (body) => {
    try {
        return await activityModel.create({...body })
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const getActivity = async (query, id) => {
    try {
        const { page, limit, sort, skip } = getQueryOptions(query);
        const total = await activityModel.countDocuments({ projectId: id });
        const activityLog = await activityModel.find({ projectId: id }).sort(sort)
        .skip(skip).limit(limit).exec()
        const totalPages = Math.ceil(total / limit)
        return { activityLog, total, totalPages };
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}