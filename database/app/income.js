import client from '../database.js';

const createIncome = async (incomeData) => {
    try {
        const query = `
            INSERT INTO income (
                amount,
                date,
                account_id,
                category_id,
                user_id,
                notes
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;

        const values = [
            incomeData.amount,
            incomeData.date,
            incomeData.account_id,
            incomeData.category_id,
            incomeData.user_id,
            incomeData.notes
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error during income: ${error.message}`);
    }
};

const getIncome = async (user) => {
    try {
        const query = `SELECT * FROM income 
                    LEFT JOIN account ON income.account_id = account.id 
                    LEFT JOIN category ON income.category_id = category.id 
                    WHERE income.user_id = $1`;
        const values = [
            user.user_id
        ]
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`Error Fetching Income Data:${error.message}`);
    }
}

export { createIncome, getIncome };
