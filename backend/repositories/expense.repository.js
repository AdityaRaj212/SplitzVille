import { Expense, Group, User } from "../models/index.model.js";

export default class ExpenseRepository {
    constructor() {
        this.expense = Expense;
    }

    async getExpense(expenseId){
        try{
            const expense = await this.expense.findOne({where: {id: expenseId}});
            if(!expense){
                throw new Error('Expense not found');
            }
            return expense;
        }catch(error){
            console.error('Error fetching expense:', error);
            throw new Error(`Error fetching expense: ${error.message}`);
        }
    }

    async addExpense(userId, groupId, expenseData) {
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }

            const group = await Group.findOne({ where: { id: groupId } });
            if (!group) {
                throw new Error('Group not found');
            }

            const isMember = await group.hasMember(user);
            if (!isMember) {
                throw new Error('User is not a member of the group');
            }

            const transaction = await Group.sequelize.transaction();
            try {
                const expense = await this.expense.create({
                    title: expenseData.title,
                    amount: expenseData.amount,
                    date: expenseData.date,
                    description: expenseData.description || null,
                    groupId,
                    userId
                }, { transaction });

                await group.increment('totalSpent', { by: expenseData.amount, transaction });

                await transaction.commit();
                return expense;
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        } catch (error) {
            console.error('Error creating expense:', error);
            throw new Error(`Error creating expense: ${error.message}`);
        }
    }

    async removeExpense(expenseId) {
        try {
            const transaction = await Group.sequelize.transaction();
            try {
                const expense = await this.expense.findOne({ where: { id: expenseId } });
                if (!expense) {
                    throw new Error('Expense not found');
                }

                const group = await Group.findOne({ where: { id: expense.groupId } });
                if (!group) {
                    throw new Error('Group not found');
                }

                await group.decrement('totalSpent', { by: expense.amount, transaction });

                await expense.destroy({ transaction });

                await transaction.commit();
                return { success: true, message: 'Expense removed successfully', expenseId };
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        } catch (error) {
            console.error('Error removing expense:', error);
            throw new Error(`Error removing expense: ${error.message}`);
        }
    }

    async getGroupExpenses(groupId) {
        try {
            const group = await Group.findOne({ where: { id: groupId } });
            if (!group) {
                throw new Error('Group not found');
            }

            const totalSpent = group.totalSpent;

            const expenses = await this.expense.findAll({
                where: { groupId },
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'userName', 'email']
                }],
                order: [['date', 'DESC']],
                attributes: ['id', 'title', 'amount', 'date', 'description', 'userId', 'groupId', 'createdAt', 'updatedAt'],
            });

            return expenses;
        } catch (err) {
            console.error('Error fetching group expenses:', err);
            throw new Error(`Error fetching group expenses: ${err.message}`);
        }
    }
}
