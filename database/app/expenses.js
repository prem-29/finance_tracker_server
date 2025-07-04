import client from '../database.js';

const createExpense = async (expenseData) => {
    try {
        const query = `
            INSERT INTO expenses (
                amount,
                date,
                account_id,
                category_id,
                user_id,
                notes
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;

        const values = [
            expenseData.amount,
            expenseData.date,
            expenseData.account_id,
            expenseData.category_id,
            expenseData.user_id,
            expenseData.notes,
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error, "error")
        throw new Error(`Error during expenses: ${error.message}`);
    }
};

const getExpense = async (user) => {
    try {
        const query = `SELECT * FROM expenses
                        LEFT JOIN account ON expenses.account_id = account.id 
                        LEFT JOIN category ON expenses.category_id = category.id 
                        WHERE expenses.user_id = $1`;
        const values = [
            user.user_id
        ]
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`Error during get expenses: ${error.message}`);
    }
}

export { createExpense, getExpense };
