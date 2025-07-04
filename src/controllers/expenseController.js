import { createExpense, getExpense } from "../../database/app/expenses.js";

const expenseController = async (req, res) => {
    try {
        const expenseData = await createExpense(req.body);
        res.status(201).json({ message: "Expenses created successfully", expenseData, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during create expenses:', error: error.message, success: false });
    }
}

const getExpenseController = async (req, res) => {
    try {
        const expensesData = await getExpense(req.query);
        res.status(201).json({ message: "Get Expense Data", expensesData, success: true })
    } catch (error) {
        res.status(500).json({ message: "Error during get expenses", error: error.message, success: false })
    }
}

export { expenseController, getExpenseController }