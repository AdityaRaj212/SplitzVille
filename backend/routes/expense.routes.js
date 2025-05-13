import express from 'express';
import ExpenseController from '../controllers/expense.controller.js';

const router = express.Router();
const expenseController = new ExpenseController();

router.post('/add/:groupId', (req, res)=>{
    expenseController.addExpense(req, res);
})

router.get('/group/:groupId', (req, res)=>{
    expenseController.getGroupExpenses(req, res);
});

export default router;