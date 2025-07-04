import client from '../database.js';

const createCategory = async (categoryData) => {
    try {
        const query = `
            INSERT INTO category (
                category_name,
                type,
                user_id
            ) VALUES ($1,$2,$3) RETURNING *;
        `;

        const values = [
            categoryData.category_name,
            categoryData.type,
            categoryData.user_id
        ];

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error during category: ${error.message}`);
    }
};

const getCategory = async (categoryData) => {
    try {
        const query = `SELECT id,category_name,type FROM category WHERE user_id = $1 OR user_id IS NULL`;
        const values = [
            categoryData.user_id
        ]
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        throw new Error(`Error getting account data: ${error.message}`);
    }
}

export { createCategory, getCategory };
