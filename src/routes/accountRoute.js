import express from 'express';
import { accountController, getAccountController } from '../controllers/accountController.js';
import authenticateToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await accountController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error creating account details", error: error.message });
    }
})
router.get('/', authenticateToken, async (req, res) => {
    try {
        await getAccountController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error fetching account details", error: error.message })
    }
})

export default router;