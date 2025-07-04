import client from '../database.js';

const createAccount = async (accountData) => {
    try {
        const query = `
            INSERT INTO account (
                account_name,
                user_id
            ) VALUES ($1,$2) RETURNING *;
        `;

        const values = [
            accountData.account_name,
            accountData.user_id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error during account: ${error.message}`);
    }
};


const getAccount = async (user) => {
    try {
        const query = `
            SELECT * FROM account WHERE user_id = $1;
        `;
        const values = [
            user.user_id
        ]
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`Error getting accout data: ${error.message}`);
    }
};

export { createAccount, getAccount };
