import { checkAuth, connectDB } from '../../utils/features';
import { Task } from '../../models/task';
import { asyncError, errorhandler } from '../../middleware/error';


const handler = asyncError(async (req, res) => {
    //post request krni hai toh browser me toh ni kr skte isilye condition
    if (req.method !== "POST") return errorhandler(res, 400, "Only POST Method is allowed")
    await connectDB();

    const user = await checkAuth(req);

    if(!user) return errorhandler(res, 401,  "Login First");

    const { title, description } = req.body;

    if (!title || !description) return errorhandler(res, 400, "Please Enter All Fileds");

    await Task.create({
        title,
        description,
        user: user._id,
    });

    res.status(201).json({
        success: true,
        message: "Task added successfully"
    })

})

export default handler;