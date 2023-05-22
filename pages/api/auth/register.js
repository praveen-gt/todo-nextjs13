import { asyncError, errorhandler } from "../../../middleware/error";
import {User} from '../../../models/user'
import { connectDB, cookieSetter, generateToken } from "../../../utils/features";
import bcrypt from 'bcrypt'

const handler = asyncError(async(req, res) => {
    const {name, email, password} = req.body;

    if (req.method !== "POST") return errorhandler(res, 400, "Only POST Method is allowed")

    if(!name || !email || !password) return errorhandler(res,400,"Please enter all fields")

    await connectDB();

    let user = await User.findOne({email});

    if(user) return errorhandler(res,400,"User already registered with this email")

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name, 
        email, 
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    cookieSetter(res, token, true); // if send false then logout ho jayga

    res.status(201).json({
        success: true,
        message: 'User Registered successfully',
        user
    })
    
})

export default handler;