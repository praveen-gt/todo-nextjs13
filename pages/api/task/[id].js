import { connectDB } from '../../../utils/features';
import { Task } from '../../../models/task';
import { asyncError, errorhandler } from '../../../middleware/error';
import { checkAuth } from '../../../utils/features';

const handler = asyncError(async (req, res) => {
    await connectDB();
    const user = await checkAuth(req);
    if (!user) return errorhandler(res, 401, "Login First");

    const taskID = req.query.id;

    const task = await Task.findById(taskID);

    if(!task) return errorhandler(res, 404, "Task not found");

    if (req.method == "PUT") {
        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully"
        })

    } else if (req.method === 'DELETE') {

        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        })

    } else {
        errorhandler(res, 400, "This method is not available");
    }

    if (!user) return errorhandler(res, 401, "Login First");

    const allTasks = await Task.find({ user: user._id })

    res.json({
        success: true,
        allTasks
    })

})

export default handler;