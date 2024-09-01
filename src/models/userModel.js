import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'PM', 'Member'],
        default: 'Member',
        required: true,
    },
    token: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })
const userModel = mongoose.model('User', userSchema)
export default userModel;