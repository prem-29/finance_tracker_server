import express from 'express';
import { signupController } from '../controllers/authcontroller.js'; // Adjust path if needed

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await signupController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error during create user data", error: error.message });
    }
});

export default router;
