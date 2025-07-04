import express from 'express';
import { signupController } from '../controllers/authcontroller.js'; // Adjust path if needed

const router = express.Router();

router.post('/', async (req, res) => {
    await signupController(req, res);
});

export default router;
