import client from '../database.js';

const signup = async (userData) => {
    try {
        const query = `
            INSERT INTO users (
                name,
                email,
                password
            ) VALUES ($1, $2, $3) RETURNING *;
        `;

        const values = [
            userData.name,
            userData.email,
            userData.password
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error during signup: ${error.message}`);
    }
};

export default signup;
