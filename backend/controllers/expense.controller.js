import ExpenseRepository from "../repositories/expense.repository.js";

export default class ExpenseController {
    constructor() {
        this.expenseRepository = new ExpenseRepository();
    }

    async addExpense(req, res) {
        try {
            const groupId = req.params.groupId;
    
            const { title, amount, date, description, userId } = req.body;
            if (!title || !amount || !date) {
                return res.status(400).json({
                    success: false,
                    message: 'Title, amount, and date are required'
                });
            }
    
            const expenseData = {
                title,
                amount: parseFloat(amount), 
                date: new Date(date), 
                description
            };
    
            const result = await this.expenseRepository.addExpense(userId, groupId, expenseData);
            return res.status(201).json({
                success: true,
                message: result.message,
                expense: result.expense
            });
        } catch (error) {
            console.error('Controller error adding expense:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to add expense to group'
            });
        }
    }
    

    async getGroupExpenses(req, res) {
        try {
            const groupId = req.params.groupId;
            const expenses = await this.expenseRepository.getGroupExpenses(groupId);
            return res.status(200).json(expenses);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}