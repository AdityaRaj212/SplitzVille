import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Expense = sequelize.define("Expense", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    groupId: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true
});
export default Expense;

