import signup from '../../database/app/signup.js';

export const signupController = async (req, res) => {
    try {
        const user = await signup(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error: error.message });
    }
}
