import {Expense} from "../models/index.model.js";

export default class ExpenseRepository {
    constructor() {
        this.expense = Expense;
    }

    async createExpense(expenseData) {
        return this.expense.create(expenseData);
    }

    async getGroupExpenses(groupId) {
        return this.expense.findAll({
            where: {
                groupId: groupId,
            }
        });
    }
}