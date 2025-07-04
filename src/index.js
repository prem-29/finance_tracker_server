import express from 'express';
import signupRoutes from './routes/signupRoute.js';
import loginRoutes from './routes/loginRoute.js';
import accountRoutes from './routes/accountRoute.js';
import catergoryRoutes from './routes/categoryRoute.js';
import incomeRoutes from './routes/incomeRoute.js';
import expenseRoutes from './routes/expensesRoute.js';
import transactionRoutes from './routes/transactionRoute.js'
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// Make sure there's a forward slash at the start
app.use('/api/signup', signupRoutes);
app.use('/api/user', loginRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/category', catergoryRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => {
    console.log("listening Port 3000")
});

app.get('/', (req, res) => {
    res.send("<h1>Hello Node Js</h1>")
});