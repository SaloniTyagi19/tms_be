import { mongoose, Schema } from "mongoose";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
        enum: ['High', 'Low', 'Medium'],
        default: 'Low',
        required: true,
    },
    status: {
        type: String,
        enum: ['Todo', 'InProgress', 'Done'],
        default: 'Todo',
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const taskModel = mongoose.model('Task', taskSchema)
export default taskModel;