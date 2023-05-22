import { asyncError, errorhandler } from "../../../middleware/error";
import {User} from '../../../models/user'
import { connectDB, cookieSetter, generateToken } from "../../../utils/features";
import bcrypt from 'bcrypt'

const handler = asyncError(async(req, res) => {
    const {email, password} = req.body;

    if (req.method !== "POST") return errorhandler(res, 400, "Only POST Method is allowed")

    if(!email || !password) return errorhandler(res,400,"Please enter all fields")

    await connectDB();

    const user = await User.findOne({email}).select("+password");

    if(!user) return errorhandler(res,400,"Invalid Email");
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch) return errorhandler(res,400,"Invalid Password");

    const token = generateToken(user._id);

    cookieSetter(res, token, true); // if send false then logout ho jayga

    res.status(200).json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user,
    })
    
})

export default handler;