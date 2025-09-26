import express from "express";
import getTransactionController from "../controllers/transactionController.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await getTransactionController(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction details from route", error: error.message })
    }
})

export default router;