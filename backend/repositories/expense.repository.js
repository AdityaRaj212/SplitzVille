import {Expense, Group, User} from "../models/index.model.js";

export default class ExpenseRepository {
    constructor() {
        this.expense = Expense;
    }

    async addExpense(userId, groupId, expenseData) {
        try{
            const user = await User.findOne({where: {id: userId}});
            if (!user) {
                throw new Error('User not found');
            }

            const group = await Group.findOne({where: {id: groupId}});
            if (!group) {
                throw new Error('Group not found');
            }

            const isMember = await group.hasMember(user);
            if (!isMember) {
                throw new Error('User is not a member of the group');
            }

            const expense = await this.expense.create({
                title: expenseData.title,
                amount: expenseData.amount,
                date: expenseData.date,
                description: expenseData.description || null,
                groupId,
                userId
            });

            return expense;
        }catch(error){
            console.error('Error creating expense:', error);
            throw new Error(`Error creating expense: ${error.message}`);
        }
    }

    async getGroupExpenses(groupId) {
        return this.expense.findAll({
            where: {
                groupId: groupId,
            }
        });
    }
}