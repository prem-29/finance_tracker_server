import client from '../database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = async (userData) => {
    try {
        const query = `
            SELECT id,name,email FROM users
            WHERE email = $1 AND password = $2;
        `;

        const values = [userData.email, userData.password];

        const result = await client.query(query, values);
        const user = result.rows[0];

        // If user is not found, return error
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },  // Payload
            process.env.JWT_SECRET  // Secret Key
        );

        return { user, token };  // Return as an object
    } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
    }
};

export default login;
