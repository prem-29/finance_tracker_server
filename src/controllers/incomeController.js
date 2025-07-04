import { createIncome, getIncome } from "../../database/app/income.js";

const incomeController = async (req, res) => {
    try {
        const incomeData = await createIncome(req.body);
        res.status(201).json({ message: "Income created successfully", incomeData, success: true });
    } catch (error) {
        console.log(error, "error");
        res.status(500).json({ message: "Error:", error: error.message, success: false });
    }
}

const getIncomeController = async (req, res) => {
    try {
        const incomeData = await getIncome(req.query);
        res.status(201).json({ message: "Get Income Data", incomeData, success: true })
    } catch (error) {
        res.status(500).json({ message: "Error fetching Get Income controller", error: error.message, success: false })
    }
}

export { incomeController, getIncomeController }

