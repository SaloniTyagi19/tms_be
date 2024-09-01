import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import message from '../utils/messages.js';
import appError from '../utils/appError.js';
import httpStatus from 'http-status';
import moment from 'moment'
import jwt from 'jsonwebtoken'
import getQueryOptions from '../utils/queryParams.js';

const checkExisting = async (email) => {
    const checkUser = await userModel.findOne({ email });
    return checkUser;
}

export const userCreate = async (memberCreation=true, body) => {
    const { email, password, role='Member', firstName, lastName } = body
    let user
    try {
        const alreadyUser = await checkExisting(email);
        if (alreadyUser) {
            throw new appError(httpStatus.BAD_REQUEST, message.SIGNUP_ERROR);
        } else {
            const salt = await bcrypt.genSalt(10)
            const encryptedPass = await bcrypt.hash(password, salt)
            user = await userModel.create({email, password: encryptedPass, salt, role, firstName, lastName })
        }
        const token = await generateToken(user.email, user._id, user.role, user.firstName)
        await userModel.findByIdAndUpdate(user._id, {token})
        const result = memberCreation  ?  { id: user.id } :  {
            id: user.id,
            token,
            role,
            firstName,
            lastName,
            email
        }
        return result
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const login = async (body) => {
    try {
        const { email, password } = body
        const user = await checkExisting(email);
        if (!user) {
            throw new appError(httpStatus.BAD_REQUEST, message.LOGIN_ERROR);
        } else {
            const pass = await bcrypt.compare(password, user.password)
            if(!pass){
                throw new appError(httpStatus.BAD_REQUEST, message.INVALID_PASSWORD);
            }
            const token = await generateToken(user.email, user._id, user.role, user.firstName)
            const { _id, email, firstName, lastName, role } = await userModel.findByIdAndUpdate(user._id, {token})
            return {
                id: _id, email, firstName, lastName, token, role
            }
        }
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const userUpdate = async(id, body) => {
    try {
      await userModel.findByIdAndUpdate(id, { ... body })  
      return userModel.findById(id)
    } catch (error) {
        throw new appError(error.statusCode, error.message)
    }
}

export const getUsers = async (query) => {
    const { page, limit, sort, skip } = getQueryOptions(query);
    const total = await userModel.countDocuments({ isActive: true });
    const users = await userModel.find({ isActive: true }).select('firstName lastName email _id').sort(sort)
        .skip(skip).limit(limit).exec()
        const totalPages = Math.ceil(total / limit)
        return { users, total, totalPages };
        
}

const generateToken = async (email, _id, role, firstName) => {
    const expirationSeconds = Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES) * 60;
    const payload = {
        sub: _id,
        email,
        firstName,
        role,
        iat: moment().unix()
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expirationSeconds })
}
