import { createAccount, getAccount } from '../../database/app/account.js'
const accountController = async (req, res) => {
    console.log(req.body, "req.bodyreq.body")
    try {
        const accountCreateData = await createAccount(req.body);
        res.status(201).json({ message: 'Account created successfully', accountCreateData, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during account update', error: error.message, success: false });
    }
}

const getAccountController = async (req, res) => {
    try {
        const accountGetData = await getAccount(req.query);
        res.status(201).json({ message: 'Get Account Data', accountGetData, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error during get account', error: error.message, success: false });
    }
}

export { accountController, getAccountController }