import {User} from "../models/index.model.js";

export default class UserRepository {
    constructor() {
        this.user = User;
    }

    async createUser(userData) {
        return this.user.create(userData);
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