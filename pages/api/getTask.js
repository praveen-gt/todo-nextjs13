import { connectDB } from '../../utils/features';
import { Task } from '../../models/task';
import { asyncError, errorhandler } from '../../middleware/error';
import { checkAuth } from '../../utils/features';

const handler = asyncError(async (req, res) => {
    //post request krni hai toh browser me toh ni kr skte isilye condition
    if (req.method !== "GET") return errorhandler(res, 400, "Only GET Method is allowed")
    await connectDB();

    const user = await checkAuth(req);

    if(!user) return errorhandler(res, 401,  "Login First");

    const allTasks = await Task.find({ user:user._id })


    res.json({
        success: true,
        allTasks
    })

})

export default handler;