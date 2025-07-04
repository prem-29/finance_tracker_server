import express from 'express';
import authenticateToken from '../../middlewares/authMiddleware.js';
import { categoryController, getCategoryContoller } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await categoryController(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error creating account details', error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        await getCategoryContoller(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category details', error: error.message });
    }
})

export default router;