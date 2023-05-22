import mongoose from "mongoose"
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { errorhandler } from "../middleware/error"

export const connectDB = async () => {

    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'NextTodo',
    })

    // console.log(`Database connected on ${connection.host}`);

}

export const cookieSetter = (res, token, set) => {
    // const token = "dfdfdf"
    res.setHeader(
        'Set-Cookie',
        serialize("token", set ? token : "", {
            path: '/',
            httpOnly: true, //if false then we can use this cookie also to clientside
            maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
        })
    );
}

export const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET)
};

export const checkAuth = async (req) => {

    const cookie = req.headers.cookie;

    if(!cookie) return null;

    const token = cookie.split("=")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return await User.findById(decoded._id);

}