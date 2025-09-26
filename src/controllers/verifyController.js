import { updateUser } from "../../database/app/verify.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifiedController = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userUpdate = await updateUser(decoded.userId);
        return res.status(201).json({ message: 'Successfully verified', userUpdate, success: true })
    }
    catch (error) {
        return res.status(500).json({ message: 'Error during user verification', error: error.message, success: false });
    }
}
