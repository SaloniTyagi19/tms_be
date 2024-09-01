import { mongoose, Schema } from "mongoose";
const activitySchema = new mongoose.Schema({
    description: {
        type: String
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

const activityModel = mongoose.model('activity', activitySchema)
export default activityModel;