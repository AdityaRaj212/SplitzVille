import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import expenseRouter from './routes/expense.routes.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/images', express.static('uploads'));
app.use('/api/expense', expenseRouter);
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('API is running...');  
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        await sequelize.sync({ alter: true }); // Use alter for dev, force for a fresh start[3][4]
        console.log('All models were synchronized successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(err){
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
}

startServer();