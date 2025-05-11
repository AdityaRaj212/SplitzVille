import groupRepository from "../repositories/group.repository.js";

export default class GroupController {
    constructor() {
        this.groupRepository = new groupRepository();
    }

    async createGroup(req, res) {
        try {
            const groupData = req.body;
            const group = await this.groupRepository.createGroup(groupData);
            return res.status(201).json(group);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getGroup(req, res) {
        try {
            const groupId = req.params.groupId;
            const group = await this.
                groupRepository.findOne({ 
                    where: { id: groupId }, 
                    include: [
                        {model: 'User', as: 'members', attributes: ['id', 'firstName', 'lastName', 'email']},
                        {model: 'Expense', as: 'expenses'},
                    ],
                });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            return res.status(200).json(group);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });    
        }
    }
    async updateGroup(req, res) {
        try {
            const groupId = req.params.groupId;
            const groupData = req.body;
            const [updated] = await this.groupRepository.update(groupData, { where: { id: groupId } });
            if (!updated) {
                return res.status(404).json({ message: "Group not found" });
            }
            const updatedGroup = await this.groupRepository.findOne({ where: { id: groupId } });
            return res.status(200).json(updatedGroup);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async deleteGroup(req, res) {
        try {
            const groupId = req.params.groupId;
            const deleted = await this.groupRepository.destroy({ where: { id: groupId } });
            if (!deleted) {
                return res.status(404).json({ message: "Group not found" });
            }
            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getAllGroups(req, res) {
        try {
            const groups = await this.groupRepository.findAll();
            return res.status(200).json(groups);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async addMember(req, res) {
        try {
            const groupId = req.params.groupId;
            const { userId } = req.body;
            const group = await this.groupRepository.findOne({ where: { id: groupId } });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            group.members.push(userId);
            await group.save();
            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async removeMember(req, res) {
        try {
            const groupId = req.params.groupId;
            const { userId } = req.body;
            const group = await this.groupRepository.findOne({ where: { id: groupId } });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            group.members = group.members.filter(member => member !== userId);
            await group.save();
            return res.status(200).json(group);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getGroupMembers(req, res) {
        try {
            const groupId = req.params.groupId;
            const group = await this.groupRepository.findOne({ where: { id: groupId } });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            return res.status(200).json(group.members);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getGroupExpenses(req, res) {
        try {
            const groupId = req.params.groupId;
            const group = await this.groupRepository.findOne({ where: { id: groupId } });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            const expenses = await group.getExpenses();
            return res.status(200).json(expenses);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getGroupTransactions(req, res) {
        try {
            const groupId = req.params.groupId;
            const group = await this.groupRepository.findOne({ where: { id: groupId } });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            const transactions = await group.getTransactions();
            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getGroupBalances(req, res) {
        try {
            const groupId = req.params.groupId;
            const group = await this.groupRepository.findOne({ where: { id: groupId } });
            if (!group) {
                return res.status(404).json({ message: "Group not found" });
            }
            const balances = await group.getBalances();
            return res.status(200).json(balances);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};