import express from 'express';
import client from '../../database/database.js'
import { askIndicAI } from '../ai.js'
import authenticateToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/ask", authenticateToken, async (req, res) => {
    const question = req.query.question;
    const user_id = req.query.user_id
    try {
        const aiReply = await askIndicAI(question, user_id, client);
        res.json({ answer: aiReply });
    } catch (err) {
        console.error("AI error:", err);
        res.status(500).send("AI or internal server error");
    }
});

export default router;
