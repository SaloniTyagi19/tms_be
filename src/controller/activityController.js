import httpStatus from 'http-status';
import * as activityServices from '../services/activityServices.js';
import createResponse from './../utils/response.js';
import message from './../utils/messages.js';


export const getActivity = async (req, res, next) => {
    try {
        const getActivities = await activityServices.getActivity(req.query, req.params.id);
        if (getActivities.length <= 0) {
            return await createResponse(res, httpStatus.NOT_FOUND, message.NOT_FOUND.replace('#', 'Activity'), {});
        }
        return await createResponse(res, httpStatus.OK, getActivities.total, getActivities);
    } catch (error) {
        return await createResponse(res, error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE, error.message, {})
    }
}

