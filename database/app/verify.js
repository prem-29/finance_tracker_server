import client from '../database.js';

const updateUser = async (user_id) => {
    try {
        const query = `
            UPDATE users
            SET is_verified = true
            WHERE id = $1;
        `;

        const values = [
            user_id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error during category: ${error.message}`);
    }
};
export { updateUser };