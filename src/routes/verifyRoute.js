import express from 'express';
import { verifiedController } from '../controllers/verifyController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const verifyUser = await verifiedController(req, res);
})

export default router;