import {Op, Sequelize} from "sequelize";
import {User, Group} from "../models/index.model.js";

export default class UserRepository {
    constructor() {
        this.user = User;
    }

    async createUser(userData) {
        return this.user.create(userData);
    }

    async getAllUsers() {
        return this.user.findAll();
    }

    async smartSearch(q, groupId = null, searchingUserId = null) {
        const searchLimit = 10;
        const whereConditions = {
            [Op.or]: [
                { firstName: { [Op.like]: `%${q}%` } },
                { lastName: { [Op.like]: `%${q}%` } },
                { userName: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } }
            ]
        };
    
        if (searchingUserId) {
            whereConditions.id = { [Op.ne]: searchingUserId };
        }
    
        const queryOptions = {
            where: whereConditions,
            limit: searchLimit,
            attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        };
    
        if (groupId) {
            whereConditions.id = {
                ...whereConditions.id, // Preserve existing conditions like Op.ne if present
                [Op.notIn]: Sequelize.literal(`(SELECT "UserId" FROM "GroupMembers" WHERE "GroupId" = '${groupId}')`)
            };
        }
    
        return this.user.findAll(queryOptions);
    }
    
    

    async getUserByEmail(email) {
        return this.user.findOne({
            where: {
                email: email,
            }
        });
    }

    async getUserById(id) {
        return this.user.findOne({
            where: {
                id: id,
            }
        });
    }

    async updateUser(id, userData) {
        return this.user.update(userData, {
            where: {
                id: id,
            }
        });
    }

    async updateUserByEmail(email, userData) {
        return this.user.update(userData, {
            where: {
                email: email,
            }
        });
    }
}