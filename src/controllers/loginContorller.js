import login from '../../database/app/login.js';

export const loginController = async (req, res) => {
    try {
        const loggedin = await login(req.body);
        return res.status(201).json({ message: 'Successfull Logedin', loggedin, success: true })
    }
    catch (error) {
        return res.status(500).json({ message: 'Error during Login', error: error.message, success: false });
    }
}
