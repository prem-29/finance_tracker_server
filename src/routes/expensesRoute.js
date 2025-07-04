import express from 'express'
import { expenseController, getExpenseController } from '../controllers/expenseController.js';
import authenticateToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await expenseController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error during create expense data", error: error.message });
    }
})

router.get('/', authenticateToken, async (req, res) => {
    try {
        await getExpenseController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error during get expense data", error: error.message });
    }
})

export default router;