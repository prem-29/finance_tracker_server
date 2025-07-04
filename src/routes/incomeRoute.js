import express from 'express';
import { incomeController, getIncomeController } from '../controllers/incomeController.js';
import authenticateToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    try {
        await incomeController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error during create income data", error: error.message });
    }
})

router.get('/', authenticateToken, async (req, res) => {
    try {
        await getIncomeController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error during get income data", error: error.message });
    }
})

export default router;