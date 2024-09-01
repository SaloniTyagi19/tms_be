import { mongoose, Schema } from "mongoose";
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

projectSchema.path('users').validate(function (value) {
    return value.length > 0;
}, 'At least one user is required.');

const projectModel = mongoose.model('Project', projectSchema)
export default projectModel;