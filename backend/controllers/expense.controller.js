import ExpenseRepository from "../repositories/expense.repository.js";

export default class ExpenseController {
    constructor() {
        this.expenseRepository = new ExpenseRepository();
    }

    async createExpense(req, res) {
        try {
            const expenseData = req.body;
            const expense = await this.expenseRepository.createExpense(expenseData);
            return res.status(201).json(expense);
        } catch (error) {
            return res.status(500).json({ message: error.message });
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