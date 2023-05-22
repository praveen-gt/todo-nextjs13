import { asyncError, errorhandler } from "../../../middleware/error";
import { cookieSetter } from "../../../utils/features";

const handler = asyncError(async(req, res) => {
    if (req.method !== "GET") return errorhandler(res, 400, "Only GET Method is allowed")

    cookieSetter(res, null, false); // if send false then logout ho jayga

    res.status(200).json({
        success: true,
        message: `Logged out successfully`
    })
    
})

export default handler;