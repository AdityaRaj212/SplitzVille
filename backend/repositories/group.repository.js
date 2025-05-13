import {Group} from '../models/index.model.js';
import {User} from '../models/index.model.js';
import {Expense} from '../models/index.model.js';

export default class groupRepository {
    constructor() {
        this.group = Group;
    }

    async createGroup(groupData) {
        return this.group.create(groupData);
    }

    async getGroup(groupId) {
        try{
            const group = await this.group.findOne({
                where: {
                    id: groupId
                },
                include: [{
                    model: User,
                    as: 'members',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'userName']
                }]
            });

            if(!group){
                throw new Error('Group not found');
            }

            return group;
        }catch(error){
            console.error('Error fetching group:', error);
            throw new Error('Error fetching group');
        }
    }

    async updateGroup(groupId, groupData) {
        return this.group.update(groupData, { where: { id: groupId } });
    }

    async deleteGroup(groupId) {
        return this.group.destroy({ where: { id: groupId } });
    }

    async removeMemberFromGroup(groupId, userId) {
        try{
            const group = await this.group.findOne({where: {id: groupId}});
            if(!group){
                throw new Error('Group not found');
            }

            const user = await User.findOne({where: {id: userId}});
            if(!user){
                throw new Error('User not found');
            }

            const isMember = await group.hasMember(user);
            if(!isMember){
                throw new Error('User is not a member of the group');
            }

            await group.removeMember(user);

            return group;
        }catch(error){
            console.error('Error removing member from group:', error);
            throw new Error('Error removing member from group');
        }
    }

    async getAllGroups() {
        return this.group.findAll();
    }

    async getGroupByName(groupName) {
        return this.group.findOne({ where: { name: groupName } });
    }

    async getGroupsByUserId(userId) {
        try{
            const user = await User.findOne({
                where: { id: userId },
                include: [
                    { 
                        model: Group, 
                        as: 'groups',
                        include: [
                            { model: User, as: 'members', attributes: ['id', 'firstName', 'lastName', 'email'] },
                            { model: Expense, as: 'expenses' }
                        ]
                    }]
            });
    
            if(!user){
                throw new Error('User not found');
            }
    
            return user.groups || [];
        }catch(error){
            throw new Error(`Error fetching group by user ID: ${error.message}`);
        }
    }

    async getGroupById(groupId) {
        return this.group.findOne({ where: { id: groupId } });
    }

    async addMember(groupId, userId) {
        try{
            const group = await this.group.findOne({ where: { id: groupId } });
            if (!group) {
                throw new Error('Group not found');
            }

            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }

            await group.addMember(user);
            return group;
        }catch(error){
            throw new Error(`Error adding member to group: ${error.message}`);
        }
    }
    
    async removeMember(groupId, userId) {
        try {
            const group = await this.group.findOne({ where: { id: groupId } });
            if (!group) {
                throw new Error('Group not found');
            }
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            await group.removeMember(user); 
            return group;
        } catch (error) {
            throw new Error(`Error removing member: ${error.message}`);
        }
    }

    async getGroupMembers(groupId) {
        try {
            const group = await this.group.findOne({
                where: { id: groupId },
                include: [{ model: User, as: 'members', attributes: ['id', 'firstName', 'lastName', 'email'] }] 
            });
            if (!group) {
                throw new Error('Group not found');
            }
            return group.members || [];
        } catch (error) {
            throw new Error(`Error fetching group members: ${error.message}`);
        }
    }
    
    async getGroupExpenses(groupId) {
        try {
            const group = await this.group.findOne({
                where: { id: groupId },
                include: [{ model: Expense, as: 'expenses' }]
            });
            if (!group) {
                throw new Error('Group not found');
            }
            return group.expenses || [];
        } catch (error) {
            throw new Error(`Error fetching group expenses: ${error.message}`);
        }
    }
}