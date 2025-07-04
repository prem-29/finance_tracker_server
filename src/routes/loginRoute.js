import express from 'express';
import { loginController } from '../controllers/loginContorller.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const loginUser = await loginController(req, res);
})

export default router;