import getTransaction from "../../database/app/transaction.js";

const getTransactionController = async (req, res) => {
    try {
        const userId = parseInt(req.query.user_id); // <- get and convert to number

        if (isNaN(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user_id' });
        }
        const getTransData = await getTransaction(userId);
        res.status(201).json({ message: 'Get Transaction Data', getTransData, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during get transaction', error: error.message, success: false });
    }
}

export default getTransactionController;